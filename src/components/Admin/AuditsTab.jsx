import { useEffect, useMemo, useState } from 'react'
import { subscribeToSubmissions } from '../../services/adminQueries'
import {
  finalizeAudit,
  uploadAuditPdf,
  sendAuditMessage,
} from '../../services/audit'
import { DIMENSION_META } from '../../data/auditQuestions'
import { AUDIT_DIMENSION_KEYS } from '../AuditRadar'

/**
 * AuditsTab — bespoke admin view for the audit_submissions collection.
 *
 * Above the list: a status filter (pending_review / in_progress / ready / all).
 *
 * For each submission row, expand to:
 *   - read all questionnaire answers
 *   - upload the PDF report
 *   - enter 8 scores (0-100) via numeric inputs, plus a recommendation
 *     paragraph per dimension
 *   - click "Send to user" to finalize the audit (this also triggers the
 *     audit-ready email via the onAuditReady Firestore trigger)
 *   - send a free-form message to the user
 *
 * The detail view is controlled (its own state lives here, keyed by
 * submission id) so inputs persist while the admin is mid-edit.
 */

const STATUS_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'pending_review', label: 'Pending review' },
  { id: 'in_progress', label: 'In progress' },
  { id: 'ready', label: 'Ready' },
]

const STATUS_LABEL = {
  pending_review: 'Pending review',
  in_progress: 'In progress',
  ready: 'Ready',
}

