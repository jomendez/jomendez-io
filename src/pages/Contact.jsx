import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import baseStylesCss from './Landing.styles.css?raw'
import pageStylesCss from './Contact.styles.css?raw'

// Plans the pricing CTAs can send us via ?selected_plan=. Anything
// outside this set is ignored, so a stray/garbage param can't render
// a misleading banner or get prefilled into the GHL form.
const ALLOWED_PLANS = {
  starter: 'Starter',
  growth: 'Growth',
  pro: 'Pro',
}

// GHL form base URL — kept as a constant so the planned-aware src
// builder below stays readable.
const GHL_FORM_BASE =
  'https://brand.jomendez.io/widget/form/rbLM1qamIBtu5HfAiUuZ'

/**
 * /contact — dedicated contact page.
 *
 * Single job: capture interest from the pricing CTAs. Hero frames
 * the page, a host div waits for the GHL contact form embed, and a
 * "prefer to talk first?" block keeps the strategy-call path open
 * for visitors who want a conversation before filling out a form.
 *
 * Visual system is shared with / and the other sub-pages: we inject
 * Landing.styles.css for tokens, typography, nav, footer, and .btn
 * utilities, then layer page-specific styles via Contact.styles.css.
 * Both stylesheets leave with the route since they're injected as
 * scoped <style> tags.
 */

const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap'

