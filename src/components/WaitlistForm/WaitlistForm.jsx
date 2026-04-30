import { useState } from 'react'
import { submitWaitlist } from '../../services/forms'

/**
 * WaitlistForm — email-only signup for the 8-Point Audit waitlist.
 *
 * One reusable component with three visual placements (hero, audit
 * section, final CTA). All three submit to the same `submitWaitlist`
 * Cloud Function callable; the `source` prop tags which one fired so we
 * can tell where conversions are coming from.
 *
 * Variants:
 *  - 'inline'   pill-shaped row, dark-on-light or light-on-dark via theme
 *  - 'stacked'  larger vertical layout for the final CTA section
 *
 * TODO: when the email service provider (ConvertKit / GoHighLevel /
 * Mailchimp) is selected, the Cloud Function will forward the email there.
 * No client change is required — the wiring lives in functions/index.js.
 */
const WaitlistForm = ({
  source = 'unknown',
  variant = 'inline',
  theme = 'dark', // 'dark' = dark backgrounds (CTA/final), 'light' = light bg
  ctaLabel = 'Join the waitlist',
  ctaSentLabel = 'You\u2019re on the list \u2713',
  successMessage = 'You\u2019ll be the first to hear when the audit opens.',
  placeholder = 'you@yourbusiness.com',
}) => {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  // Cheap client-side validation: same regex the server uses, only here so
  // we can show inline errors before the round trip.
  const isValidEmail = (s) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(s.trim())

  const friendlyError = (err) => {
    const code = err?.code || ''
    if (code === 'functions/resource-exhausted') {
      return 'You\u2019ve hit the submission limit. Please try again in an hour.'
    }
    if (code === 'functions/invalid-argument') {
      return 'That email doesn\u2019t look right. Mind double-checking?'
    }
    if (code === 'functions/unauthenticated') {
      return 'We couldn\u2019t verify your session. Refresh the page and try again.'
    }
    // Honeypot tripped — pretend it worked so bots don't learn the signal.
    if (code === 'functions/failed-precondition') return null
    return 'Something went wrong \u2014 please try again.'
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (submitting || submitted) return
    setError(null)
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setSubmitting(true)
    try {
      await submitWaitlist({ email: email.trim(), source, website })
      setSubmitted(true)
      setEmail('')
      setWebsite('')
    } catch (err) {
      console.error('Failed to save waitlist signup:', err)
      const msg = friendlyError(err)
      if (msg === null) {
        // honeypot path — fake success to the bot
        setSubmitted(true)
      } else {
        setError(msg)
      }
    } finally {
      setSubmitting(false)
    }
  }

  const rootClass = [
    'waitlist-form',
    `waitlist-form--${variant}`,
    `waitlist-form--theme-${theme}`,
    submitted ? 'is-sent' : '',
    error ? 'has-error' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <form
      className={rootClass}
      onSubmit={onSubmit}
      aria-label="Join the 8-Point Business Audit waitlist"
      noValidate
    >
      {/* Honeypot: hidden from humans; bots tend to fill any input. */}
      <label className="waitlist-form__honey" aria-hidden="true">
        <span>Website</span>
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </label>

      <div className="waitlist-form__row">
        <label className="waitlist-form__field">
          <span className="visually-hidden">Email address</span>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={placeholder}
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (error) setError(null)
            }}
            disabled={submitting || submitted}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${source}-waitlist-error` : undefined}
          />
        </label>
        <button
          type="submit"
          disabled={submitting || submitted}
          className="waitlist-form__submit"
        >
          {submitted
            ? ctaSentLabel
            : submitting
            ? 'Sending\u2026'
            : ctaLabel}
        </button>
      </div>

      {error && (
        <p
          id={`${source}-waitlist-error`}
          role="alert"
          className="waitlist-form__error mono micro"
        >
          {error}
        </p>
      )}

      {submitted && (
        <p className="waitlist-form__success mono micro" role="status">
          {successMessage}
        </p>
      )}
    </form>
  )
}

export default WaitlistForm
