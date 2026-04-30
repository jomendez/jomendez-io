import { httpsCallable } from 'firebase/functions'
import { functions } from '../config/firebase'
import { ensureAnonymousAuth } from './auth'

/**
 * Landing-page form submissions go through Cloud Functions, not directly to
 * Firestore. The functions enforce authentication, a honeypot check, and a
 * per-uid rate limit. Firestore rules deny all client writes.
 */

const assertFunctions = () => {
  if (!functions) {
    throw new Error(
      'Firebase Functions client is not initialized. Check that VITE_FIREBASE_* env variables are set.'
    )
  }
}

const callSubmitMagnet = () =>
  httpsCallable(functions, 'submitMagnetLead')

const callSubmitApplication = () =>
  httpsCallable(functions, 'submitApplication')

const callSubmitWaitlist = () =>
  httpsCallable(functions, 'submitWaitlist')

/**
 * Save a lead from the "download the checklist" magnet form.
 * @param {{ email: string, website?: string }} payload
 *   `website` is the honeypot — pass through even if empty so the function
 *   can see it explicitly.
 * @returns {Promise<string>} the created document id
 */
export const submitMagnetLead = async ({ email, website = '' }) => {
  assertFunctions()
  await ensureAnonymousAuth()
  const fn = callSubmitMagnet()
  const result = await fn({ email, website })
  return result.data?.id
}

/**
 * Save an email to the 8-Point Audit waitlist.
 *
 * Used by the WaitlistForm component on the new homepage (hero, audit
 * section, final CTA). The optional `source` lets us tell which CTA the
 * lead came from, e.g. 'hero' | 'audit' | 'final'.
 *
 * TODO: when the email service provider is selected, the Cloud Function
 * will also forward the email to the ESP. No client change required.
 *
 * @param {{ email: string, source?: string, website?: string }} payload
 *   `website` is the honeypot — pass through even if empty so the function
 *   can see it explicitly.
 * @returns {Promise<string>} the created document id
 */
export const submitWaitlist = async ({ email, source = '', website = '' }) => {
  assertFunctions()
  await ensureAnonymousAuth()
  const fn = callSubmitWaitlist()
  const result = await fn({ email, source, website })
  return result.data?.id
}

/**
 * Save an application from the "Apply to work with us" CTA form.
 * @param {{
 *   name: string,
 *   company: string,
 *   email: string,
 *   revenue: string,
 *   timeline: string,
 *   details: string,
 *   website?: string,
 * }} payload
 * @returns {Promise<string>} the created document id
 */
export const submitApplication = async ({
  name,
  company,
  email,
  revenue,
  timeline,
  details,
  website = '',
}) => {
  assertFunctions()
  await ensureAnonymousAuth()
  const fn = callSubmitApplication()
  const result = await fn({
    name,
    company,
    email,
    revenue,
    timeline,
    details,
    website,
  })
  return result.data?.id
}
