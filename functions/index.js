/**
 * Cloud Functions proxy for the jomendez-io landing-page forms.
 *
 * Why this exists
 * ---------------
 * Firestore rules deny all client writes to checklist_leads and applications.
 * All submissions come through the two callable functions below. The admin
 * SDK bypasses rules, so these functions are the single source of truth for:
 *
 *   - authentication (require a signed-in Firebase user; we use anonymous
 *     auth from the client, so every real visitor has a stable uid)
 *   - honeypot check (a form field named "website" that is hidden from
 *     humans; populated = bot, silently rejected)
 *   - per-uid rate limit (max N writes / hour across BOTH collections,
 *     tracked in rate_limits/{uid})
 *   - input validation (types, lengths, enum values)
 *
 * Anything rejected throws HttpsError, which the Firebase Functions SDK
 * turns into `functions/<code>` errors on the client.
 */

import { onCall, HttpsError } from 'firebase-functions/v2/https'
import { onDocumentUpdated } from 'firebase-functions/v2/firestore'
import { setGlobalOptions, logger } from 'firebase-functions/v2'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore, FieldValue, Timestamp } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'
import crypto from 'node:crypto'
import {
  sendAuditInviteEmail,
  sendAuditReadyEmail,
  sendAuditMessageEmail,
} from './lib/email.js'

initializeApp()
const db = getFirestore()

// Change `region` if you want functions closer to your users. us-central1 is
// the default and cheapest for most projects.
//
// maxInstances: 3 is intentionally tight — a landing page form does not need
// burst capacity, and this caps absolute throughput under attack to roughly
// 1.3M requests/day, which keeps worst-case daily cost to ~$10–15 while your
// budget alert catches it.
setGlobalOptions({ region: 'us-central1', maxInstances: 3 })

// Origins allowed to call these callable functions from the browser.
// Add any new domain (staging, preview channels, etc.) here. Anything not in
// this list will fail the CORS preflight in the browser. Note this only
// restricts browser callers — direct curl/Postman calls aren't blocked by
// CORS; that's what the auth + honeypot + rate-limit layers are for.
const ALLOWED_ORIGINS = [
  'https://jomendez.io',
  'https://www.jomendez.io',
  'http://localhost:5173', // vite dev server default
  'http://localhost:3000', // common alt dev port
]

// Shared options for every callable in this file.
// - cors: explicit origin allowlist
// - invoker: 'public' makes Cloud Run "allow unauthenticated invocations"
//   stick on every deploy (callables need this to accept browser preflights —
//   auth happens inside the function body via the Firebase Auth token, not
//   at the IAM/network layer)
const callableOptions = {
  cors: ALLOWED_ORIGINS,
  invoker: 'public',
}

// Secrets used by the email-sending functions. Listing them here causes
// Firebase to mount them as process.env.* at runtime, fetched from
// Google Secret Manager. These must already exist before deploy:
//
//   firebase functions:secrets:set RESEND_API_KEY
//   firebase functions:secrets:set RESEND_FROM
//
// Any function that doesn't send mail keeps using `callableOptions` and
// pays no cold-start cost for these secrets.
const EMAILING_SECRETS = ['RESEND_API_KEY', 'RESEND_FROM']
const emailingCallableOptions = {
  ...callableOptions,
  secrets: EMAILING_SECRETS,
}

const RATE_LIMIT_PER_HOUR = 3
const HOUR_MS = 60 * 60 * 1000

// --- validators ---

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

const REVENUE_OPTIONS = ['Under $500k', '$500k – $2M', '$2M – $10M', '$10M+']
const TIMELINE_OPTIONS = ['This quarter', 'Next quarter', 'Still exploring']

const invalid = (msg) => new HttpsError('invalid-argument', msg)

const requireString = (value, field, { min = 1, max } = {}) => {
  if (typeof value !== 'string') throw invalid(`${field} must be a string`)
  const trimmed = value.trim()
  if (trimmed.length < min) throw invalid(`${field} is required`)
  if (max !== undefined && trimmed.length > max) throw invalid(`${field} is too long`)
  return trimmed
}

