import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import baseStylesCss from './Landing.styles.css?raw'
import pageStylesCss from './Contact.styles.css?raw'
import { useContent } from '../i18n/LanguageContext'
import LanguageToggle from '../i18n/LanguageToggle'
import contactContent from '../i18n/content/contact'

/**
 * /contact — dedicated contact page.
 *
 * Single job: capture interest from the pricing CTAs. Hero frames the
 * page, the embedded GHL contact form collects the inquiry, and a
 * "prefer to talk first?" block keeps the strategy-call path open.
 *
 * Bilingual: all copy comes from src/i18n/content/contact.jsx via
 * useContent(). Visual system is shared with / and the other sub-pages.
 */

const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap'

// Valid plan slugs the pricing CTAs can pass via ?selected_plan=.
// Language-independent — the localized display label comes from the
// content module; the slug itself is what the GHL form receives.
const PLAN_KEYS = ['starter', 'growth', 'pro']

// GHL form base URL — the plan-aware src builder appends ?selected_plan
// when the visitor arrived from a pricing CTA.
const GHL_FORM_BASE =
  'https://brand.jomendez.io/widget/form/rbLM1qamIBtu5HfAiUuZ'

const Contact = () => {
  const t = useContent(contactContent)

  // Read ?selected_plan= from the URL. The pricing CTAs on / navigate
  // here with this param. We normalize it (trim + lowercase) before the
  // allow-list check so a hand-edited URL still resolves, and the value
  // forwarded to the GHL iframe is always the canonical lowercase slug.
  const [searchParams] = useSearchParams()
  const rawPlan = searchParams.get('selected_plan')
  const normalizedPlan = rawPlan ? rawPlan.trim().toLowerCase() : null
  const planKey =
    normalizedPlan && PLAN_KEYS.includes(normalizedPlan) ? normalizedPlan : null
  const planLabel = planKey ? t.form.planLabels[planKey] : null

  // Iframe src includes the plan param when present. GHL's form builder
  // picks it up via the field's "URL Parameter" mapping (selected_plan).
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

  // Per-route metadata. Follows the active language; re-runs when it
  // changes. Same crawler caveat as /free-audit and /strategy-call.
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

    const TITLE = t.meta.title
    const DESCRIPTION = t.meta.description
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
  }, [t])

  // Scroll to top on mount — ad traffic / cross-page nav shouldn't
  // land mid-scroll.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // GHL contact form — the iframe is rendered declaratively in JSX so
  // React owns its lifecycle; this effect just loads the embed helper
  // script that wires up postMessage-based auto-resize for the iframe.
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
      <nav className="nav scrolled" aria-label={t.a11y.primaryNav}>
        <div className="nav-inner">
          <Link to="/" className="nav-logo" aria-label={t.a11y.homeLink}>
            <img src="/landing/jm-logo.webp" alt="" className="brand-mark" width="36" height="36" decoding="async" />
            <span className="mono micro">JOMENDEZ / INC</span>
          </Link>
          <div className="nav-links">
            <Link to="/" className="ct-nav-back">{t.nav.back}</Link>
            <LanguageToggle />
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
              <span className="eyebrow micro">{t.hero.eyebrow}</span>
              <h1 className="ct-hero-headline">{t.hero.headline}</h1>
              <p className="ct-hero-sub">{t.hero.sub}</p>
              <div className="ct-hero-cta">
                <a href="#contact-form" className="btn btn-primary">
                  {t.hero.ctaSend}
                </a>
                <Link
                  to="/strategy-call"
                  className="btn btn-outline"
                  data-cta="strategy-call"
                  data-source="contact-hero"
                >
                  {t.hero.ctaBook}
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
              <span className="eyebrow micro">{t.form.eyebrow}</span>
              <h2>{t.form.heading}</h2>
              <p>{t.form.sub}</p>
            </div>

            {/* Selected-plan banner — only renders when the visitor
                arrived from one of the pricing CTAs. Mirrors the value
                that the GHL form's hidden field receives. */}
            {planLabel && (
              <div className="ct-plan-banner" role="status" aria-live="polite">
                {t.form.planBanner(planLabel)}
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
              <span className="eyebrow micro">{t.alt.eyebrow}</span>
              <h2>{t.alt.heading}</h2>
            </div>

            <div className="ct-alt-grid">
              <article className="ct-alt-card">
                <span className="meta">{t.alt.cards[0].meta}</span>
                <h3>{t.alt.cards[0].title}</h3>
                <p>{t.alt.cards[0].body}</p>
                <Link
                  to="/strategy-call"
                  className="btn btn-outline"
                  data-cta="strategy-call"
                  data-source="contact-alt"
                >
                  {t.alt.bookCta}
                </Link>
              </article>
              <article className="ct-alt-card">
                <span className="meta">{t.alt.cards[1].meta}</span>
                <h3>{t.alt.cards[1].title}</h3>
                <p>{t.alt.cards[1].body}</p>
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
                <img src="/landing/jm-logo.webp" alt="" className="brand-mark" width="36" height="36" decoding="async" />
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
              <span>{t.footer.builtIn}</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}

export default Contact
