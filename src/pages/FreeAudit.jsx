import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import baseStylesCss from './Landing.styles.css?raw'
import pageStylesCss from './FreeAudit.styles.css?raw'
import { useContent } from '../i18n/LanguageContext'
import LanguageToggle from '../i18n/LanguageToggle'
import freeAuditContent from '../i18n/content/freeAudit'

/**
 * /free-audit — dedicated landing page for paid traffic.
 *
 * Frames the offer (free instant audit), explains what's in the report,
 * sells the relevance, then hosts the embedded GHL Prospecting Widget.
 * Below the widget: brief credibility + what happens next.
 *
 * Bilingual: all copy comes from src/i18n/content/freeAudit.jsx via
 * useContent(). Visual system is shared with /: Landing.styles.css is
 * injected for tokens/nav/footer/.btn, then FreeAudit.styles.css layers
 * this page's section styles. Both leave with the route.
 */

const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap'

const FreeAudit = () => {
  const t = useContent(freeAuditContent)

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
  // Follows the active language; re-runs when it changes. Note: this
  // updates what browsers and JS-running crawlers see (Googlebot runs
  // JS). Social-media preview crawlers read the raw HTML before any JS
  // runs, so they still pick up the index.html defaults until /free-audit
  // is pre-rendered to a static HTML file at build time.
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
    const URL = 'https://jomendez.io/free-audit'
    const IMAGE_ALT = 'Free instant business audit — Jomendez Inc'

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
  // by default, and ad traffic landing here mid-scroll would be jarring.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // GHL Prospecting Widget — load the embed script imperatively so React
  // doesn't try to reconcile against the widget's injected DOM. The
  // script is mounted into a stable empty host div; cleanup clears that
  // host so navigating away and back doesn't stack duplicates.
  useEffect(() => {
    const host = document.getElementById('ghl-prospecting-widget')
    if (!host) return

    const script = document.createElement('script')
    script.src =
      'https://services.leadconnectorhq.com/prospecting/client/widget-embed.js'
    script.setAttribute('data-widget-id', '6a04ecaa806dc2a0333db1b6')
    script.async = true
    host.appendChild(script)

    return () => {
      while (host.firstChild) host.removeChild(host.firstChild)
    }
  }, [])

  return (
    <>
      <style>{baseStylesCss}</style>
      <style>{pageStylesCss}</style>

      {/* NAV — minimal: brand + back to home. Ad-page focus. */}
      <nav className="nav scrolled" aria-label={t.a11y.primaryNav}>
        <div className="nav-inner">
          <Link to="/" className="nav-logo" aria-label={t.a11y.homeLink}>
            <img src="/landing/jm-logo.webp" alt="" className="brand-mark" width="36" height="36" decoding="async" />
            <span className="mono micro">JOMENDEZ / INC</span>
          </Link>
          <div className="nav-links">
            <Link to="/" className="fa-nav-back">{t.nav.back}</Link>
            <LanguageToggle />
          </div>
        </div>
      </nav>

      <main id="top">
        {/* ============================================================
            HERO
            ============================================================ */}
        <section className="fa-hero blueprint grain">
          <div className="wrap">
            <div className="fa-hero-inner">
              <span className="eyebrow micro">{t.hero.eyebrow}</span>
              <h1 className="fa-hero-headline">{t.hero.headline}</h1>
              <p className="fa-hero-sub">{t.hero.sub}</p>
              <div className="fa-hero-cta">
                <a href="#audit-widget" className="btn btn-primary" data-cta="scroll-to-widget">
                  {t.hero.ctaScroll}
                </a>
                <span className="fa-hero-fineprint">{t.hero.fineprint}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            WHAT'S INCLUDED
            ============================================================ */}
        <section className="fa-includes">
          <div className="wrap">
            <div className="fa-includes-head">
              <span className="eyebrow micro">{t.includes.eyebrow}</span>
              <h2>{t.includes.heading}</h2>
              <p className="fa-includes-lead">{t.includes.lead}</p>
            </div>

            <ol className="fa-includes-grid">
              {t.includes.items.map((item, i) => (
                <li className="fa-include" key={i}>
                  <span className="meta">{item.meta}</span>
                  <h3>{item.q}</h3>
                  <p>{item.a}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============================================================
            WHY IT MATTERS
            ============================================================ */}
        <section className="fa-why blueprint">
          <div className="wrap">
            <div className="fa-why-inner">
              <span className="eyebrow micro">{t.why.eyebrow}</span>
              <h2>{t.why.heading}</h2>
              {t.why.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            WIDGET — GHL Prospecting Widget embed slot
            ============================================================ */}
        <section className="fa-widget" id="audit-widget">
          <div className="wrap">
            <div className="fa-widget-head">
              <span className="eyebrow micro">{t.widget.eyebrow}</span>
              <h2>{t.widget.heading}</h2>
              <p>{t.widget.sub}</p>
            </div>

            {/* GHL Prospecting Widget mounts into the inner div via the
                useEffect above. The outer .fa-widget-host frames it; the
                inner div is intentionally empty and React-untouched. */}
            <div className="fa-widget-host">
              <div id="ghl-prospecting-widget" className="fa-widget-mount" />
            </div>
          </div>
        </section>

        {/* ============================================================
            WHAT HAPPENS NEXT
            ============================================================ */}
        <section className="fa-next">
          <div className="wrap">
            <div className="fa-next-head">
              <span className="eyebrow micro">{t.next.eyebrow}</span>
              <h2>{t.next.heading}</h2>
            </div>

            <div className="fa-next-grid">
              {t.next.cards.map((card, i) => (
                <article className="fa-next-card" key={i}>
                  <span className="meta">{card.meta}</span>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              ))}
            </div>

            <div className="fa-next-cta">
              <Link to="/" className="btn btn-ghost" data-cta="back-to-home">
                {t.next.backToHome}
              </Link>
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

export default FreeAudit
