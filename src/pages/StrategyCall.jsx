import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import baseStylesCss from './Landing.styles.css?raw'
import pageStylesCss from './StrategyCall.styles.css?raw'
import { useContent, useLanguage } from '../i18n/LanguageContext'
import LanguageToggle from '../i18n/LanguageToggle'
import strategyCallContent from '../i18n/content/strategyCall'

/**
 * /strategy-call — dedicated booking page.
 *
 * Single job: get a qualified visitor onto the calendar. Hero frames
 * the call, a small "what to expect" beat sets the tone, then the
 * embedded GHL calendar widget. Below the widget: one short
 * reassurance line about what happens after booking.
 *
 * Bilingual: all copy comes from src/i18n/content/strategyCall.jsx via
 * useContent(). Visual system is shared with / and /free-audit.
 */

const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap'

const StrategyCall = () => {
  const t = useContent(strategyCallContent)
  const { language } = useLanguage()

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

  // GHL calendar embed helper script — handles postMessage from the
  // iframe to auto-resize its height. The iframe itself is rendered
  // declaratively below; this just adds the resize controller. Cleanup
  // removes the script so client-side re-navigation doesn't stack copies.
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://brand.jomendez.io/js/embed.js'
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
            HERO
            ============================================================ */}
        <section className="sc-hero blueprint grain">
          <div className="wrap">
            <div className="sc-hero-inner">
              <span className="eyebrow micro">{t.hero.eyebrow}</span>
              <h1 className="sc-hero-headline">{t.hero.headline}</h1>
              <p className="sc-hero-sub">{t.hero.sub}</p>

              <ul className="sc-hero-bullets" aria-label={t.a11y.bulletsLabel}>
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
            CALENDAR
            ============================================================ */}
        <section className="sc-calendar" id="book">
          <div className="wrap">
            <div className="sc-calendar-head">
              <span className="eyebrow micro">{t.calendar.eyebrow}</span>
              <h2>{t.calendar.heading}</h2>
              <p>{t.calendar.sub}</p>
            </div>

            {/* GHL booking widget — iframe rendered declaratively; the
                embed.js script (loaded in the useEffect above) listens
                for postMessage from the iframe to auto-resize it. */}
            <div className="sc-calendar-host">
              <iframe
                src="https://brand.jomendez.io/widget/booking/hIhkz2DcgP9x0VnjPM84"
                title="Book a strategy call with Jose Mendez"
                style={{ width: '100%', border: 'none', overflow: 'hidden' }}
                scrolling="no"
                id="msgsndr-calendar"
              />
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
