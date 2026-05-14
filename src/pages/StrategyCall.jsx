import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import baseStylesCss from './Landing.styles.css?raw'
import pageStylesCss from './StrategyCall.styles.css?raw'

/**
 * /strategy-call — dedicated booking page.
 *
 * Single job: get a qualified visitor onto the calendar. Hero frames
 * the call, a small "what to expect" beat sets the tone, then the
 * embedded GHL calendar widget. Below the widget: one short
 * reassurance line about what happens after booking. Minimal nav so
 * the page stays focused on conversion.
 *
 * Visual system is shared with / and /free-audit: we inject
 * Landing.styles.css for tokens, typography, nav, footer, and .btn
 * utilities, then layer page-specific styles via StrategyCall.styles.css.
 * Both stylesheets leave with the route since they're injected as
 * scoped <style> tags.
 */

const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap'

const StrategyCall = () => {
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
  // Same pattern as /free-audit — covers browsers and JS-running crawlers
  // (Googlebot). Social-media preview crawlers still see index.html
  // defaults until this route is pre-rendered at build time.
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

    const TITLE =
      'Book a Strategy Call — Free 20-minute consultation | Jomendez Inc'
    const DESCRIPTION =
      'Pick a time that works. A free 20-minute conversation about your business, where leads come from (or could come from), and what to fix first. No pitch, no pressure.'
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
  }, [])

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

      {/* NAV — minimal: brand + back to home. */}
      <nav className="nav scrolled" aria-label="Primary">
        <div className="nav-inner">
          <Link to="/" className="nav-logo" aria-label="Jomendez Inc home">
            <span className="dot" aria-hidden="true"></span>
            <span className="mono micro">JOMENDEZ / INC</span>
          </Link>
          <div className="nav-links">
            <Link to="/" className="sc-nav-back">&larr; Home</Link>
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
              <span className="eyebrow micro">STRATEGY CALL</span>
              <h1 className="sc-hero-headline">
                Let&apos;s map your fastest path to <em>capturing more leads.</em>
              </h1>
              <p className="sc-hero-sub">
                A free 20-minute conversation about your business. No pitch, no pressure &mdash; just a clear read on where the biggest wins are and what to put in place first.
              </p>

              <ul className="sc-hero-bullets" aria-label="What we'll cover">
                <li>
                  <span className="mono micro">01</span>
                  <span>Where leads come from today &mdash; or could come from</span>
                </li>
                <li>
                  <span className="mono micro">02</span>
                  <span>Where they&apos;re slipping away between inquiry and customer</span>
                </li>
                <li>
                  <span className="mono micro">03</span>
                  <span>What to build first to start converting more of what you already have</span>
                </li>
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
              <span className="eyebrow micro">PICK A TIME</span>
              <h2>
                Find a slot that <em>works for you.</em>
              </h2>
              <p>20 minutes, by Zoom or phone. You&apos;ll get a confirmation with the call details right after booking.</p>
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
              <span className="eyebrow micro">WHAT HAPPENS NEXT</span>
              <h2>
                A short, useful call &mdash; <em>nothing else.</em>
              </h2>
              <p>
                You pick a time. I show up prepared. We talk through your business and what could move the needle fastest. If working together makes sense, we&apos;ll talk about that. If it doesn&apos;t, you still walk away with a clearer picture of where to focus.
              </p>

              <div className="sc-after-cta">
                <Link to="/free-audit" className="btn btn-ghost" data-cta="free-audit-from-strategy">
                  Want a free instant audit first? &rarr;
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

export default StrategyCall
