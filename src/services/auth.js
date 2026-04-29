import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth'
import { auth } from '../config/firebase'

// Helper to check if Firebase is initialized
const checkFirebaseInitialized = () => {
  if (!auth) {
    throw new Error('Firebase is not configured. Please set up your Firebase credentials in .env file.')
  }
}

// Sign up with email and password
export const signUp = async (email, password, displayName = null) => {
  checkFirebaseInitialized()
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName })
    }
    return userCredential
  } catch (error) {
    throw error
  }
}

// Sign in with email and password
export const signIn = async (email, password) => {
  checkFirebaseInitialized()
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential
  } catch (error) {
    throw error
  }
}

// Sign in with Google
export const signInWithGoogle = async () => {
  checkFirebaseInitialized()
  try {
    const provider = new GoogleAuthProvider()
    const userCredential = await signInWithPopup(auth, provider)
    return userCredential
  } catch (error) {
    throw error
  }
}

// Sign out
export const logOut = async () => {
  checkFirebaseInitialized()
  try {
    await signOut(auth)
  } catch (error) {
    throw error
  }
}

// Send password reset email
export const resetPassword = async (email) => {
  checkFirebaseInitialized()
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error) {
    throw error
  }
}

// Get current user
export const getCurrentUser = () => {
  if (!auth) return null
  return auth.currentUser
}

// Listen to auth state changes
export const onAuthChange = (callback) => {
  if (!auth) {
    console.warn('Firebase is not configured. Auth state changes will not be tracked.')
    return () => {} // Return a no-op unsubscribe function
  }
  return onAuthStateChanged(auth, callback)
}

// --- Anonymous auth (used to gate public form writes) ---
// Firebase persists the anonymous session, so repeat visitors re-use the
// same uid. Concurrent callers share one in-flight sign-in promise so we
// don't create duplicate anonymous users.

let anonymousSignInPromise = null

export const ensureAnonymousAuth = () => {
  checkFirebaseInitialized()
  if (auth.currentUser) return Promise.resolve(auth.currentUser)
  if (anonymousSignInPromise) return anonymousSignInPromise
  anonymousSignInPromise = signInAnonymously(auth)
    .then((cred) => cred.user)
    .catch((err) => {
      anonymousSignInPromise = null // allow retry on failure
      throw err
    })
  return anonymousSignInPromise
}