const renderDate = (v) => {
  if (!v) return '\u2014'
  const ms = v.toMillis ? v.toMillis() : new Date(v).getTime()
  if (!Number.isFinite(ms)) return '\u2014'
  const d = new Date(ms)
  return d.toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

const blankScores = () => Object.fromEntries(AUDIT_DIMENSION_KEYS.map((k) => [k, 50]))
const blankRecs = () => Object.fromEntries(AUDIT_DIMENSION_KEYS.map((k) => [k, '']))

const AuditsTab = () => {
  const [rows, setRows] = useState(null)
  const [error, setError] = useState(null)
  const [statusFilter, setStatusFilter] = useState('pending_review')
  const [expandedId, setExpandedId] = useState(null)

  // Per-submission edit state, keyed by submission id. Lazily initialized
  // when the row expands. Holds: scores, recommendations, uploaded PDF
  // info (path/filename), upload progress, finalize state.
  const [drafts, setDrafts] = useState({})

  useEffect(() => {
    const unsub = subscribeToSubmissions(
      'audit_submissions',
      (data) => setRows(data),
      (err) => setError(err.message)
    )
    return () => unsub && unsub()
  }, [])

  const filteredRows = useMemo(() => {
    if (!rows) return []
    if (statusFilter === 'all') return rows
    return rows.filter((r) => r.status === statusFilter)
  }, [rows, statusFilter])

  const ensureDraft = (row) => {
    setDrafts((d) => {
      if (d[row.id]) return d
      return {
        ...d,
        [row.id]: {
          scores: row.scores || blankScores(),
          recommendations: row.recommendations || blankRecs(),
          pdfStoragePath: row.pdfStoragePath || null,
          pdfFilename: row.pdfFilename || null,
          uploadStatus: 'idle', // idle | uploading | uploaded | error
          uploadError: null,
          finalizeStatus: 'idle', // idle | sending | sent | error
          finalizeError: null,
        },
      }
    })
  }

  const setDraft = (id, patch) =>
    setDrafts((d) => ({ ...d, [id]: { ...d[id], ...patch } }))

  const setDraftScore = (id, key, value) =>
    setDrafts((d) => ({
      ...d,
      [id]: {
        ...d[id],
        scores: { ...d[id].scores, [key]: clamp0to100(value) },
      },
    }))

  const setDraftRec = (id, key, value) =>
    setDrafts((d) => ({
      ...d,
      [id]: { ...d[id], recommendations: { ...d[id].recommendations, [key]: value } },
    }))

  const onPdfPick = async (row, file) => {
    if (!file) return
    setDraft(row.id, { uploadStatus: 'uploading', uploadError: null })
    try {
      const { path, filename } = await uploadAuditPdf({
        submissionId: row.id,
        file,
      })
      setDraft(row.id, {
        uploadStatus: 'uploaded',
        pdfStoragePath: path,
        pdfFilename: filename,
      })
    } catch (err) {
      console.error('PDF upload failed:', err)
      setDraft(row.id, {
        uploadStatus: 'error',
        uploadError: err.message || 'Upload failed.',
      })
    }
  }

  const onFinalize = async (row) => {
    const draft = drafts[row.id]
    if (!draft) return
    if (!draft.pdfStoragePath) {
      alert('Upload the PDF before sending the audit to the user.')
      return
    }
    if (!confirm(`Send this audit to ${row.email}?\nThis will email them a magic link to view the report.`)) {
      return
    }
    setDraft(row.id, { finalizeStatus: 'sending', finalizeError: null })
    try {
      await finalizeAudit({
        submissionId: row.id,
        scores: draft.scores,
        recommendations: draft.recommendations,
        pdfStoragePath: draft.pdfStoragePath,
        pdfFilename: draft.pdfFilename,
      })
      setDraft(row.id, { finalizeStatus: 'sent' })
    } catch (err) {
      console.error('Finalize failed:', err)
      setDraft(row.id, {
        finalizeStatus: 'error',
        finalizeError: err.message || 'Could not finalize the audit.',
      })
    }
  }

  if (error) {
    return (
      <div className="admin-empty">
        <h3>Couldn&rsquo;t load audit submissions</h3>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="audits-tab">
      <div className="admin-toolbar">
        <select
          className="admin-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          aria-label="Status filter"
        >
          {STATUS_FILTERS.map((f) => (
            <option key={f.id} value={f.id}>{f.label}</option>
          ))}
        </select>
        <div className="admin-toolbar-spacer" />
        <span className="admin-toolbar-meta admin-mono">
          {filteredRows.length} submission{filteredRows.length === 1 ? '' : 's'}
        </span>
      </div>

      {rows === null ? (
        <div className="admin-loading">Loading&hellip;</div>
      ) : filteredRows.length === 0 ? (
        <div className="admin-empty">
          <h3>No audit submissions yet</h3>
          <p>
            Submissions show up here after a user completes the audit via their
            invite link. Issue invites from the <strong>Waitlist</strong> tab.
          </p>
        </div>
      ) : (
        <div className="audits-list">
          {filteredRows.map((row) => {
            const isExpanded = expandedId === row.id
            return (
              <SubmissionCard
                key={row.id}
                row={row}
                isExpanded={isExpanded}
                onToggle={() => {
                  if (isExpanded) {
                    setExpandedId(null)
                  } else {
                    ensureDraft(row)
                    setExpandedId(row.id)
                  }
                }}
                draft={drafts[row.id]}
                onPdfPick={(f) => onPdfPick(row, f)}
                onScoreChange={(k, v) => setDraftScore(row.id, k, v)}
                onRecChange={(k, v) => setDraftRec(row.id, k, v)}
                onFinalize={() => onFinalize(row)}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

const SubmissionCard = ({
  row,
  isExpanded,
  onToggle,
  draft,
  onPdfPick,
  onScoreChange,
  onRecChange,
  onFinalize,
}) => {
  const status = row.status || 'pending_review'
  return (
    <div className={`audit-card audit-card--${status}`}>
      <button
        type="button"
        className="audit-card-head"
        onClick={onToggle}
        aria-expanded={isExpanded}
      >
        <div className="audit-card-head-left">
          <span className={`audit-status admin-mono audit-status--${status}`}>
            {STATUS_LABEL[status] || status}
          </span>
          <span className="audit-card-email">{row.email || '\u2014'}</span>
        </div>
        <div className="audit-card-head-right admin-mono">
          <span>{(row.depth || 'simple').toUpperCase()}</span>
          <span>{renderDate(row.createdAt)}</span>
          <span aria-hidden="true">{isExpanded ? '\u25B4' : '\u25BE'}</span>
        </div>
      </button>

      {isExpanded && draft && (
        <div className="audit-card-body">
          <AnswersSection answers={row.answers || []} />

          <hr className="audit-divider" />

          <PdfSection
            row={row}
            draft={draft}
            onPdfPick={onPdfPick}
          />

          <hr className="audit-divider" />

          <ScoresSection
            scores={draft.scores}
            recs={draft.recommendations}
            onScoreChange={onScoreChange}
            onRecChange={onRecChange}
            disabled={status === 'ready'}
          />

          <hr className="audit-divider" />

          <FinalizeSection
            row={row}
            draft={draft}
            onFinalize={onFinalize}
          />

          <hr className="audit-divider" />

          <MessageComposer submissionId={row.id} email={row.email} />
        </div>
      )}
    </div>
  )
}

const AnswersSection = ({ answers }) => (
  <section className="audit-section">
    <h3 className="audit-section-title">Their answers</h3>
    {answers.length === 0 ? (
      <p className="admin-mono" style={{ color: 'var(--admin-muted, #5A5D66)' }}>
        No answers recorded.
      </p>
    ) : (
      <ol className="audit-answers">
        {answers.map((a, i) => (
          <li key={i}>
            <span className="audit-answer-qid admin-mono">{a.qid}</span>
            <span className="audit-answer-value">
              {typeof a.value === 'number' ? `#${a.value}` : String(a.value)}
            </span>
          </li>
        ))}
      </ol>
    )}
  </section>
)

const PdfSection = ({ row, draft, onPdfPick }) => (
  <section className="audit-section">
    <h3 className="audit-section-title">PDF report</h3>
    {draft.pdfStoragePath ? (
      <div className="admin-mono" style={{ marginBottom: 12 }}>
        Uploaded: <strong>{draft.pdfFilename}</strong>
      </div>
    ) : (
      <p style={{ marginBottom: 12, color: 'var(--admin-muted, #5A5D66)' }}>
        Upload the audit PDF you produced offline. Max 25MB. Required before
        sending the audit to {row.email}.
      </p>
    )}
    <input
      type="file"
      accept="application/pdf"
      onChange={(e) => onPdfPick(e.target.files?.[0])}
      disabled={draft.uploadStatus === 'uploading'}
    />
    {draft.uploadStatus === 'uploading' && (
      <p className="admin-mono" style={{ marginTop: 8 }}>Uploading&hellip;</p>
    )}
    {draft.uploadStatus === 'uploaded' && (
      <p className="admin-mono" style={{ marginTop: 8, color: '#2E7D32' }}>
        Upload complete &#10003;
      </p>
    )}
    {draft.uploadStatus === 'error' && (
      <p className="admin-mono" style={{ marginTop: 8, color: '#C0392B' }}>
        {draft.uploadError}
      </p>
    )}
  </section>
)

const ScoresSection = ({ scores, recs, onScoreChange, onRecChange, disabled }) => (
  <section className="audit-section">
    <h3 className="audit-section-title">Scores &amp; recommendations</h3>
    <p style={{ marginBottom: 16, color: 'var(--admin-muted, #5A5D66)' }}>
      One score (0&ndash;100) and an optional recommendation per dimension.
      The scores drive the radar chart on the user&rsquo;s results page.
    </p>
    <div className="audit-scores">
      {AUDIT_DIMENSION_KEYS.map((k) => {
        const meta = DIMENSION_META.find((d) => d.key === k)
        return (
          <div className="audit-score-row" key={k}>
            <div className="audit-score-row-head">
              <label className="audit-score-label">
                <strong>{meta?.label || k}</strong>
                <span className="admin-mono">{meta?.blurb}</span>
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="1"
                value={scores[k] ?? ''}
                onChange={(e) => onScoreChange(k, e.target.value)}
                disabled={disabled}
                className="audit-score-input"
                aria-label={`${meta?.label || k} score`}
              />
            </div>
            <textarea
              value={recs[k] ?? ''}
              onChange={(e) => onRecChange(k, e.target.value)}
              placeholder={`Recommendation for ${meta?.label || k} (optional)`}
              disabled={disabled}
              className="audit-rec-textarea"
              rows={2}
            />
          </div>
        )
      })}
    </div>
  </section>
)

const FinalizeSection = ({ row, draft, onFinalize }) => {
  if (row.status === 'ready') {
    return (
      <section className="audit-section">
        <h3 className="audit-section-title">Already sent</h3>
        <p>
          This audit was finalized and the user was emailed a magic link
          to view it. To make changes, edit the submission directly in
          Firestore.
        </p>
      </section>
    )
  }
  return (
    <section className="audit-section">
      <h3 className="audit-section-title">Send to user</h3>
      <p style={{ marginBottom: 12, color: 'var(--admin-muted, #5A5D66)' }}>
        This locks in the scores, attaches the PDF, and emails {row.email}
        a private magic link to view their results. Make sure everything
        above is right &mdash; you can&rsquo;t un-send it.
      </p>
      <button
        type="button"
        className="admin-btn admin-btn-primary"
        onClick={onFinalize}
        disabled={
          draft.finalizeStatus === 'sending' ||
          draft.finalizeStatus === 'sent' ||
          !draft.pdfStoragePath
        }
      >
        {draft.finalizeStatus === 'sending' && 'Sending\u2026'}
        {draft.finalizeStatus === 'sent' && 'Sent \u2713'}
        {(draft.finalizeStatus === 'idle' || draft.finalizeStatus === 'error') && 'Send audit to user'}
      </button>
      {draft.finalizeStatus === 'error' && (
        <p className="admin-mono" style={{ marginTop: 8, color: '#C0392B' }}>
          {draft.finalizeError}
        </p>
      )}
    </section>
  )
}

const MessageComposer = ({ submissionId, email }) => {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [err, setErr] = useState(null)

  const send = async () => {
    if (!subject.trim() || !body.trim()) {
      alert('Subject and body required.')
      return
    }
    setStatus('sending')
    setErr(null)
    try {
      await sendAuditMessage({ submissionId, subject: subject.trim(), body: body.trim() })
      setStatus('sent')
      setSubject('')
      setBody('')
    } catch (e) {
      console.error(e)
      setStatus('error')
      setErr(e.message || 'Failed to send.')
    }
  }

  return (
    <section className="audit-section">
      <h3 className="audit-section-title">Send a message</h3>
      <p style={{ marginBottom: 12, color: 'var(--admin-muted, #5A5D66)' }}>
        Free-form email to {email}. Use this for clarifying questions,
        scheduling notes, or anything you want to communicate before the
        audit is finalized.
      </p>
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="audit-msg-subject"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder={'Write your message\u2026'}
        rows={5}
        className="audit-msg-body"
      />
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 8 }}>
        <button
          type="button"
          className="admin-btn admin-btn-ghost"
          onClick={send}
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Sending\u2026' : status === 'sent' ? 'Sent \u2713' : 'Send email'}
        </button>
        {err && <span className="admin-mono" style={{ color: '#C0392B' }}>{err}</span>}
      </div>
    </section>
  )
}

const clamp0to100 = (v) => {
  const n = Number(v)
  if (!Number.isFinite(n)) return 0
  return Math.max(0, Math.min(100, Math.round(n)))
}

export default AuditsTab
