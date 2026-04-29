import { useState } from 'react'
import { signIn, logOut } from '../../services/auth'

/**
 * Login form for the admin dashboard. Gating is enforced by Firestore rules
 * (the account email must match ADMIN_EMAIL); this form just collects creds
 * and surfaces friendly errors.
 *
 * If a user is already signed in but with a non-admin email, parent renders
 * a separate "not authorized" view — this component is only for the
 * unauthenticated case.
 */
const FRIENDLY_ERROR = (code) => {
  if (!code) return 'Sign in failed. Please try again.'
  if (code.includes('invalid-credential') || code.includes('wrong-password')) {
    return 'Wrong email or password.'
  }
  if (code.includes('user-not-found')) {
    return 'No admin account exists with that email.'
  }
  if (code.includes('too-many-requests')) {
    return 'Too many attempts. Try again in a few minutes.'
  }
  if (code.includes('network')) {
    return 'Network error. Check your connection and try again.'
  }
  return 'Sign in failed. Please try again.'
}

const AdminLogin = ({ wrongEmail, currentEmail }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const onSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return
    setError(null)
    setSubmitting(true)
    try {
      await signIn(email.trim(), password)
      // On success the parent's auth listener flips state automatically.
    } catch (err) {
      console.error('Admin sign-in failed:', err)
      setError(FRIENDLY_ERROR(err?.code || ''))
    } finally {
      setSubmitting(false)
    }
  }

  // If the user is signed in but not the admin, give them a sign-out button
  // so they can try again with a different account.
  if (wrongEmail) {
    return (
      <div className="admin-login-shell">
        <div className="admin-forbidden">
          <h2>Not authorized</h2>
          <p>
            You're signed in as <strong>{currentEmail}</strong>, which isn't an
            admin account. Sign out and try again with the correct email.
          </p>
          <button
            type="button"
            className="admin-btn admin-btn-ghost"
            onClick={() => logOut()}
          >
            Sign out
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-login-shell">
      <div className="admin-login-card">
        <div className="admin-login-eyebrow admin-mono admin-micro">
          &mdash; JOMENDEZ / ADMIN
        </div>
        <h1>
          Sign in to the <em>dashboard</em>
        </h1>
        <p className="lead">Restricted to the studio admin account.</p>

        <form className="admin-login-form" onSubmit={onSubmit}>
          <div className="admin-field">
            <label htmlFor="admin-email">Email</label>
            <input
              id="admin-email"
              type="email"
              className="admin-input"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
              autoFocus
            />
          </div>

          <div className="admin-field">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              className="admin-input"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={submitting}
            />
          </div>

          <button type="submit" className="admin-btn" disabled={submitting}>
            {submitting ? 'Signing in\u2026' : 'Sign in'}
          </button>

          {error && <div className="admin-error">{error}</div>}
        </form>

        <p className="admin-helper">
          Forgot your password? Reset it from the Firebase Console &rarr; Authentication.
        </p>
      </div>
    </div>
  )
}

export default AdminLogin
