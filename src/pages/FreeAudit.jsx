import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import baseStylesCss from './Landing.styles.css?raw'
import pageStylesCss from './FreeAudit.styles.css?raw'

/**
 * /free-audit — dedicated landing page for paid traffic.
 *
 * Frames the offer (free instant audit), explains what's in the report,
 * sells the relevance, then hosts the embedded GHL Prospecting Widget.
 * Below the widget: brief credibility + what happens next.
 *
 * Visual system is shared with /: we inject Landing.styles.css for
 * tokens, typography, nav, footer, and .btn utilities, then layer this
 * page's section styles on top via FreeAudit.styles.css. Both stylesheets
 * leave with the route since they're injected as scoped <style> tags.
 */

const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap'

const FreeAudit = () => {
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

  // Tab title — restored on unmount so other routes keep their own titles
  useEffect(() => {
    const prev = document.title
    document.title =
      'Free Business Audit — See where you’re losing customers online | Jomendez Inc'
    return () => {
      document.title = prev
    }
  }, [])

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
      <nav className="nav scrolled" aria-label="Primary">
        <div className="nav-inner">
          <Link to="/" className="nav-logo" aria-label="Jomendez Inc home">
            <span className="dot" aria-hidden="true"></span>
            <span className="mono micro">JOMENDEZ / INC</span>
          </Link>
          <div className="nav-links">
            <Link to="/" className="fa-nav-back">&larr; Home</Link>
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
              <span className="eyebrow micro">FREE INSTANT AUDIT</span>
              <h1 className="fa-hero-headline">
                See exactly where your business is <em>losing customers online.</em>
              </h1>
              <p className="fa-hero-sub">
                A free, instant report on your online presence. In under 60 seconds, get a clear breakdown of where customers are slipping away &mdash; and what to fix first.
              </p>
              <div className="fa-hero-cta">
                <a href="#audit-widget" className="btn btn-primary" data-cta="scroll-to-widget">
                  Run my free audit
                </a>
                <span className="fa-hero-fineprint">No call required. No obligation.</span>
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
              <span className="eyebrow micro">WHAT&apos;S IN YOUR REPORT</span>
              <h2>
                Five places where customers <em>decide without you.</em>
              </h2>
              <p className="fa-includes-lead">
                The audit pulls live signals from across the web and stitches them into one short, readable report. No jargon, no fluff &mdash; just the gaps that are quietly costing you customers.
              </p>
            </div>

            <ol className="fa-includes-grid">
              <li className="fa-include">
                <span className="meta">01 / LISTINGS</span>
                <h3>Are you showing up where customers look?</h3>
                <p>Across Google, Apple Maps, Yelp, Bing, Facebook, and 50+ directories &mdash; we check whether your name, address, phone, and hours match everywhere they should.</p>
              </li>
              <li className="fa-include">
                <span className="meta">02 / REVIEWS</span>
                <h3>What are customers actually saying?</h3>
                <p>Review count, average rating, response rate, and how you stack up against the competitors a customer sees right next to you in search.</p>
              </li>
              <li className="fa-include">
                <span className="meta">03 / WEBSITE HEALTH</span>
                <h3>Is your site fast, mobile-friendly, and secure?</h3>
                <p>The technical basics that quietly cost you visitors: page speed, mobile usability, HTTPS, and the friction points most owners never see.</p>
              </li>
              <li className="fa-include">
                <span className="meta">04 / SEO SNAPSHOT</span>
                <h3>Are you findable when customers search?</h3>
                <p>Whether you show up for the things people in your area are actually typing &mdash; and where you&apos;re being outranked by businesses just like yours.</p>
              </li>
              <li className="fa-include">
                <span className="meta">05 / GOOGLE BUSINESS PROFILE</span>
                <h3>Is your most important free listing set up to win?</h3>
                <p>Your Google Business Profile is often the first thing a customer sees. We check whether it&apos;s claimed, complete, and built to win the local results above the map.</p>
              </li>
            </ol>
          </div>
        </section>

        {/* ============================================================
            WHY IT MATTERS
            ============================================================ */}
        <section className="fa-why blueprint">
          <div className="wrap">
            <div className="fa-why-inner">
              <span className="eyebrow micro">WHY IT MATTERS</span>
              <h2>
                Most customers decide <em>before</em> they ever pick up the phone.
              </h2>
              <p>
                Wrong listings. Sparse reviews. A slow website. An unclaimed Google profile. Each one is a quiet reason the next customer chose someone else &mdash; not because you&apos;re worse, but because you weren&apos;t set up to win that first decision.
              </p>
              <p>
                The audit shows you which of those gaps are costing you the most. Plain English. No pressure. Yours to keep.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
            WIDGET — GHL Prospecting Widget embed slot
            ============================================================ */}
        <section className="fa-widget" id="audit-widget">
          <div className="wrap">
            <div className="fa-widget-head">
              <span className="eyebrow micro">RUN YOUR FREE AUDIT</span>
              <h2>
                Your report, <em>in under 60 seconds.</em>
              </h2>
              <p>Enter your business name and we&apos;ll pull the rest. No login. No credit card.</p>
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
              <span className="eyebrow micro">WHAT HAPPENS NEXT</span>
              <h2>
                A report you can act on &mdash; <em>without a sales call.</em>
              </h2>
            </div>

            <div className="fa-next-grid">
              <article className="fa-next-card">
                <span className="meta">WHO</span>
                <h3>Behind the audit</h3>
                <p>Built by Jose Mendez. 15+ years engineering reliable systems across enterprise and high-growth startup environments, now applied to local businesses that need practical systems, not tech headaches.</p>
              </article>
              <article className="fa-next-card">
                <span className="meta">NEXT</span>
                <h3>What you get</h3>
                <p>Your audit lands in your inbox within a minute. No phone call required. No salesperson follow-up. You read the report, you decide what to do with it.</p>
              </article>
              <article className="fa-next-card">
                <span className="meta">AFTER</span>
                <h3>If you want help</h3>
                <p>If a gap stands out and you&apos;d like help closing it, we can hop on a free strategy call &mdash; that&apos;s also where the deeper 8-Point Business Audit begins. No pressure either way.</p>
              </article>
            </div>

            <div className="fa-next-cta">
              <Link to="/" className="btn btn-ghost" data-cta="back-to-home">
                &larr; Back to home
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

export default FreeAudit
