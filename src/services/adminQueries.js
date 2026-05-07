import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../config/firebase'

/**
 * The single email that's allowed to view the admin dashboard. Must match
 * the value in firestore.rules (`isAdmin()`). Change this string in both
 * places if the admin email ever changes.
 */
export const ADMIN_EMAIL = 'support@jomendez.io'

/**
 * Whether a Firebase Auth user object represents the admin. Used by the
 * dashboard to gate UI; Firestore rules enforce the same check server-side.
 */
export const isAdminUser = (user) =>
  !!user && user.email === ADMIN_EMAIL

const assertDb = () => {
  if (!db) {
    throw new Error('Firestore is not initialized.')
  }
}

/**
 * Subscribe to a Firestore collection ordered newest-first. Returns the
 * unsubscribe function. Only callable by the admin (Firestore rules will
 * reject anyone else).
 *
 * @param {'checklist_leads' | 'applications' | 'waitlist_leads' | 'audit_submissions'} collectionName
 * @param {(rows: Array<{ id: string } & object>) => void} onData
 * @param {(err: Error) => void} [onError]
 * @returns {() => void} unsubscribe
 */
export const subscribeToSubmissions = (collectionName, onData, onError) => {
  assertDb()
  const q = query(
    collection(db, collectionName),
    orderBy('createdAt', 'desc')
  )
  return onSnapshot(
    q,
    (snap) => {
      const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      onData(rows)
    },
    (err) => {
      console.error(`Failed to subscribe to ${collectionName}:`, err)
      if (onError) onError(err)
    }
  )
}

/**
 * Toggle the `read` flag on a submission. Firestore rules only let the admin
 * change this single field, so this is the only mutation the dashboard does.
 */
export const setSubmissionRead = async (collectionName, id, read) => {
  assertDb()
  await updateDoc(doc(db, collectionName, id), { read: !!read })
}
