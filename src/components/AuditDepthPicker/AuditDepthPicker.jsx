import { DEPTHS, DEPTH_META } from '../../data/auditQuestions'

/**
 * AuditDepthPicker — three cards (Simple / Medium / Deep) shown at the
 * start of the audit. The user picks how much time they want to invest;
 * the questionnaire then loads only the matching subset of questions.
 *
 * Pure presentational — the parent owns the selected state.
 */
const AuditDepthPicker = ({ value, onSelect, onContinue }) => {
  return (
    <div className="depth-picker">
      <div className="depth-grid" role="radiogroup" aria-label="Audit depth">
        {DEPTHS.map((d) => {
          const meta = DEPTH_META[d]
          const selected = value === d
          return (
            <button
              key={d}
              type="button"
              role="radio"
              aria-checked={selected}
              className={`depth-card${selected ? ' is-selected' : ''}`}
              onClick={() => onSelect(d)}
            >
              <span className="depth-card__num mono micro">
                {String(DEPTHS.indexOf(d) + 1).padStart(2, '0')}
              </span>
              <h3 className="serif depth-card__label">{meta.label}</h3>
              <p className="depth-card__est mono micro">{meta.est}</p>
              <p className="depth-card__blurb">{meta.blurb}</p>
            </button>
          )
        })}
      </div>

      <div className="depth-foot">
        <button
          type="button"
          className="btn btn-primary"
          disabled={!value}
          onClick={() => value && onContinue(value)}
        >
          Start the audit
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
        <p className="depth-foot__note mono micro">
          You can&rsquo;t go back to change depth once the audit starts.
        </p>
      </div>
    </div>
  )
}

export default AuditDepthPicker
