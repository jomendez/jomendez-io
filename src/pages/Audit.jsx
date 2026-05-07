import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import stylesCss from './Audit.styles.css?raw'
import AuditDepthPicker from '../components/AuditDepthPicker'
import AuditQuestionnaire from '../components/AuditQuestionnaire'
import { validateAuditInvite, submitAudit } from '../services/audit'

/**
 * /audit/:inviteToken
 *
 * Three states:
 *   1. validating — checking the invite with the backend
 *   2. invalid    — invite expired / used / unknown
 *   3. depth      — invite valid, user picks depth
 *   4. quiz       — multi-step questionnaire
 *
 * On successful submit we navigate to /audit/submitted (the thank-you
 * route). The submission id stays in URL state so the thank-you page
 * can show it (but it's not used for anything else; the user only
 * comes back via the email link).
 */

const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap'

const Audit = () => {
  const { inviteToken } = useParams()
  const navigate = useNavigate()

  const [state, setState] = useState('validating')
  const [reason, setReason] = useState(null) // 'expired' | 'already-used' | 'not-found'
  const [email, setEmail] = useState(null)
  const [depth, setDepth] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  // Fonts
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = FONTS_HREF
    document.head.appendChild(link)
    return () => link.parentNode && link.parentNode.removeChild(link)
  }, [])

  // Title
  useEffect(() => {
    const prev = document.title
    document.title = 'The 8-Point Business Audit \u2014 Jomendez Inc'
    return () => { document.title = prev }
  }, [])

  // Validate the invite on mount.
  useEffect(() => {
    let cancelled = false
    if (!inviteToken) {
      setState('invalid')
      setReason('not-found')
      return
    }
    ;(async () => {
      try {
        const result = await validateAuditInvite(inviteToken)
        if (cancelled) return
        if (result?.ok) {
          setEmail(result.email)
          setState('depth')
        } else {
          setEmail(result?.email || null)
          setReason(result?.reason || 'not-found')
          setState('invalid')
        }
      } catch (err) {
        if (cancelled) return
        const code = err?.code || ''
        if (code === 'functions/not-found') {
          setReason('not-found')
        } else {
          console.error('Failed to validate invite:', err)
          setReason('error')
        }
        setState('invalid')
      }
    })()
    return () => { cancelled = true }
  }, [inviteToken])

  const startQuiz = (chosenDepth) => {
    setDepth(chosenDepth)
    setState('quiz')
  }

  const cancelQuiz = () => {
    setState('depth')
  }

  const onSubmit = async ({ depth: d, answers }) => {
    if (submitting) return
    setSubmitError(null)
    setSubmitting(true)
    try {
      const result = await submitAudit({ tokenId: inviteToken, depth: d, answers })
      navigate(`/audit/submitted?id=${encodeURIComponent(result.submissionId)}`, {
        replace: true,
      })
    } catch (err) {
      console.error('Failed to submit audit:', err)
      const code = err?.code || ''
      if (code === 'functions/failed-precondition') {
        // Token used or expired between validate and submit.
        setReason(err.message?.includes('expired') ? 'expired' : 'already-used')
        setState('invalid')
      } else {
        setSubmitError('Something went wrong saving your answers. Please try again in a moment.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <style>{stylesCss}</style>

      <div className="audit-shell">
        <header className="audit-nav">
          <div className="audit-nav-inner">
            <a href="/" className="audit-nav-logo" aria-label="Jomendez Inc home">
              <span className="dot" aria-hidden="true"></span>
              <span className="mono micro">JOMENDEZ&nbsp;&nbsp;/&nbsp;&nbsp;INC</span>
            </a>
            <span className="mono micro audit-nav-meta">THE 8-POINT BUSINESS AUDIT</span>
          </div>
        </header>

        <main className="audit-main">
          <div className="wrap">
            {state === 'validating' && (
              <div className="audit-state" aria-busy="true">
                <h1>Checking your invite&hellip;</h1>
                <p>Hang tight &mdash; verifying your access.</p>
              </div>
            )}

            {state === 'invalid' && (
              <div className="audit-state">
                {reason === 'expired' && (
                  <>
                    <h1>This invite has expired.</h1>
                    <p>
                      Invitations are good for 30 days. Reply to the original email and Jose will send you a fresh one.
                    </p>
                  </>
                )}
                {reason === 'already-used' && (
                  <>
                    <h1>This invite has already been used.</h1>
                    <p>
                      Looks like this audit was already submitted. If that wasn&rsquo;t you, or you need access to your results, email <a href="mailto:support@jomendez.io" style={{ color: 'var(--accent)' }}>support@jomendez.io</a>.
                    </p>
                  </>
                )}
                {(reason === 'not-found' || reason === 'error' || !reason) && (
                  <>
                    <h1>We couldn&rsquo;t verify your invite.</h1>
                    <p>
                      Double-check the link in your email, or reply to that email and Jose will help you out.
                    </p>
                  </>
                )}
                <div className="btn-row">
                  <a href="/" className="btn btn-outline">Back to homepage</a>
                </div>
              </div>
            )}

            {state === 'depth' && (
              <>
                <div className="audit-intro">
                  <span className="eyebrow micro">START HERE</span>
                  <h1>
                    The 8-Point <em>Business Audit</em>
                  </h1>
                  <p>
                    Pick the depth that fits the time you have. Your answers go straight to Jose for review &mdash; you&rsquo;ll get a personalized report back within a few business days.
                  </p>
                  {email && (
                    <p className="as-email mono micro">
                      Submitting as <strong>{email}</strong>
                    </p>
                  )}
                </div>

                <AuditDepthPicker
                  value={depth}
                  onSelect={setDepth}
                  onContinue={startQuiz}
                />
              </>
            )}

            {state === 'quiz' && depth && (
              <>
                <AuditQuestionnaire
                  depth={depth}
                  email={email || ''}
                  onSubmit={onSubmit}
                  onCancel={cancelQuiz}
                  isSubmitting={submitting}
                />
                {submitError && (
                  <p
                    role="alert"
                    className="mono micro"
                    style={{
                      textAlign: 'center',
                      marginTop: 24,
                      color: 'var(--error)',
                    }}
                  >
                    {submitError}
                  </p>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </>
  )
}

export default Audit
