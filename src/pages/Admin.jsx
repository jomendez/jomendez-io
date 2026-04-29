import { useEffect, useState } from 'react'
import { onAuthChange } from '../services/auth'
import { isAdminUser } from '../services/adminQueries'
import AdminLogin from '../components/Admin/AdminLogin'
import AdminDashboard from '../components/Admin/AdminDashboard'
import stylesCss from './Admin.styles.css?raw'

/**
 * Admin route. Three states based on Firebase Auth:
 *   - loading: still resolving the initial auth check
 *   - admin:   show the dashboard
 *   - other:   show the login form (or "not authorized" if signed in but
 *              not the admin email — the login component handles that)
 *
 * Anonymous users (from the landing page's auto-sign-in) are treated as
 * "no user" here — they need to sign in with the real admin account.
 */
const Admin = () => {
  const [authState, setAuthState] = useState({ status: 'loading', user: null })

  useEffect(() => {
    const prev = document.title
    document.title = 'Admin \u2014 Jomendez Inc'
    return () => {
      document.title = prev
    }
  }, [])

  useEffect(() => {
    const unsub = onAuthChange((user) => {
      // Treat anonymous users as logged-out so the admin login form shows.
      if (!user || user.isAnonymous) {
        setAuthState({ status: 'unauth', user: null })
        return
      }
      if (isAdminUser(user)) {
        setAuthState({ status: 'admin', user })
      } else {
        setAuthState({ status: 'wrong-email', user })
      }
    })
    return () => unsub()
  }, [])

  return (
    <>
      <style>{stylesCss}</style>
      <div className="admin-root">
        {authState.status === 'loading' && (
          <div className="admin-loading">Checking session\u2026</div>
        )}
        {authState.status === 'unauth' && <AdminLogin />}
        {authState.status === 'wrong-email' && (
          <AdminLogin wrongEmail currentEmail={authState.user.email} />
        )}
        {authState.status === 'admin' && (
          <AdminDashboard user={authState.user} />
        )}
      </div>
    </>
  )
}

export default Admin
