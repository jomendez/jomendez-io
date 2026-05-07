import { useEffect, useMemo, useState } from 'react'
import { logOut } from '../../services/auth'
import {
  subscribeToSubmissions,
  setSubmissionRead,
} from '../../services/adminQueries'
import { issueAuditInvite } from '../../services/audit'
import AuditsTab from './AuditsTab'

/**
 * The collections we surface and how to render them. Adding a new
 * submission type is a matter of appending a config here.
 */
const TABS = [
  {
    id: 'applications',
    label: 'Applications',
    collection: 'applications',
    columns: [
      { key: 'createdAt', label: 'Date', render: renderDate, className: 'col-date' },
      { key: 'name', label: 'Name' },
      { key: 'company', label: 'Company' },
      { key: 'email', label: 'Email', className: 'col-email' },
      { key: 'revenue', label: 'Revenue' },
      { key: 'timeline', label: 'Timeline' },
      { key: 'details', label: 'What\u2019s not working', className: 'col-truncate' },
    ],
    searchableFields: ['name', 'company', 'email', 'details'],
    detailFields: ['name', 'company', 'email', 'revenue', 'timeline', 'details', 'createdAt', 'createdByUid', 'userAgent', 'ip', 'referrer'],
    csvFields: ['createdAt', 'name', 'company', 'email', 'revenue', 'timeline', 'details', 'read'],
  },
  {
    id: 'leads',
    label: 'Leads',
    collection: 'checklist_leads',
    columns: [
      { key: 'createdAt', label: 'Date', render: renderDate, className: 'col-date' },
      { key: 'email', label: 'Email', className: 'col-email' },
    ],
    searchableFields: ['email'],
    detailFields: ['email', 'createdAt', 'createdByUid', 'userAgent', 'ip', 'referrer'],
    csvFields: ['createdAt', 'email', 'read'],
  },
  {
    id: 'waitlist',
    label: 'Waitlist',
    collection: 'waitlist_leads',
    // Waitlist rows get an extra inline action: "Send audit invite",
    // wired below in <Row>. The function call stays out of the generic
    // table machinery so the rest of the tabs are unaffected.
    rowActions: ['issueInvite'],
    columns: [
      { key: 'createdAt', label: 'Date', render: renderDate, className: 'col-date' },
      { key: 'email', label: 'Email', className: 'col-email' },
      { key: 'source', label: 'Source' },
    ],
    searchableFields: ['email', 'source'],
    detailFields: ['email', 'source', 'createdAt', 'createdByUid', 'userAgent', 'ip', 'referrer'],
    csvFields: ['createdAt', 'email', 'source', 'read'],
  },
]

// Special pseudo-tab: when active, the dashboard renders the bespoke
// AuditsTab component instead of the generic submissions table. Lives
// outside TABS so the existing search / date-filter / CSV machinery
// doesn't try to apply to it.
const AUDITS_TAB = { id: 'audits', label: 'Audits' }

const DATE_FILTERS = [
  { id: 'all', label: 'All time' },
  { id: '24h', label: 'Last 24 hours', ms: 24 * 60 * 60 * 1000 },
  { id: '7d', label: 'Last 7 days', ms: 7 * 24 * 60 * 60 * 1000 },
  { id: '30d', label: 'Last 30 days', ms: 30 * 24 * 60 * 60 * 1000 },
  { id: '90d', label: 'Last 90 days', ms: 90 * 24 * 60 * 60 * 1000 },
]