const Contact = () => {
  // Read ?selected_plan= from the URL. The pricing CTAs on /
  // navigate here with this param so the visitor sees which plan
  // they chose and the GHL form prefills its hidden "selected_plan"
  // field.
  //
  // We normalize the incoming value (trim + lowercase) before the
  // allow-list lookup so a hand-edited URL like ?selected_plan=Growth
  // or ?selected_plan=%20growth still resolves — and, crucially, the
  // value we forward to the GHL iframe is always the canonical
  // lowercase form. That keeps GHL contact records consistent and
  // easier to segment.
  const [searchParams] = useSearchParams()
  const rawPlan = searchParams.get('selected_plan')
  const normalizedPlan = rawPlan ? rawPlan.trim().toLowerCase() : null
  const planKey =
    normalizedPlan && ALLOWED_PLANS[normalizedPlan] ? normalizedPlan : null
  const planLabel = planKey ? ALLOWED_PLANS[planKey] : null

  // Iframe src includes the plan param when present. GHL's form
  // builder picks it up via the field's "URL Parameter" mapping
  // (configured on the GHL side to read `selected_plan`).
  const iframeSrc = planKey
    ? `${GHL_FORM_BASE}?selected_plan=${encodeURIComponent(planKey)}`
    : GHL_FORM_BASE

  // Inject Google Fonts only while this page is mounted
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = FONTS_HREF
    document.head.appendChild(link)
    return () => {
      link.parentNode && link.parentNode.removeChild(link)
    }
  }, [])

  // Per-route metadata. Same pattern used on /free-audit and /strategy-call.
  useEffect(() => {
    const getMeta = (selector) =>
      document.querySelector(selector)?.getAttribute('content') ?? null
    const setMeta = (selector, value) => {
      const el = document.querySelector(selector)
      if (el && value != null) el.setAttribute('content', value)
    }
    const getHref = (selector) =>
      document.querySelector(selector)?.getAttribute('href') ?? null
    const setHref = (selector, value) => {
      const el = document.querySelector(selector)
      if (el && value != null) el.setAttribute('href', value)
    }

    const TITLE = 'Contact — Tell us about your business | Jomendez Inc'
    const DESCRIPTION =
      'Get in touch with Jomendez Inc. Tell us about your business and we’ll be in touch within one business day, or book a free strategy call.'
    const URL = 'https://jomendez.io/contact'
    const IMAGE_ALT = 'Contact Jomendez Inc'

    const prev = {
      title: document.title,
      description: getMeta('meta[name="description"]'),
      ogTitle: getMeta('meta[property="og:title"]'),
      ogDescription: getMeta('meta[property="og:description"]'),
      ogUrl: getMeta('meta[property="og:url"]'),
      ogImageAlt: getMeta('meta[property="og:image:alt"]'),
      twTitle: getMeta('meta[name="twitter:title"]'),
      twDescription: getMeta('meta[name="twitter:description"]'),
      twImageAlt: getMeta('meta[name="twitter:image:alt"]'),
      canonical: getHref('link[rel="canonical"]'),
    }

    document.title = TITLE
    setMeta('meta[name="description"]', DESCRIPTION)
    setMeta('meta[property="og:title"]', TITLE)
    setMeta('meta[property="og:description"]', DESCRIPTION)
    setMeta('meta[property="og:url"]', URL)
    setMeta('meta[property="og:image:alt"]', IMAGE_ALT)
    setMeta('meta[name="twitter:title"]', TITLE)
    setMeta('meta[name="twitter:description"]', DESCRIPTION)
    setMeta('meta[name="twitter:image:alt"]', IMAGE_ALT)
    setHref('link[rel="canonical"]', URL)

    return () => {
      document.title = prev.title
      setMeta('meta[name="description"]', prev.description)
      setMeta('meta[property="og:title"]', prev.ogTitle)
      setMeta('meta[property="og:description"]', prev.ogDescription)
      setMeta('meta[property="og:url"]', prev.ogUrl)
      setMeta('meta[property="og:image:alt"]', prev.ogImageAlt)
      setMeta('meta[name="twitter:title"]', prev.twTitle)
      setMeta('meta[name="twitter:description"]', prev.twDescription)
      setMeta('meta[name="twitter:image:alt"]', prev.twImageAlt)
      setHref('link[rel="canonical"]', prev.canonical)
    }
  }, [])

  // Scroll to top on mount — ad traffic / cross-page nav shouldn't
  // land mid-scroll.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // GHL contact form — the iframe is rendered declaratively in JSX so
  // React owns its lifecycle; this effect just loads the embed helper
  // script that wires up postMessage-based auto-resize for the iframe.
  // Mirrors the pattern used on /strategy-call for the calendar widget.
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://brand.jomendez.io/js/form_embed.js'
    script.type = 'text/javascript'
    script.async = true
    document.body.appendChild(script)
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script)
    }
  }, [])

  return (
    <>
      <style>{baseStylesCss}</style>
      <style>{pageStylesCss}</style>

      {/* NAV — minimal: brand + back to home */}
      <nav className="nav scrolled" aria-label="Primary">
        <div className="nav-inner">
          <Link to="/" className="nav-logo" aria-label="Jomendez Inc home">
            <span className="dot" aria-hidden="true"></span>
            <span className="mono micro">JOMENDEZ / INC</span>
          </Link>
          <div className="nav-links">
            <Link to="/" className="ct-nav-back">&larr; Home</Link>
          </div>
        </div>
      </nav>

      <main id="top">
        {/* ============================================================
            HERO
            ============================================================ */}
        <section className="ct-hero blueprint grain">
          <div className="wrap">
            <div className="ct-hero-inner">
              <span className="eyebrow micro">CONTACT</span>
              <h1 className="ct-hero-headline">
                Let&apos;s start the <em>conversation.</em>
              </h1>
              <p className="ct-hero-sub">
                Tell us a bit about your business and we&apos;ll get back to you within one business day. Prefer to talk first? Book a free strategy call instead.
              </p>
              <div className="ct-hero-cta">
                <a href="#contact-form" className="btn btn-primary">
                  Send a message
                </a>
                <Link
                  to="/strategy-call"
                  className="btn btn-outline"
                  data-cta="strategy-call"
                  data-source="contact-hero"
                >
                  Book a Strategy Call
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            FORM — GHL contact form embed slot
            ============================================================ */}
        <section className="ct-form" id="contact-form">
          <div className="wrap">
            <div className="ct-form-head">
              <span className="eyebrow micro">SEND A MESSAGE</span>
              <h2>
                Get in <em>touch.</em>
              </h2>
              <p>Fill out the form and we&apos;ll be in touch within one business day.</p>
            </div>

            {/* Selected-plan banner — only renders when the visitor
                arrived from one of the pricing CTAs. Mirrors the value
                that the GHL form's hidden field receives, so the
                visitor sees what's being submitted on their behalf. */}
            {planLabel && (
              <div className="ct-plan-banner" role="status" aria-live="polite">
                You selected the <strong>{planLabel}</strong> plan.
              </div>
            )}

            {/* GHL contact form. The iframe height starts at the GHL-
                provided data-height value; form_embed.js then sends
                postMessage events to adjust the iframe height as the
                form's content grows or shrinks. */}
            <div className="ct-form-host">
              <iframe
                src={iframeSrc}
                style={{ width: '100%', height: '878px', border: 'none', borderRadius: '3px' }}
                id="inline-rbLM1qamIBtu5HfAiUuZ"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="jomendez lead form"
                data-height="878"
                data-layout-iframe-id="inline-rbLM1qamIBtu5HfAiUuZ"
                data-form-id="rbLM1qamIBtu5HfAiUuZ"
                title="jomendez lead form"
              />
            </div>
          </div>
        </section>

        {/* ============================================================
            PREFER TO TALK / EMAIL DIRECTLY
            ============================================================ */}
        <section className="ct-alt">
          <div className="wrap">
            <div className="ct-alt-head">
              <span className="eyebrow micro">OTHER WAYS TO REACH US</span>
              <h2>
                Or skip the form <em>entirely.</em>
              </h2>
            </div>

            <div className="ct-alt-grid">
              <article className="ct-alt-card">
                <span className="meta">PREFER TO TALK</span>
                <h3>Book a 20-minute strategy call</h3>
                <p>A free conversation about your business &mdash; where you are, where you want to go, and whether we&apos;re a fit. No pitch, no obligation.</p>
                <Link
                  to="/strategy-call"
                  className="btn btn-outline"
                  data-cta="strategy-call"
                  data-source="contact-alt"
                >
                  Book a Strategy Call
                </Link>
              </article>
              <article className="ct-alt-card">
                <span className="meta">EMAIL DIRECTLY</span>
                <h3>Send us an email</h3>
                <p>Prefer to write? Drop us a note and we&apos;ll get back to you within one business day.</p>
                <a href="mailto:support@jomendez.io" className="btn btn-ghost">
                  support@jomendez.io
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* ============================================================
            FOOTER — mirrors Landing footer for visual consistency
            ============================================================ */}
        <footer className="footer">
          <div className="wrap">
            <div className="footer-inner">
              <div className="footer-brand">
                <span className="dot" aria-hidden="true"></span>
                <span className="mono micro">JOMENDEZ / INC</span>
              </div>
              <div className="footer-links">
                <a
                  href="https://www.linkedin.com/in/jomendez/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/jomendez"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a href="mailto:support@jomendez.io">support@jomendez.io</a>
              </div>
            </div>
            <div className="footer-bottom mono micro">
              <span>&copy; {new Date().getFullYear()} JOMENDEZ INC</span>
              <span>BUILT IN MIAMI</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}

export default Contact
