import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import baseStylesCss from './Landing.styles.css?raw'
import pageStylesCss from './StrategyCall.styles.css?raw'
import { useContent, useLanguage } from '../i18n/LanguageContext'
import LanguageToggle from '../i18n/LanguageToggle'
import strategyCallContent from '../i18n/content/strategyCall'

/**
 * /strategy-call — dedicated intake page.
 *
 * Single job: get a qualified visitor to fill out the intake survey,
 * which is the first step toward booking a call. The lead section is a
 * two-column layout: compact supporting copy on the left, the GHL survey
 * form card on the right. At mobile width the form sandwiches between a
 * compact headline (above) and the bullets (below), so the form sits
 * above the fold at every viewport.
 *
 * Bilingual: all copy comes from src/i18n/content/strategyCall.jsx via
 * useContent(). Visual system is shared with / and /free-audit.
 */

const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap'

// GHL survey widgets — one per language. The iframe id must match
// the widget UUID exactly so form_embed.js's postMessage handler can
// target it for inline height updates. We swap the whole widget per
// language (not just the iframe src) because the GHL survey itself
// is translated at the widget level. The language toggle reloads the
// page (see src/i18n/LanguageContext.jsx), so picking the widget at
// render time is sufficient — no script re-binding required.
const SURVEY_WIDGET_IDS = {
  en: '12siFqglf2lq494zIAfC',
  es: 'FabHw5IuFnMKn8LPsLWx',
}

