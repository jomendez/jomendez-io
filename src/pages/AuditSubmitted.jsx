import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import stylesCss from './Audit.styles.css?raw'

/**
 * /audit/submitted
 *
 * Confirmation screen after a successful audit submission. The user
 * never logs in to check status — the next time they hear from us is
 * the "audit ready" email containing the magic link to their results.
 */

const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap'

const AuditSubmitted = () => {
  const [params] = useSearchParams()
  const submissionId = params.get('id')

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = FONTS_HREF
    document.head.appendChild(link)
    return () => link.parentNode && link.parentNode.removeChild(link)
  }, [])

  useEffect(() => {
    const prev = document.title
    document.title = 'Audit submitted \u2014 Jomendez Inc'
    return () => { document.title = prev }
  }, [])

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
            <span className="mono micro audit-nav-meta">SUBMITTED</span>
          </div>
        </header>

        <main className="audit-main">
          <div className="wrap">
            <div className="audit-state">
              <h1>Got it. Thanks for taking the audit.</h1>
              <p>
                Your answers are with Jose. He&rsquo;ll review them personally and email you a full report within a few business days &mdash; PDF, scores across the 8 dimensions, and recommendations.
              </p>
              <p>
                You don&rsquo;t need to do anything else. The next email from <strong>jomendez.io</strong> will be your finished audit.
              </p>
              {submissionId && (
                <p className="mono micro" style={{ marginTop: 32, color: 'var(--muted-2)' }}>
                  REF&nbsp;&middot;&nbsp;{submissionId}
                </p>
              )}
              <div className="btn-row" style={{ marginTop: 24 }}>
                <a href="/" className="btn btn-outline">Back to homepage</a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default AuditSubmitted