const requireEmail = (value) => {
  const s = requireString(value, 'email', { min: 4, max: 320 }).toLowerCase()
  if (!EMAIL_RE.test(s)) throw invalid('email is not a valid address')
  return s
}

const requireEnum = (value, options, field) => {
  if (!options.includes(value)) throw invalid(`${field} is not a valid option`)
  return value
}

// --- auth + honeypot + rate limit ---

const requireAuth = (request) => {
  if (!request.auth || !request.auth.uid) {
    throw new HttpsError('unauthenticated', 'Sign in required')
  }
  return request.auth.uid
}

const checkHoneypot = (data) => {
  // Bots fill in any visible-looking field. `website` is hidden from humans
  // via CSS + aria-hidden on the client. If it's populated, treat as spam.
  if (data && typeof data.website === 'string' && data.website.length > 0) {
    // `failed-precondition` rather than a silent accept, so monitoring can
    // alert on spam volume. The client shows a generic success either way,
    // which is handled on the caller side.
    throw new HttpsError('failed-precondition', 'spam detected')
  }
}

/**
 * Enforces the per-uid rate limit atomically. The rate_limits/{uid} doc
 * stores a rolling list of recent submission timestamps (millis). On every
 * call we prune entries older than 1h, check the count, and append the new
 * one inside a transaction so concurrent calls can't race past the limit.
 */
const checkAndRecordRateLimit = async (uid) => {
  const ref = db.collection('rate_limits').doc(uid)
  const nowMs = Date.now()
  const cutoff = nowMs - HOUR_MS

  await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref)
    const existing = snap.exists ? snap.data().recent || [] : []
    const recent = existing
      .map((t) => (t instanceof Timestamp ? t.toMillis() : Number(t)))
      .filter((t) => Number.isFinite(t) && t > cutoff)

    if (recent.length >= RATE_LIMIT_PER_HOUR) {
      throw new HttpsError(
        'resource-exhausted',
        `Too many submissions. Max ${RATE_LIMIT_PER_HOUR} per hour.`
      )
    }

    recent.push(nowMs)
    tx.set(
      ref,
      {
        recent,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    )
  })
}

// --- metadata helper ---

const buildMetadata = (uid, request) => {
  const headers = request.rawRequest?.headers || {}
  return {
    createdAt: FieldValue.serverTimestamp(),
    createdByUid: uid,
    userAgent: headers['user-agent'] || null,
    ip: request.rawRequest?.ip || headers['x-forwarded-for'] || null,
    referrer: headers['referer'] || null,
  }
}

// --- callable endpoints ---

export const submitMagnetLead = onCall(callableOptions, async (request) => {
  const uid = requireAuth(request)
  const data = request.data || {}
  checkHoneypot(data)

  const email = requireEmail(data.email)

  await checkAndRecordRateLimit(uid)

  const ref = await db.collection('checklist_leads').add({
    email,
    ...buildMetadata(uid, request),
  })
  return { id: ref.id }
})

/**
 * Save a waitlist signup from the new homepage's 8-Point Audit hero/CTA.
 *
 * Same shape as submitMagnetLead — email-only, anon-auth required, honeypot
 * check, per-uid rate limit. Lives in its own collection so we can track the
 * audit waitlist independently from the older checklist magnet leads.
 *
 * TODO: when the email service provider (ConvertKit / GoHighLevel /
 * Mailchimp) is chosen, push the email there from inside this handler so
 * Firestore stays the system of record AND the lead lands in the ESP.
 */
export const submitWaitlist = onCall(callableOptions, async (request) => {
  const uid = requireAuth(request)
  const data = request.data || {}
  checkHoneypot(data)

  const email = requireEmail(data.email)
  // Optional, max 64 chars. Free-form provenance tag from the client so we
  // can tell which CTA (hero / audit / final) the lead came from.
  const source =
    typeof data.source === 'string' && data.source.length > 0
      ? requireString(data.source, 'source', { min: 1, max: 64 })
      : null

  await checkAndRecordRateLimit(uid)

  const ref = await db.collection('waitlist_leads').add({
    email,
    source,
    ...buildMetadata(uid, request),
  })
  return { id: ref.id }
})

