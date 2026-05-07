import { httpsCallable } from 'firebase/functions'
import { ref as storageRef, uploadBytes } from 'firebase/storage'
import { functions, storage } from '../config/firebase'
import { ensureAnonymousAuth } from './auth'

/**
 * Client wrappers for the audit Cloud Functions. Public endpoints
 * (validateAuditInvite, submitAudit, getAuditResults) ensure anonymous
 * Firebase Auth before calling so the request carries a uid the
 * function can attach to the metadata.
 *
 * Admin endpoints (issueAuditInvite, finalizeAudit, sendAuditMessage)
 * assume the caller is already signed in as the admin via the /admin
 * dashboard's email/password flow — they don't ensure anon auth, since
 * that would replace the admin's token with an anonymous one.
 */

const assertReady = () => {
  if (!functions) {
    throw new Error(
      'Firebase Functions client is not initialized. Check VITE_FIREBASE_* env vars.'
    )
  }
}

// ---------- public ----------

export const validateAuditInvite = async (tokenId) => {
  assertReady()
  await ensureAnonymousAuth()
  const fn = httpsCallable(functions, 'validateAuditInvite')
  const r = await fn({ tokenId })
  return r.data
}

export const submitAudit = async ({ tokenId, depth, answers }) => {
  assertReady()
  await ensureAnonymousAuth()
  const fn = httpsCallable(functions, 'submitAudit')
  const r = await fn({ tokenId, depth, answers })
  return r.data
}

export const getAuditResults = async ({ submissionId, token }) => {
  assertReady()
  await ensureAnonymousAuth()
  const fn = httpsCallable(functions, 'getAuditResults')
  const r = await fn({ submissionId, token })
  return r.data
}

// ---------- admin (caller is already signed in as admin) ----------

export const issueAuditInvite = async ({ email, waitlistLeadId }) => {
  assertReady()
  const fn = httpsCallable(functions, 'issueAuditInvite')
  const r = await fn({ email, waitlistLeadId: waitlistLeadId || null })
  return r.data
}

export const finalizeAudit = async ({
  submissionId,
  scores,
  recommendations,
  pdfStoragePath,
  pdfFilename,
}) => {
  assertReady()
  const fn = httpsCallable(functions, 'finalizeAudit')
  const r = await fn({
    submissionId,
    scores,
    recommendations: recommendations || {},
    pdfStoragePath,
    pdfFilename,
  })
  return r.data
}

export const sendAuditMessage = async ({ submissionId, subject, body }) => {
  assertReady()
  const fn = httpsCallable(functions, 'sendAuditMessage')
  const r = await fn({ submissionId, subject, body })
  return r.data
}

/**
 * Upload an audit PDF to Firebase Storage. The admin uploads first;
 * once the upload succeeds, the dashboard calls finalizeAudit with the
 * resulting storage path. The path namespacing (audits/{submissionId}/)
 * is enforced by the Storage security rules.
 */
export const uploadAuditPdf = async ({ submissionId, file }) => {
  if (!storage) {
    throw new Error(
      'Firebase Storage is not initialized. Check VITE_FIREBASE_* env vars.'
    )
  }
  if (file.type !== 'application/pdf') {
    throw new Error('File must be a PDF.')
  }
  const max = 25 * 1024 * 1024
  if (file.size > max) {
    throw new Error('PDF must be smaller than 25MB.')
  }
  const safeName = file.name.replace(/[^A-Za-z0-9._-]/g, '_').slice(0, 200)
  const path = `audits/${submissionId}/${safeName}`
  const ref = storageRef(storage, path)
  await uploadBytes(ref, file, { contentType: 'application/pdf' })
  return { path, filename: file.name }
}
