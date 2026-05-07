import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import stylesCss from './AuditResults.styles.css?raw'
import AuditRadar, { AUDIT_DIMENSIONS, AUDIT_DIMENSION_KEYS } from '../components/AuditRadar'
import { DIMENSION_META } from '../data/auditQuestions'
import { getAuditResults } from '../services/audit'

/**
 * /audit/results/:submissionId?t={resultsToken}
 *
 * The magic-link landing page. Fetches the audit via the resultsToken,
 * renders the radar with the actual admin-entered scores, lists scores
 * + recommendations per dimension, and embeds the PDF (with a
 * download fallback). The PDF URL is a short-lived signed URL the
 * server mints on each call.
 *
 * If the token is wrong, we show a clean error rather than leaking
 * any audit data.
 */

const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap'

const dimensionMeta = (key) =>
  DIMENSION_META.find((d) => d.key === key) || { label: key, blurb: '' }

const AuditResults = () => {
  const { submissionId } = useParams()
  const [params] = useSearchParams()
  const token = params.get('t') || ''

  const [state, setState] = useState('loading') // loading | ready | denied | notReady | error
  const [data, setData] = useState(null)

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = FONTS_HREF
    document.head.appendChild(link)
    return () => link.parentNode && link.parentNode.removeChild(link)
  }, [])

  useEffect(() => {
    const prev = document.title
    document.title = 'Your audit results \u2014 Jomendez Inc'
    return () => { document.title = prev }
  }, [])

  useEffect(() => {
    let cancelled = false
    if (!submissionId || !token) {
      setState('denied')
      return
    }
    ;(async () => {
      try {
        const r = await getAuditResults({ submissionId, token })
        if (cancelled) return
        setData(r)
        setState('ready')
      } catch (err) {
        if (cancelled) return
        const code = err?.code || ''
        if (code === 'functions/permission-denied') setState('denied')
        else if (code === 'functions/failed-precondition') setState('notReady')
        else if (code === 'functions/not-found') setState('denied')
        else {
          console.error('Failed to load audit:', err)
          setState('error')
        }
      }
    })()
    return () => { cancelled = true }
  }, [submissionId, token])

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
            <span className="mono micro audit-nav-meta">YOUR AUDIT</span>
          </div>
        </header>

        <main className="audit-main">
          <div className="wrap">
            {state === 'loading' && (
              <div className="audit-state" aria-busy="true">
                <h1>Loading your audit&hellip;</h1>
                <p>One moment.</p>
              </div>
            )}

            {state === 'denied' && (
              <div className="audit-state">
                <h1>That link doesn&rsquo;t look right.</h1>
                <p>
                  This audit link has either expired or been opened on the wrong account. Reply to your audit-ready email and Jose will send a fresh one.
                </p>
                <a href="/" className="btn btn-outline" style={{ marginTop: 16 }}>Back to homepage</a>
              </div>
            )}

            {state === 'notReady' && (
              <div className="audit-state">
                <h1>Your audit isn&rsquo;t ready just yet.</h1>
                <p>
                  Jose is still working on it. You&rsquo;ll get an email the moment it&rsquo;s done.
                </p>
              </div>
            )}

            {state === 'error' && (
              <div className="audit-state">
                <h1>Something went wrong loading your audit.</h1>
                <p>Try refreshing the page. If it keeps happening, email <a href="mailto:support@jomendez.io" style={{ color: 'var(--accent)' }}>support@jomendez.io</a>.</p>
              </div>
            )}

            {state === 'ready' && data && (
              <ResultsBody data={data} />
            )}
          </div>
        </main>
      </div>
    </>
  )
}

const ResultsBody = ({ data }) => {
  const { scores, recommendations, pdfUrl, pdfFilename, email } = data

  // Average of the 8 scores — gives a "headline number" without us
  // having to invent a methodology.
  const values = AUDIT_DIMENSION_KEYS.map((k) => Number(scores?.[k] ?? 0))
  const avg = Math.round(values.reduce((s, n) => s + n, 0) / values.length)

  return (
    <>
      <section className="results-head">
        <div>
          <span className="eyebrow micro">YOUR REPORT</span>
          <h1>
            Your <em>8-Point Audit</em> is ready.
          </h1>
        </div>
        <div className="results-head-meta">
          <p>
            Prepared for <strong>{email}</strong>. Below: the radar across the eight dimensions, your scores, my recommendations, and the full PDF report.
          </p>
          <p style={{ marginTop: 12 }}>
            Overall score: <strong style={{ color: 'var(--accent)' }}>{avg}/100</strong>
          </p>
        </div>
      </section>

      <section className="results-radar-card">
        <div className="results-radar-wrap">
          <AuditRadar scores={scores} ariaLabel="Your 8-Point Business Audit radar" />
        </div>
        <div className="results-scores">
          {AUDIT_DIMENSION_KEYS.map((k, i) => (
            <div className="score" key={k}>
              <div className="score-num">
                <strong>{values[i]}</strong>
                <span>/ 100</span>
              </div>
              <div className="score-name">{AUDIT_DIMENSIONS[i]}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="results-recs">
        <h2>
          What I&rsquo;d <em>do next.</em>
        </h2>
        <div className="rec-list">
          {AUDIT_DIMENSION_KEYS.map((k, i) => {
            const text = recommendations?.[k] || ''
            const meta = dimensionMeta(k)
            return (
              <div className={`rec-item${text ? '' : ' rec-item--empty'}`} key={k}>
                <div className="rec-item-head">
                  <span className="rec-item-num mono micro">
                    {String(i + 1).padStart(2, '0')} / {meta.label.toUpperCase()}
                  </span>
                  <span className="rec-item-name">{meta.label}</span>
                  <span className="rec-item-score serif">{values[i]}/100</span>
                </div>
                <div className="rec-item-text">
                  {text || 'No specific note for this dimension \u2014 see the full PDF for details.'}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {pdfUrl && (
        <section className="results-pdf">
          <div className="results-pdf-head">
            <h2>Full report (PDF)</h2>
            <span className="mono micro meta">{pdfFilename || 'audit.pdf'}</span>
          </div>
          <iframe
            className="results-pdf-frame"
            title="Your audit report"
            src={pdfUrl}
          />
          <div className="results-pdf-actions">
            <a
              href={pdfUrl}
              download={pdfFilename || 'audit.pdf'}
              className="btn btn-primary"
            >
              Download PDF
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v14M5 12l7 7 7-7M3 21h18" />
              </svg>
            </a>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Open in new tab
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H8M17 7v9" />
              </svg>
            </a>
          </div>
        </section>
      )}

      <section className="results-foot">
        <h2>Want to act on this?</h2>
        <p>
          The recommendations above are the &ldquo;what.&rdquo; If you want help with the &ldquo;how,&rdquo; reply to your audit-ready email or write to <a href="mailto:support@jomendez.io" style={{ color: 'var(--accent)' }}>support@jomendez.io</a>. We&rsquo;ll figure out what to build first.
        </p>
        <a href="/" className="btn btn-outline">Back to homepage</a>
      </section>
    </>
  )
}

export default AuditResults