export const submitApplication = onCall(callableOptions, async (request) => {
  const uid = requireAuth(request)
  const data = request.data || {}
  checkHoneypot(data)

  const name = requireString(data.name, 'name', { min: 1, max: 200 })
  const company = requireString(data.company, 'company', { min: 1, max: 200 })
  const email = requireEmail(data.email)
  const revenue = requireEnum(data.revenue, REVENUE_OPTIONS, 'revenue')
  const timeline = requireEnum(data.timeline, TIMELINE_OPTIONS, 'timeline')
  const details = requireString(data.details, 'details', { min: 1, max: 5000 })

  await checkAndRecordRateLimit(uid)

  const ref = await db.collection('applications').add({
    name,
    company,
    email,
    revenue,
    timeline,
    details,
    ...buildMetadata(uid, request),
  })
  return { id: ref.id }
})

// ============================================================================
//  AUDIT FLOW
//  ---------------------------------------------------------------------------
//  Stage 1: issueAuditInvite (admin)         -> emails the user a link
//  Stage 2: validateAuditInvite (public)     -> page reads the invite
//  Stage 3: submitAudit (public)             -> user submits the questionnaire
//  Stage 4: finalizeAudit (admin)            -> attach scores + PDF
//  Stage 5: onAuditReady (Firestore trigger) -> email the user the magic link
//  Stage 6: getAuditResults (public)         -> magic-link landing reads data
//  Plus:    sendAuditMessage (admin)         -> free-form admin email
//
//  Auth model: no user accounts. Two opaque tokens (invite, results).
//  Security model: client writes are denied by Firestore rules; admin SDK
//  writes happen only inside these handlers.
// ============================================================================

const ADMIN_EMAIL = 'support@jomendez.io'
const AUDIT_DEPTHS = ['simple', 'medium', 'deep']
const AUDIT_DIMENSION_KEYS = [
  'onlineVisibility',
  'leadCapture',
  'leadResponse',
  'customerRetention',
  'operationsTime',
  'marketingEngine',
  'financialClarity',
  'techStack',
]
const INVITE_EXPIRY_DAYS = 30
const INVITE_TOKEN_BYTES = 32
const RESULTS_TOKEN_BYTES = 32
const PDF_SIGNED_URL_TTL_MS = 60 * 60 * 1000 // 1 hour

const requireAdmin = (request) => {
  if (!request.auth || !request.auth.token || request.auth.token.email !== ADMIN_EMAIL) {
    throw new HttpsError('permission-denied', 'admin access required')
  }
  return request.auth.uid
}

const randomToken = (bytes) => crypto.randomBytes(bytes).toString('base64url')

const isoNow = () => new Date()
const addDays = (d, days) => new Date(d.getTime() + days * 24 * 60 * 60 * 1000)

const requireQid = (v, field) => {
  if (typeof v !== 'string' || v.length < 1 || v.length > 64) {
    throw invalid(`${field} is invalid`)
  }
  // qids are kebab-case ASCII; reject anything that doesn't fit so we
  // never accidentally trust user input as a Firestore key.
  if (!/^[a-z0-9-]+$/.test(v)) throw invalid(`${field} contains illegal characters`)
  return v
}

/**
 * Stage 1 — admin issues an invite to a waitlist signup.
 * Creates audit_invites/{tokenId} (the doc id IS the secret token) and
 * fires the invite email via Resend. Uses emailingCallableOptions so the
 * RESEND_* secrets are mounted into the runtime env.
 */
