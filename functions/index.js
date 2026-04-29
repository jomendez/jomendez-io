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
import { setGlobalOptions } from 'firebase-functions/v2'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore, FieldValue, Timestamp } from 'firebase-admin/firestore'

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