const StrategyCall = () => {
  const t = useContent(strategyCallContent)
  const { language } = useLanguage()

  // Pick the right survey for the active language. Fall back to EN if
  // language somehow resolves to anything else.
  const surveyId = SURVEY_WIDGET_IDS[language] || SURVEY_WIDGET_IDS.en
  const surveySrc = `https://brand.jomendez.io/widget/survey/${surveyId}`

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

  // Per-route metadata: title, description, OG/Twitter tags, and canonical.
  // Follows the active language; re-runs when it changes. Same crawler
  // caveat as /free-audit — JS-rendered metadata covers browsers and
  // Googlebot, not social-media preview crawlers.
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
    const URL = 'https://jomendez.io/strategy-call'
    const IMAGE_ALT = 'Book a strategy call with Jose Mendez — Jomendez Inc'

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

  // Scroll to top on mount — react-router preserves scroll position
  // by default, and someone landing from an ad mid-scroll would be jarring.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // GHL form embed helper script — auto-resizes the survey iframe via
  // postMessage. We re-load it whenever `surveyId` changes so the
  // script's fresh execution scans the DOM and binds to the *current*
  // iframe id (form_embed.js targets the iframe by its widget UUID id;
  // a stale-bound copy would miss the swap if React reused the iframe
  // element instead of replacing it).
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://brand.jomendez.io/js/form_embed.js'
    script.type = 'text/javascript'
    script.async = true
    document.body.appendChild(script)

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script)
    }
  }, [surveyId])

  return (
    <>
      <style>{baseStylesCss}</style>
      <style>{pageStylesCss}</style>

      {/* WebPage structured data for this route. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: t.meta.title,
            description: t.meta.description,
            url: 'https://jomendez.io/strategy-call',
            inLanguage: language,
            isPartOf: {
              '@type': 'WebSite',
              name: 'Jomendez Inc',
              url: 'https://jomendez.io',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Jomendez Inc',
              url: 'https://jomendez.io',
            },
          }),
        }}
      />

      {/* NAV — minimal: brand + back to home. */}
      <nav className="nav scrolled" aria-label={t.a11y.primaryNav}>
        <div className="nav-inner">
          <Link to="/" className="nav-logo" aria-label={t.a11y.homeLink}>
            <img src="/landing/jm-logo.webp" alt="Jomendez Inc" className="brand-mark" width="36" height="36" decoding="async" />
            <span className="mono micro">JOMENDEZ / INC</span>
          </Link>
          <div className="nav-links">
            <Link to="/" className="sc-nav-back">{t.nav.back}</Link>
            <LanguageToggle />
          </div>
        </div>
      </nav>

      <main id="top">
        {/* ============================================================
            LEAD — form-dominant hero with sidebar copy.
            Replaces the old hero + calendar pair so the survey form
            sits above the fold at every viewport. id="book" is kept on
            this section so deep links to /strategy-call#book still
            land here.
            ============================================================ */}
        <section className="sc-lead blueprint grain" id="book">
          <div className="wrap">
            <div className="sc-lead-grid">

              {/* Title block (eyebrow + headline). DOM order is
                  intentional: title comes first, then the form, then
                  the supporting copy. This way the DOM/reading order
                  matches the visual order on mobile (title → form →
                  bullets) and screen-reader users hit the form right
                  after the headline — the same beat that converts
                  sighted visitors. At tablet+ the grid-template-areas
                  in CSS places the form in the right column and the
                  copy items stack down the left. */}
              <div className="sc-lead-copy-top">
                <span className="eyebrow micro">{t.hero.eyebrow}</span>
                <h1 className="sc-lead-headline">{t.hero.headline}</h1>
              </div>

              {/* GHL survey form card.
                  form_embed.js (loaded in the useEffect above) listens
                  for postMessage from the iframe by its widget UUID id
                  and writes inline height once the survey renders. The
                  iframe id MUST equal the widget UUID — we swap both
                  src and id per language via SURVEY_WIDGET_IDS so the
                  Spanish visitor lands on the Spanish survey.
                  Uses <section> (not <aside>) because this is the
                  page's primary content, not complementary. Labelled
                  via aria-labelledby pointing at the form-card h2. */}
              <section
                className="sc-lead-form"
                aria-labelledby="sc-form-title"
              >
                <div className="sc-form-head">
                  <span className="eyebrow micro">{t.form.eyebrow}</span>
                  <h2 id="sc-form-title" className="sc-form-heading">
                    {t.form.heading}
                  </h2>
                </div>
                <div className="sc-form-host">
                  {/* key={surveyId} forces React to unmount the old
                      iframe element and mount a fresh one whenever the
                      survey changes (i.e. on language toggle). Without
                      the key, React would diff and reuse the same
                      <iframe> DOM node by just updating its src/id
                      attributes — and browsers do not always navigate
                      the iframe document cleanly on an id swap, so the
                      GHL embed could end up displaying stale survey
                      content. The reload pattern from the language
                      toggle should also handle this, but the key makes
                      the swap bulletproof. */}
                  <iframe
                    key={surveyId}
                    src={surveySrc}
                    id={surveyId}
                    title={t.a11y.formIframeTitle}
                    scrolling="no"
                    style={{ border: 'none', width: '100%' }}
                  />
                </div>
                <p className="sc-form-microcopy">{t.form.microcopy}</p>
                <p className="sc-form-reassure mono micro">{t.form.reassure}</p>
              </section>

              {/* Supporting copy (sub + bullets) below the form on
                  mobile, in the left column at tablet+. */}
              <p className="sc-lead-sub">{t.hero.sub}</p>

              <ul className="sc-lead-bullets" aria-label={t.a11y.bulletsLabel}>
                {t.hero.bullets.map((bullet, i) => (
                  <li key={i}>
                    <span className="mono micro">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

            </div>
          </div>
        </section>

        {/* ============================================================
            AFTER — short reassurance
            ============================================================ */}
        <section className="sc-after">
          <div className="wrap">
            <div className="sc-after-inner">
              <span className="eyebrow micro">{t.after.eyebrow}</span>
              <h2>{t.after.heading}</h2>
              <p>{t.after.body}</p>

              <div className="sc-after-cta">
                <Link to="/free-audit" className="btn btn-ghost" data-cta="free-audit-from-strategy">
                  {t.after.freeAuditCta}
                </Link>
              </div>
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
                <img src="/landing/jm-logo.webp" alt="Jomendez Inc" className="brand-mark" width="36" height="36" decoding="async" />
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

export default StrategyCall