export const issueAuditInvite = onCall(emailingCallableOptions, async (request) => {
  requireAdmin(request)
  const data = request.data || {}
  const email = requireEmail(data.email)
  const waitlistLeadId =
    typeof data.waitlistLeadId === 'string' && data.waitlistLeadId.length > 0
      ? requireString(data.waitlistLeadId, 'waitlistLeadId', { min: 1, max: 200 })
      : null

  // Generate a fresh token. Reuse not allowed — issuing twice for the
  // same email creates two distinct invites; both stay valid until used
  // or expired. Admin can resend by calling this again.
  const tokenId = randomToken(INVITE_TOKEN_BYTES)
  const now = isoNow()
  const expiresAt = addDays(now, INVITE_EXPIRY_DAYS)

  await db.collection('audit_invites').doc(tokenId).set({
    email,
    waitlistLeadId,
    createdAt: FieldValue.serverTimestamp(),
    expiresAt: Timestamp.fromDate(expiresAt),
    used: false,
    usedAt: null,
    submissionId: null,
    issuedByUid: request.auth.uid,
  })

  // Soft-fail email delivery: the invite is already saved in Firestore,
  // so a Resend hiccup (domain not verified, rate limit, transient
  // network error) shouldn't strand the operation. The dashboard will
  // see emailSent=false and can either retry, or copy the invite URL
  // and send it manually. The link itself is the secret — the email
  // is just the delivery channel.
  let emailSent = true
  let emailError = null
  try {
    const result = await sendAuditInviteEmail({ to: email, inviteToken: tokenId })
    if (result?.skipped) {
      emailSent = false
      emailError = 'Email service not configured (RESEND_API_KEY / RESEND_FROM).'
    }
  } catch (err) {
    emailSent = false
    emailError = err?.message || 'Email delivery failed.'
    logger.warn('Invite saved but email failed', {
      tokenId, to: email, err: emailError,
    })
  }

  const inviteUrl = `https://jomendez.io/audit/${tokenId}`
  return {
    tokenId,
    email,
    expiresAt: expiresAt.toISOString(),
    emailSent,
    emailError,
    inviteUrl,
  }
})

/**
 * Stage 2 — anyone holding an invite link calls this to verify the token.
 * Returns the email the invite was issued to (for the form's "Hi, jane@"
 * label). Does NOT consume the token — that happens at submitAudit.
 */
export const validateAuditInvite = onCall(callableOptions, async (request) => {
  requireAuth(request) // anonymous auth from the client
  const data = request.data || {}
  const tokenId = requireString(data.tokenId, 'tokenId', { min: 8, max: 256 })

  const snap = await db.collection('audit_invites').doc(tokenId).get()
  if (!snap.exists) throw new HttpsError('not-found', 'invite not found')
  const inv = snap.data()

  if (inv.used) {
    return { ok: false, reason: 'already-used', email: inv.email, submissionId: inv.submissionId }
  }
  const now = Date.now()
  const exp = inv.expiresAt?.toMillis ? inv.expiresAt.toMillis() : 0
  if (exp && now > exp) {
    return { ok: false, reason: 'expired', email: inv.email }
  }
  return { ok: true, email: inv.email }
})

/**
 * Stage 3 — submit the questionnaire.
 * Verifies the invite (must exist, not used, not expired), writes the
 * audit_submissions doc atomically, marks the invite consumed.
 *
 * NOTE: the questionnaire is gated behind a single-use invite token, so
 * we deliberately do NOT enforce the per-uid hourly rate limit here —
 * that limit is for open public forms. Token consumption is the throttle.
 */
export const submitAudit = onCall(callableOptions, async (request) => {
  requireAuth(request)
  const data = request.data || {}
  const tokenId = requireString(data.tokenId, 'tokenId', { min: 8, max: 256 })
  const depth = requireEnum(data.depth, AUDIT_DEPTHS, 'depth')

  if (!Array.isArray(data.answers)) throw invalid('answers must be an array')
  if (data.answers.length === 0) throw invalid('answers cannot be empty')
  if (data.answers.length > 100) throw invalid('answers payload too large')

  // Validate the answer payload's shape. Per-question semantic
  // validation lives in the client (src/data/auditQuestions.js) — the
  // admin reviews each submission anyway, so light-touch server checks
  // are sufficient and avoid duplicating the question bank here.
  const cleanedAnswers = data.answers.map((a, i) => {
    if (!a || typeof a !== 'object') throw invalid(`answer ${i} must be an object`)
    const qid = requireQid(a.qid, `answer ${i}.qid`)
    const value = a.value
    if (
      typeof value !== 'number' &&
      typeof value !== 'string' &&
      typeof value !== 'boolean'
    ) {
      throw invalid(`answer ${i}.value has unsupported type`)
    }
    if (typeof value === 'string' && value.length > 2000) {
      throw invalid(`answer ${i}.value too long`)
    }
    return { qid, value }
  })

  const inviteRef = db.collection('audit_invites').doc(tokenId)
  const submissionRef = db.collection('audit_submissions').doc()

  // Use a transaction so we can't double-spend the invite.
  await db.runTransaction(async (tx) => {
    const snap = await tx.get(inviteRef)
    if (!snap.exists) throw new HttpsError('not-found', 'invite not found')
    const inv = snap.data()
    if (inv.used) throw new HttpsError('failed-precondition', 'invite already used')
    const exp = inv.expiresAt?.toMillis ? inv.expiresAt.toMillis() : 0
    if (exp && Date.now() > exp) {
      throw new HttpsError('failed-precondition', 'invite expired')
    }

    tx.set(submissionRef, {
      inviteTokenId: tokenId,
      email: inv.email,
      waitlistLeadId: inv.waitlistLeadId || null,
      depth,
      answers: cleanedAnswers,
      status: 'pending_review',
      scores: null,
      recommendations: null,
      pdfStoragePath: null,
      pdfFilename: null,
      resultsToken: null,
      resultsTokenIssuedAt: null,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      ...buildMetadata(request.auth.uid, request),
    })

    tx.update(inviteRef, {
      used: true,
      usedAt: FieldValue.serverTimestamp(),
      submissionId: submissionRef.id,
    })
  })

  return { submissionId: submissionRef.id }
})