function renderDate(value) {
  if (!value) return '\u2014'
  const ms = value.toMillis ? value.toMillis() : new Date(value).getTime()
  if (!Number.isFinite(ms)) return '\u2014'
  const d = new Date(ms)
  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function toMillis(value) {
  if (!value) return 0
  if (value.toMillis) return value.toMillis()
  const ms = new Date(value).getTime()
  return Number.isFinite(ms) ? ms : 0
}

function downloadCsv(filename, rows, fields) {
  const escape = (v) => {
    if (v === null || v === undefined) return ''
    const s = typeof v === 'string' ? v : String(v)
    if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`
    return s
  }
  const header = fields.join(',')
  const body = rows
    .map((row) =>
      fields
        .map((f) => {
          const v = row[f]
          if (f === 'createdAt') return escape(renderDate(v))
          return escape(v)
        })
        .join(',')
    )
    .join('\n')
  const csv = `${header}\n${body}`
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

const AdminDashboard = ({ user }) => {
  const [activeTabId, setActiveTabId] = useState(TABS[0].id)
  // Map of tabId -> rows[]
  const [rowsByTab, setRowsByTab] = useState({
    applications: null,
    leads: null,
    waitlist: null,
  })
  const [errorByTab, setErrorByTab] = useState({})
  const [search, setSearch] = useState('')
  const [dateFilter, setDateFilter] = useState('all')
  const [expandedId, setExpandedId] = useState(null)
  // Per-row issuing-invite UI state, keyed by the waitlist row id.
  // Values: 'idle' | 'sending' | 'sent' | 'error'
  const [inviteState, setInviteState] = useState({})

  const isAuditsTab = activeTabId === AUDITS_TAB.id
  const activeTab = useMemo(
    () => (isAuditsTab ? null : TABS.find((t) => t.id === activeTabId)),
    [activeTabId, isAuditsTab]
  )

  // Subscribe to BOTH collections up-front so the tab badges (unread counts)
  // update live without waiting for a tab switch.
  useEffect(() => {
    const unsubs = TABS.map((tab) =>
      subscribeToSubmissions(
        tab.collection,
        (rows) =>
          setRowsByTab((prev) => ({ ...prev, [tab.id]: rows })),
        (err) =>
          setErrorByTab((prev) => ({ ...prev, [tab.id]: err.message }))
      )
    )
    return () => unsubs.forEach((u) => u && u())
  }, [])

  // Reset expansion + search when changing tabs.
  useEffect(() => {
    setExpandedId(null)
    setSearch('')
  }, [activeTabId])

  const rows = rowsByTab[activeTabId]
  const isLoading = rows === null
  const tabError = errorByTab[activeTabId]

  const filteredRows = useMemo(() => {
    if (!rows) return []
    const term = search.trim().toLowerCase()
    const dateCutoff = (() => {
      const conf = DATE_FILTERS.find((f) => f.id === dateFilter)
      if (!conf || !conf.ms) return 0
      return Date.now() - conf.ms
    })()

    return rows.filter((r) => {
      if (dateCutoff && toMillis(r.createdAt) < dateCutoff) return false
      if (!term) return true
      return activeTab.searchableFields.some((f) => {
        const v = r[f]
        return typeof v === 'string' && v.toLowerCase().includes(term)
      })
    })
  }, [rows, search, dateFilter, activeTab])

  const unreadCount = (tabId) => {
    const list = rowsByTab[tabId]
    if (!list) return 0
    return list.filter((r) => !r.read).length
  }

  const handleToggleRead = async (id, currentRead) => {
    try {
      await setSubmissionRead(activeTab.collection, id, !currentRead)
    } catch (err) {
      console.error('Failed to update read status:', err)
      alert('Could not update. Try again.')
    }
  }

  const handleExportCsv = () => {
    const filename = `${activeTab.id}-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`
    downloadCsv(filename, filteredRows, activeTab.csvFields)
  }

  const handleIssueInvite = async (row) => {
    if (inviteState[row.id] === 'sending') return
    setInviteState((s) => ({ ...s, [row.id]: 'sending' }))
    try {
      const result = await issueAuditInvite({ email: row.email, waitlistLeadId: row.id })
      if (result?.emailSent === false) {
        // Invite saved to Firestore, email delivery failed. Surface the
        // URL so the admin can share it manually until the underlying
        // email problem is fixed.
        setInviteState((s) => ({ ...s, [row.id]: 'email-failed' }))
        const lines = [
          'Invite was created but the email failed to send.',
          '',
          `Reason: ${result.emailError || 'unknown'}`,
          '',
          'Manual link (copy this and send it yourself):',
          result.inviteUrl,
        ]
        if (window.prompt(lines.join('\n'), result.inviteUrl) !== null) {
          // User saw the prompt; we deliberately leave the inviteState
          // as 'email-failed' so the row makes the failure visible.
        }
      } else {
        setInviteState((s) => ({ ...s, [row.id]: 'sent' }))
      }
    } catch (err) {
      console.error('Failed to issue audit invite:', err)
      setInviteState((s) => ({ ...s, [row.id]: 'error' }))
      alert(`Could not create invite: ${err.message || 'unknown error'}`)
    }
  }

  return (
    <div className="admin-shell">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-header-left">
          <h1>
            Submissions <em>dashboard</em>
          </h1>
          <span className="admin-user admin-mono">{user.email}</span>
        </div>
        <button
          type="button"
          className="admin-btn admin-btn-ghost"
          onClick={() => logOut()}
        >
          Sign out
        </button>
      </div>

      {/* Tabs */}
      <div className="admin-tabs" role="tablist">
        {TABS.map((tab) => {
          const count = unreadCount(tab.id)
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTabId === tab.id}
              className={`admin-tab${activeTabId === tab.id ? ' active' : ''}`}
              onClick={() => setActiveTabId(tab.id)}
              type="button"
            >
              {tab.label}
              {count > 0 && <span className="admin-tab-count">{count}</span>}
            </button>
          )
        })}
        <button
          role="tab"
          aria-selected={isAuditsTab}
          className={`admin-tab${isAuditsTab ? ' active' : ''}`}
          onClick={() => setActiveTabId(AUDITS_TAB.id)}
          type="button"
        >
          {AUDITS_TAB.label}
        </button>
      </div>

      {isAuditsTab ? (
        <AuditsTab user={user} />
      ) : (
      <>
      {/* Toolbar */}
      <div className="admin-toolbar">
        <div className="admin-search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            className="admin-search-input"
            type="search"
            placeholder={`Search ${activeTab.searchableFields.join(', ')}\u2026`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="admin-select"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          aria-label="Date filter"
        >
          {DATE_FILTERS.map((f) => (
            <option key={f.id} value={f.id}>
              {f.label}
            </option>
          ))}
        </select>

        <div className="admin-toolbar-spacer" />

        <span className="admin-toolbar-meta admin-mono">
          {filteredRows.length} of {rows?.length ?? 0}
        </span>

        <button
          type="button"
          className="admin-btn admin-btn-ghost"
          onClick={handleExportCsv}
          disabled={filteredRows.length === 0}
        >
          Export CSV
        </button>
      </div>

      {/* Table / states */}
      {tabError ? (
        <div className="admin-empty">
          <h3>Couldn\u2019t load submissions</h3>
          <p>{tabError}</p>
        </div>
      ) : isLoading ? (
        <div className="admin-loading">Loading\u2026</div>
      ) : filteredRows.length === 0 ? (
        <div className="admin-empty">
          <h3>Nothing here yet</h3>
          <p>
            {rows.length === 0
              ? 'No submissions in this collection.'
              : 'No matches for the current filters.'}
          </p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 30 }} aria-label="Status" />
                {activeTab.columns.map((col) => (
                  <th key={col.key}>{col.label}</th>
                ))}
                <th className="col-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => {
                const isExpanded = expandedId === row.id
                const unread = !row.read
                return (
                  <Row
                    key={row.id}
                    row={row}
                    columns={activeTab.columns}
                    detailFields={activeTab.detailFields}
                    rowActions={activeTab.rowActions || []}
                    inviteStatus={inviteState[row.id]}
                    isExpanded={isExpanded}
                    unread={unread}
                    onToggleExpand={() =>
                      setExpandedId(isExpanded ? null : row.id)
                    }
                    onToggleRead={() => handleToggleRead(row.id, row.read)}
                    onIssueInvite={() => handleIssueInvite(row)}
                  />
                )
              })}
            </tbody>
          </table>
        </div>
      )}
      </>
      )}
    </div>
  )
}

const Row = ({
  row,
  columns,
  detailFields,
  rowActions = [],
  inviteStatus,
  isExpanded,
  unread,
  onToggleExpand,
  onToggleRead,
  onIssueInvite,
}) => {
  return (
    <>
      <tr
        className={unread ? 'unread' : undefined}
        onClick={onToggleExpand}
      >
        <td>
          {unread ? (
            <span className="admin-pill unread">New</span>
          ) : (
            <span className="admin-pill">Read</span>
          )}
        </td>
        {columns.map((col) => {
          const value = row[col.key]
          const display = col.render ? col.render(value) : value ?? '\u2014'
          return (
            <td key={col.key} className={col.className}>
              {display}
            </td>
          )
        })}
        <td className="col-actions">
          {rowActions.includes('issueInvite') && (
            <button
              type="button"
              className="admin-btn admin-btn-ghost"
              onClick={(e) => {
                e.stopPropagation()
                onIssueInvite()
              }}
              disabled={inviteStatus === 'sending'}
              style={{ marginRight: 8 }}
              title="Send a fresh audit invite to this email"
            >
              {inviteStatus === 'sending' && 'Sending\u2026'}
              {inviteStatus === 'sent' && 'Invited \u2713'}
              {inviteStatus === 'email-failed' && 'Email failed \u2014 retry'}
              {(!inviteStatus || inviteStatus === 'idle' || inviteStatus === 'error') &&
                (inviteStatus === 'error' ? 'Retry invite' : 'Send audit invite')}
            </button>
          )}
          <button
            type="button"
            className="admin-btn admin-btn-ghost"
            onClick={(e) => {
              e.stopPropagation()
              onToggleRead()
            }}
          >
            {unread ? 'Mark read' : 'Mark unread'}
          </button>
        </td>
      </tr>
      {isExpanded && (
        <tr className="admin-row-expanded">
          <td colSpan={columns.length + 2}>
            <div className="admin-detail">
              {detailFields.map((field) => {
                const value = row[field]
                const display =
                  field === 'createdAt'
                    ? renderDate(value)
                    : value === null || value === undefined || value === ''
                    ? '\u2014'
                    : String(value)
                const isMono =
                  field === 'createdByUid' ||
                  field === 'userAgent' ||
                  field === 'ip' ||
                  field === 'referrer'
                return (
                  <div key={field}>
                    <div className="admin-detail-field-label">{field}</div>
                    <div
                      className={`admin-detail-field-value${
                        isMono ? ' mono' : ''
                      }`}
                    >
                      {display}
                    </div>
                  </div>
                )
              })}
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

export default AdminDashboard
