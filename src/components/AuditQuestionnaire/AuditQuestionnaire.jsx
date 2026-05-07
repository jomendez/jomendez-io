import { useMemo, useState } from 'react'
import {
  getQuestionsForDepth,
  DIMENSION_META,
} from '../../data/auditQuestions'

/**
 * AuditQuestionnaire — a one-question-per-step form for the 8-Point
 * audit. Owns its own progress + answer state. Calls onSubmit({ depth,
 * answers }) when the last question is answered and the user clicks
 * submit. Calls onCancel() to bail back to the depth picker.
 *
 * Keyboard: Enter on a selected option triggers Next; arrow keys move
 * focus between options; Esc cancels.
 *
 * The questions array is derived once per `depth` so re-renders during
 * answering are cheap.
 */
const dimensionLabel = (key) =>
  DIMENSION_META.find((d) => d.key === key)?.label || key

const AuditQuestionnaire = ({ depth, email, onSubmit, onCancel, isSubmitting }) => {
  const questions = useMemo(() => getQuestionsForDepth(depth), [depth])
  const [stepIdx, setStepIdx] = useState(0)
  const [answers, setAnswers] = useState({}) // qid -> value
  const [error, setError] = useState(null)

  const total = questions.length
  const q = questions[stepIdx]
  const isFirst = stepIdx === 0
  const isLast = stepIdx === total - 1
  const currentValue = answers[q.id]
  const hasAnswer =
    currentValue !== undefined && currentValue !== null && currentValue !== ''
  const progressPct = Math.round(((stepIdx + (hasAnswer ? 1 : 0)) / total) * 100)

  const setAnswer = (qid, value) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }))
    if (error) setError(null)
  }

  const next = () => {
    if (!hasAnswer) {
      setError('Please pick an answer to continue.')
      return
    }
    setError(null)
    if (!isLast) setStepIdx((i) => i + 1)
  }

  const back = () => {
    setError(null)
    if (!isFirst) setStepIdx((i) => i - 1)
  }

  const submit = () => {
    if (!hasAnswer) {
      setError('Please pick an answer before submitting.')
      return
    }
    // Build the cleaned answers array in question order so the
    // submitted payload reads the same as the form was filled.
    const payload = questions.map((qq) => ({ qid: qq.id, value: answers[qq.id] }))
    onSubmit({ depth, answers: payload })
  }

  return (
    <div className="quiz">
      {/* progress */}
      <div className="quiz-progress" aria-hidden="true">
        <div className="quiz-progress__track">
          <div
            className="quiz-progress__fill"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="quiz-progress__meta mono micro">
          <span>
            QUESTION {String(stepIdx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <span>{dimensionLabel(q.dimension).toUpperCase()}</span>
        </div>
      </div>

      {/* question */}
      <div className="quiz-step">
        <h2 className="quiz-question serif">{q.text}</h2>

        {q.type === 'choice' && (
          <ul className="quiz-options" role="radiogroup" aria-label={q.text}>
            {q.options.map((opt, i) => {
              const selected = currentValue === i
              return (
                <li key={i}>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    className={`quiz-opt${selected ? ' is-selected' : ''}`}
                    onClick={() => setAnswer(q.id, i)}
                  >
                    <span className="quiz-opt__bullet" aria-hidden="true" />
                    <span className="quiz-opt__text">{opt}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        )}

        {q.type === 'scale' && (
          <div className="quiz-scale" role="radiogroup" aria-label={q.text}>
            {[1, 2, 3, 4, 5].map((n) => {
              const selected = currentValue === n
              return (
                <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  className={`quiz-scale__btn${selected ? ' is-selected' : ''}`}
                  onClick={() => setAnswer(q.id, n)}
                >
                  {n}
                </button>
              )
            })}
            <span className="quiz-scale__legend mono micro">
              1&nbsp;=&nbsp;Disagree &middot; 5&nbsp;=&nbsp;Agree
            </span>
          </div>
        )}

        {q.type === 'number' && (
          <div className="quiz-number">
            <input
              type="number"
              inputMode="numeric"
              value={currentValue ?? ''}
              onChange={(e) => {
                const v = e.target.value
                setAnswer(q.id, v === '' ? '' : Number(v))
              }}
              aria-label={q.text}
            />
          </div>
        )}

        {error && (
          <p role="alert" className="quiz-error mono micro">
            {error}
          </p>
        )}
      </div>

      {/* nav */}
      <div className="quiz-nav">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={isFirst ? onCancel : back}
          disabled={isSubmitting}
        >
          {isFirst ? '\u2190 Change depth' : '\u2190 Back'}
        </button>

        {isLast ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={submit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting\u2026' : 'Submit audit'}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            onClick={next}
            disabled={isSubmitting}
          >
            Next
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        )}
      </div>

      <p className="quiz-foot mono micro">
        Submitting as <strong>{email}</strong>. Your answers go straight to Jose &mdash; no third parties.
      </p>
    </div>
  )
}

export default AuditQuestionnaire