/**
 * Stage 4 — admin finalizes a submission with scores + recommendations
 * + the uploaded PDF storage path. Mints a results token and flips
 * status to 'ready'. The Firestore trigger onAuditReady picks it up and
 * sends the user the magic link.
 *
 * The PDF must already be uploaded to Firebase Storage at the path the
 * admin passes here (admin uploads directly from the dashboard before
 * calling this).
 */
export const finalizeAudit = onCall(callableOptions, async (request) => {
  requireAdmin(request)
  const data = request.data || {}
  const submissionId = requireString(data.submissionId, 'submissionId', { min: 8, max: 80 })

  // Validate the 8 scores: integers 0-100, all dimensions present.
  const scores = data.scores
  if (!scores || typeof scores !== 'object') throw invalid('scores must be an object')
  const cleanedScores = {}
  for (const k of AUDIT_DIMENSION_KEYS) {
    const v = scores[k]
    const n = Number(v)
    if (!Number.isInteger(n) || n < 0 || n > 100) {
      throw invalid(`scores.${k} must be an integer 0-100`)
    }
    cleanedScores[k] = n
  }

  // Recommendations are optional; each capped at 1000 chars.
  const recs = data.recommendations || {}
  const cleanedRecs = {}
  for (const k of AUDIT_DIMENSION_KEYS) {
    const v = recs[k]
    if (v == null || v === '') continue
    if (typeof v !== 'string') throw invalid(`recommendations.${k} must be a string`)
    if (v.length > 1000) throw invalid(`recommendations.${k} too long`)
    cleanedRecs[k] = v
  }

  // Storage path of the uploaded PDF (the admin uploads first, then
  // calls this). Filename is just for display.
  const pdfStoragePath = requireString(data.pdfStoragePath, 'pdfStoragePath', {
    min: 1,
    max: 500,
  })
  if (!pdfStoragePath.startsWith(`audits/${submissionId}/`)) {
    throw invalid('pdfStoragePath must live under audits/{submissionId}/')
  }
  const pdfFilename = requireString(data.pdfFilename, 'pdfFilename', { min: 1, max: 200 })

  const ref = db.collection('audit_submissions').doc(submissionId)
  const snap = await ref.get()
  if (!snap.exists) throw new HttpsError('not-found', 'submission not found')

  const resultsToken = randomToken(RESULTS_TOKEN_BYTES)

  await ref.update({
    status: 'ready',
    scores: cleanedScores,
    recommendations: cleanedRecs,
    pdfStoragePath,
    pdfFilename,
    resultsToken,
    resultsTokenIssuedAt: FieldValue.serverTimestamp(),
    finalizedByUid: request.auth.uid,
    updatedAt: FieldValue.serverTimestamp(),
  })

  return { submissionId, resultsToken }
})

/**
 * Stage 5 — Firestore trigger: when a submission flips to status='ready'
 * (and wasn't already), email the user the magic link. The trigger lets
 * us decouple "the admin saved the audit" from "the email got sent" so
 * the dashboard isn't blocked on email delivery.
 */
