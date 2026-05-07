/**
 * Resend wrapper + transactional email templates for the audit flow.
 *
 * Two env vars are required at runtime:
 *   - RESEND_API_KEY   (from https://resend.com/api-keys)
 *   - RESEND_FROM      e.g. "Jose @ Jomendez Inc <audits@jomendez.io>"
 *
 * The Resend SDK is dynamically imported so the rest of the functions
 * codebase keeps working when RESEND_API_KEY isn't set (e.g. local
 * emulator without secrets) — emails just turn into no-ops with a
 * console warning.
 *
 * Templates are intentionally plain HTML with inline styles. Heavy
 * graphics hurt deliverability for transactional mail; a clean
 * black-on-warm-bg layout is fine and matches the brand.
 */

import { logger } from 'firebase-functions/v2'

const SITE_ORIGIN = 'https://jomendez.io'

// Where user replies should land. The `from` address (RESEND_FROM secret)
// usually lives on the transactional subdomain (e.g. updates.jomendez.io)
// because that's what's verified in Resend; this Reply-To redirects any
// reply to the inbox you actually read.
const REPLY_TO_EMAIL = 'support@jomendez.io'

let cachedClient = null
const getClient = async () => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return null
  if (cachedClient) return cachedClient
  // Dynamic import so the cold-start cost of `resend` is only paid by
  // the first email-sending invocation in a given container.
  const { Resend } = await import('resend')
  cachedClient = new Resend(apiKey)
  return cachedClient
}

const escapeHtml = (s) =>
  String(s ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll('\'', '&#39;')

/**
 * Wrap a body of HTML in the brand frame. We keep it minimal: warm bg,
 * generous padding, single CTA button, and a small footer with the
 * domain. Looks at home in Apple Mail, Gmail, Outlook, and on mobile.
 */
const wrap = ({ title, intro, ctaLabel, ctaHref, signoff = '\u2014 Jose' }) => {
  const safeTitle = escapeHtml(title)
  const safeIntro = escapeHtml(intro)
  const safeCta = escapeHtml(ctaLabel)
  const safeSign = escapeHtml(signoff)
  return `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#F6F4EF;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Inter,sans-serif;color:#0B0D10;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F6F4EF;">
    <tr><td align="center" style="padding:40px 16px;">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background:#FFFFFF;border:1px solid rgba(11,13,16,0.08);border-radius:16px;">
        <tr><td style="padding:36px 36px 8px;">
          <div style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#5A5D66;">JOMENDEZ&nbsp;&nbsp;/&nbsp;&nbsp;INC</div>
        </td></tr>
        <tr><td style="padding:16px 36px 0;">
          <h1 style="margin:0;font-size:26px;line-height:1.2;font-weight:600;letter-spacing:-0.5px;color:#0B0D10;">${safeTitle}</h1>
        </td></tr>
        <tr><td style="padding:20px 36px 8px;">
          <p style="margin:0;font-size:16px;line-height:1.6;color:#1A1D22;">${safeIntro}</p>
        </td></tr>
        <tr><td style="padding:24px 36px 32px;">
          <a href="${ctaHref}" style="display:inline-block;background:#0B0D10;color:#F6F4EF;text-decoration:none;padding:14px 22px;border-radius:999px;font-size:14px;font-weight:500;">${safeCta}&nbsp;&rarr;</a>
        </td></tr>
        <tr><td style="padding:0 36px 32px;">
          <p style="margin:0;font-size:15px;line-height:1.6;color:#1A1D22;">${safeSign}</p>
        </td></tr>
        <tr><td style="padding:20px 36px;border-top:1px solid rgba(11,13,16,0.08);">
          <p style="margin:0;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#8A8D94;">JOMENDEZ.IO</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

const send = async ({ to, subject, html, replyTo }) => {
  const client = await getClient()
  if (!client) {
    logger.warn('RESEND_API_KEY not set; skipping email send', { to, subject })
    return { skipped: true }
  }
  const from = process.env.RESEND_FROM
  if (!from) {
    logger.warn('RESEND_FROM not set; skipping email send', { to, subject })
    return { skipped: true }
  }
  // Always set a Reply-To so user replies land somewhere a human reads
  // (the transactional `from` is rarely monitored). Callers can override
  // with their own replyTo for special cases (e.g. the message composer
  // explicitly passes the admin email for thread continuity).
  const result = await client.emails.send({
    from,
    to,
    subject,
    html,
    replyTo: replyTo || REPLY_TO_EMAIL,
  })
  if (result?.error) {
    logger.error('Resend send failed', { to, subject, error: result.error })
    throw new Error(result.error.message || 'email send failed')
  }
  return { id: result?.data?.id || null }
}

// ---------- public templates ----------

/** Email sent when an admin issues an audit invite to a waitlist signup. */
export const sendAuditInviteEmail = async ({ to, inviteToken }) => {
  const link = `${SITE_ORIGIN}/audit/${inviteToken}`
  return send({
    to,
    subject: 'Your 8-Point Business Audit invitation',
    html: wrap({
      title: 'You\u2019re in. Time to take the audit.',
      intro:
        'Click below to take the 8-Point Business Audit. Pick the depth that fits your time \u2014 anywhere from 3 to 15 minutes \u2014 and answer one question at a time. I\u2019ll review your answers personally and email you back with your full report within a few business days.',
      ctaLabel: 'Take the audit',
      ctaHref: link,
      signoff: '\u2014 Jose',
    }),
  })
}

/** Email sent when an audit is finalized and ready for the user to view. */
export const sendAuditReadyEmail = async ({ to, submissionId, resultsToken }) => {
  const link = `${SITE_ORIGIN}/audit/results/${submissionId}?t=${resultsToken}`
  return send({
    to,
    subject: 'Your 8-Point Business Audit is ready',
    html: wrap({
      title: 'Your audit report is ready.',
      intro:
        'I\u2019ve finished reviewing your answers. Click below to see your personalized report \u2014 your scores across the 8 dimensions, the radar chart, my recommendations, and the full PDF. The link is private to you; bookmark it to come back anytime.',
      ctaLabel: 'View your audit',
      ctaHref: link,
      signoff: '\u2014 Jose',
    }),
  })
}

/** Free-form admin-to-user message composed from the dashboard. */
export const sendAuditMessageEmail = async ({ to, subject, body, replyTo }) => {
  // Body is plain text from the admin form; render preserving paragraphs.
  const safeBody = escapeHtml(body).replaceAll('\n\n', '</p><p style="margin:16px 0 0;font-size:16px;line-height:1.6;color:#1A1D22;">').replaceAll('\n', '<br/>')
  return send({
    to,
    subject,
    replyTo,
    html: wrap({
      title: 'A note about your audit',
      intro: '',
      ctaLabel: 'View your audit',
      ctaHref: SITE_ORIGIN,
    }).replace(
      '<p style="margin:0;font-size:16px;line-height:1.6;color:#1A1D22;"></p>',
      `<p style="margin:0;font-size:16px;line-height:1.6;color:#1A1D22;">${safeBody}</p>`
    ),
  })
}