export const onAuditReady = onDocumentUpdated(
  {
    document: 'audit_submissions/{submissionId}',
    region: 'us-central1',
    // Triggers can't share `emailingCallableOptions` (different option
    // shape than callables), so we list the same secrets directly here.
    secrets: EMAILING_SECRETS,
  },
  async (event) => {
    const before = event.data?.before?.data()
    const after = event.data?.after?.data()
    if (!before || !after) return
    if (before.status === 'ready' || after.status !== 'ready') return
    if (!after.resultsToken || !after.email) return

    try {
      await sendAuditReadyEmail({
        to: after.email,
        submissionId: event.params.submissionId,
        resultsToken: after.resultsToken,
      })
      logger.info('Sent audit-ready email', {
        submissionId: event.params.submissionId,
        to: after.email,
      })
    } catch (err) {
      logger.error('audit-ready email failed', {
        submissionId: event.params.submissionId,
        to: after.email,
        err: String(err),
      })
      // Don't throw — the trigger has no useful retry path that won't
      // duplicate the email later. Admin can resend manually.
    }
  }
)

/**
 * Stage 6 — magic-link results page calls this to fetch the user's
 * audit. Verifies that the resultsToken in the URL matches what we
 * stored when finalize ran, then mints a short-lived signed URL for the
 * PDF and returns everything the client needs to render.
 */
export const getAuditResults = onCall(callableOptions, async (request) => {
  requireAuth(request)
  const data = request.data || {}
  const submissionId = requireString(data.submissionId, 'submissionId', { min: 8, max: 80 })
  const token = requireString(data.token, 'token', { min: 8, max: 256 })

  const snap = await db.collection('audit_submissions').doc(submissionId).get()
  if (!snap.exists) throw new HttpsError('not-found', 'audit not found')
  const sub = snap.data()
  if (sub.status !== 'ready' || !sub.resultsToken) {
    throw new HttpsError('failed-precondition', 'audit not ready')
  }

  // Constant-time comparison to avoid leaking length/prefix info.
  const ok = (() => {
    try {
      const a = Buffer.from(token)
      const b = Buffer.from(sub.resultsToken)
      return a.length === b.length && crypto.timingSafeEqual(a, b)
    } catch {
      return false
    }
  })()
  if (!ok) throw new HttpsError('permission-denied', 'invalid token')

  // Sign a short-lived URL for the PDF. The user's browser fetches it
  // for the embed/download; the URL itself is not durable.
  let pdfUrl = null
  if (sub.pdfStoragePath) {
    const file = getStorage().bucket().file(sub.pdfStoragePath)
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + PDF_SIGNED_URL_TTL_MS,
    })
    pdfUrl = url
  }

  return {
    submissionId,
    email: sub.email,
    depth: sub.depth,
    scores: sub.scores || {},
    recommendations: sub.recommendations || {},
    pdfFilename: sub.pdfFilename,
    pdfUrl,
    answers: sub.answers || [],
  }
})

/**
 * Admin-only: send a free-form message email to the user about their
 * submission. The message is also logged on the submission's messages
 * subcollection so the admin can see the thread later. Uses
 * emailingCallableOptions for the RESEND_* secrets.
 */
export const sendAuditMessage = onCall(emailingCallableOptions, async (request) => {
  requireAdmin(request)
  const data = request.data || {}
  const submissionId = requireString(data.submissionId, 'submissionId', { min: 8, max: 80 })
  const subject = requireString(data.subject, 'subject', { min: 1, max: 200 })
  const body = requireString(data.body, 'body', { min: 1, max: 8000 })

  const ref = db.collection('audit_submissions').doc(submissionId)
  const snap = await ref.get()
  if (!snap.exists) throw new HttpsError('not-found', 'submission not found')
  const sub = snap.data()

  await sendAuditMessageEmail({
    to: sub.email,
    subject,
    body,
    replyTo: ADMIN_EMAIL,
  })

  await ref.collection('messages').add({
    subject,
    body,
    sentAt: FieldValue.serverTimestamp(),
    sentByUid: request.auth.uid,
  })

  return { ok: true }
})
