import { useEffect, useRef, useState } from 'react'
import stylesCss from './Landing.styles.css?raw'
import WaitlistForm from '../components/WaitlistForm'
import AuditRadar, { AUDIT_DIMENSIONS } from '../components/AuditRadar'
import { ensureAnonymousAuth } from '../services/auth'

/**
 * The new homepage — single-purpose: get a non-technical small-business
 * owner to join the waitlist for the 8-Point Business Audit.
 *
 * Visual system is shared with the previous landing (now /old-site):
 * Inter + Instrument Serif + JetBrains Mono on the same color tokens.
 * Styles live in Landing.styles.css and are injected as a scoped <style>
 * tag so they only apply while this route is mounted.
 *
 * The form is a single reusable <WaitlistForm /> component used in three
 * places (hero, audit-cta, final-cta). The radar chart in the audit
 * section is the brand's signature graphic — see AuditRadar.jsx.
 *
 * The previous homepage is preserved at /old-site (see App.jsx).
 */

const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap'

// 8 dimensions, each with the one-line description from the brief.
// Order matches AUDIT_DIMENSIONS so the list reads in the same order as
// the radar chart axes (top-clockwise).
const AUDIT_DETAIL = [
  { name: 'Online Visibility', desc: 'Can your customers actually find you?' },
  { name: 'Lead Capture', desc: 'Are you turning interest into contact info?' },
  { name: 'Lead Response', desc: 'How fast do leads hear back from you?' },
  { name: 'Customer Retention', desc: 'Are past customers coming back?' },
  { name: 'Operations & Time', desc: 'Where is your week disappearing?' },
  { name: 'Marketing Engine', desc: 'Is content working for you, or are you working for it?' },
  { name: 'Financial Clarity', desc: 'Do you know your real numbers?' },
  { name: 'Tech Stack', desc: 'Are your tools helping or fighting each other?' },
]

// Sanity check: keep the radar's labels in lockstep with the detail list.
// If they ever drift, this fires in dev so we don't ship a mismatch.
if (
  AUDIT_DIMENSIONS.length !== AUDIT_DETAIL.length ||
  AUDIT_DIMENSIONS.some((d, i) => d !== AUDIT_DETAIL[i].name)
) {
  console.warn(
    'AUDIT_DIMENSIONS (radar) and AUDIT_DETAIL (list) are out of sync. Order matters.'
  )
}

const Landing = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const heroRef = useRef(null)

  // Nav scroll state (frosted-glass after the hero passes)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
      'Jomendez Inc \u2014 Big-company technology, built for small business.'
    return () => {
      document.title = prev
    }
  }, [])

  // Eager anonymous auth so the first form submit doesn't pay the auth
  // cost. Failure is non-fatal — submitWaitlist will retry.
  useEffect(() => {
    ensureAnonymousAuth().catch((err) => {
      console.warn('Anonymous auth failed (will retry on submit):', err)
    })
  }, [])

  return (
    <>
      {/* Component-scoped CSS: leaves with the route. */}
      <style>{stylesCss}</style>

      {/* Schema.org Organization markup — also mirrored in index.html for
          first-paint crawlers. Kept here so it travels with the route. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Jomendez Inc',
            url: 'https://jomendez.io',
            description:
              'Jomendez Inc helps small business owners grow with technology — websites, CRMs, automations, AI content, and ad strategy. Founded by Jose Mendez.',
            founder: {
              '@type': 'Person',
              name: 'Jose Mendez',
              jobTitle: 'Founder',
              sameAs: [
                'https://www.linkedin.com/in/jomendez/',
                'https://github.com/jomendez',
              ],
            },
            sameAs: [
              'https://www.linkedin.com/in/jomendez/',
              'https://github.com/jomendez',
            ],
          }),
        }}
      />

      {/* NAV */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} aria-label="Primary">
        <div className="nav-inner">
          <a href="#top" className="nav-logo" aria-label="Jomendez Inc home">
            <span className="dot" aria-hidden="true"></span>
            <span className="mono micro">JOMENDEZ / INC</span>
          </a>
          <div className="nav-links">
            <a href="#audit">The Audit</a>
            <a href="#why">Why it works</a>
            <a href="#about">About</a>
            <a href="#join" className="nav-cta">
              <span className="pill" aria-hidden="true"></span>
              <span>Join the waitlist</span>
            </a>
          </div>
          <button
            className={`nav-hamburger${menuOpen ? ' is-open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="mobile-menu" aria-label="Mobile navigation">
          <a href="#audit" onClick={() => setMenuOpen(false)}>The Audit</a>
          <a href="#why" onClick={() => setMenuOpen(false)}>Why it works</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#join" className="nav-cta" onClick={() => setMenuOpen(false)}>
            <span className="pill" aria-hidden="true"></span>
            <span>Join the waitlist</span>
          </a>
        </div>
      )}

      <main id="top">
        {/* ============================================================
            Section 1 — HERO
            ============================================================ */}
        <section className="hero blueprint grain" ref={heroRef}>
          <div className="wrap">
            <div className="hero-grid">
              <div className="hero-content">
                <div className="hero-eyebrow mono micro">
                  &mdash; THE 8-POINT BUSINESS AUDIT / WAITLIST
                </div>
                <h1 className="hero-headline">
                  Big-company <em>technology</em>, built for your small business.
                </h1>
                <p className="hero-sub">
                  I&apos;m Jose. I spent 15 years building software at Amazon, VMware, and high-growth startups. Now I help small business owners &mdash; plumbers, electricians, med spas, coaches &mdash; use the same systems and strategies the Fortune 500 use to grow their businesses.
                </p>
                <div className="hero-cta-stack">
                  <WaitlistForm
                    source="hero"
                    variant="inline"
                    theme="light"
                    ctaLabel={'Join the waitlist \u2014 Free'}
                  />
                  <p className="hero-cta-fineprint">
                    Get early access to The 8-Point Business Audit.
                  </p>
                </div>
              </div>

              <div className="hero-portrait">
                {/* WebP source + PNG fallback so we serve modern formats
                    where supported and degrade gracefully where not. The
                    same asset pair is used by /old-site, so the browser
                    cache is shared between routes. */}
                <picture>
                  <source srcSet="/landing/images/hero_portrait.webp" type="image/webp" />
                  <img
                    src="/landing/images/hero_portrait.png"
                    alt="Jose Mendez, founder of Jomendez Inc"
                    fetchpriority="high"
                    decoding="async"
                    width="1200"
                    height="1500"
                  />
                </picture>
                <div
                  className="hero-portrait-placeholder"
                  style={{ display: 'none' }}
                  aria-hidden="true"
                >
                  Founder photo
                  <br />
                  /landing/images/jose-hero.jpg
                </div>
                <div className="hero-portrait-meta">
                  <span className="mono micro">JOMENDEZ / INC</span>
                  <h3>
                    Built for owners
                    <br />
                    who built it themselves.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- TRUST STRIP ---- */}
        <section className="trust" aria-label="Engineering experience">
          <div className="wrap-wide trust-inner">
            <p className="mono micro trust-label">
              Engineering experience
              <br />
              from
            </p>
            <div className="trust-logos">
              {/* TODO: drop in real Amazon / VMware / Well Health logo
                  SVGs at /landing/logos/{amazon,vmware,well-health}.svg
                  (placeholders are in place). */}
              <span className="trust-logo" aria-label="Amazon">
                <img src="/landing/logos/amazon.svg" alt="Amazon" />
              </span>
              <span className="trust-logo" aria-label="VMware">
                <img src="/landing/logos/vmware.svg" alt="VMware" />
              </span>
              <span className="trust-logo" aria-label="Well Health">
                <img src="/landing/logos/well-health.svg" alt="Well Health" />
              </span>
            </div>
          </div>
        </section>

        {/* ============================================================
            Section 2 — THE PROBLEM (cost of inaction)
            ============================================================ */}
        <section className="problem">
          <div className="wrap">
            <div className="problem-head">
              <div>
                <span className="eyebrow micro">THE GAP</span>
                <h2>
                  You&apos;re great at what you do.
                  <br />
                  The technology is <em>eating your time.</em>
                </h2>
              </div>
              <div className="problem-body">
                <p>
                  You started this business because you&apos;re good at your craft &mdash; fixing pipes, treating skin, coaching clients, wiring homes. Nobody warned you that running it would mean wearing every hat: the marketer, the bookkeeper, the social media manager, the IT department, the person who chases late invoices at 9pm.
                </p>
                <p>
                  Meanwhile, your competitors are using AI to write their content, automations to follow up with leads in 60 seconds, and CRMs that turn one client into ten referrals. They&apos;re not smarter than you. They just have the systems.
                </p>
                <p>
                  Every month you don&apos;t have those systems, you lose money you&apos;ll never see &mdash; to the lead that didn&apos;t get a callback, the customer who forgot you existed, the invoice that sat unpaid for 90 days.
                </p>
              </div>
            </div>

            <div className="leaks" aria-label="Three places where small businesses lose money">
              <div className="leak">
                <span className="leak-num mono micro">01</span>
                <div className="leak-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3>Lost leads</h3>
                <p>The caller who didn&apos;t hear back in five minutes is calling your competitor in ten.</p>
              </div>
              <div className="leak">
                <span className="leak-num mono micro">02</span>
                <div className="leak-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <h3>Lost time</h3>
                <p>Hours a week copying info between apps, sending the same emails, chasing no-shows.</p>
              </div>
              <div className="leak">
                <span className="leak-num mono micro">03</span>
                <div className="leak-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2v20M17 6c-1-2-3-3-5-3-3 0-5 1.5-5 4 0 6 11 4 11 10 0 2.5-2.5 4-5.5 4-2.5 0-4.5-1-5.5-3" />
                  </svg>
                </div>
                <h3>Lost revenue</h3>
                <p>Past customers who never came back. Invoices that sat unpaid. Referrals that never happened.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            Section 3 — THE PROMISE (what I do)
            ============================================================ */}
        <section className="promise blueprint">
          <div className="wrap">
            <div className="promise-head">
              <div>
                <span className="eyebrow micro">WHAT I DO</span>
                <h2>
                  I&apos;m the technology partner your business <em>never had.</em>
                </h2>
              </div>
              <div className="promise-body">
                <p>
                  I help you find the gaps in your business that are costing you money &mdash; and I build the systems that close them. Websites that actually convert. CRMs that follow up while you sleep. Automations that handle the boring work. AI that creates your content. Ad strategies that don&apos;t waste budget.
                </p>
                <p>You don&apos;t need to learn any of it. That&apos;s my job.</p>
              </div>
            </div>

            <div className="capabilities" aria-label="What I build">
              <article className="capability">
                <div className="capability-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" />
                  </svg>
                </div>
                <span className="micro meta">CAPABILITY 01</span>
                <h3>Websites &amp; Funnels</h3>
                <p>Pages that turn visitors into customers, not just business cards.</p>
              </article>
              <article className="capability">
                <div className="capability-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 7.04 4.96l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </div>
                <span className="micro meta">CAPABILITY 02</span>
                <h3>Automation &amp; CRM</h3>
                <p>Follow-ups, invoicing, scheduling, and lead capture, all on autopilot.</p>
              </article>
              <article className="capability">
                <div className="capability-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z" />
                    <path d="M19 3v4M21 5h-4M5 17v4M7 19H3" />
                  </svg>
                </div>
                <span className="micro meta">CAPABILITY 03</span>
                <h3>AI Content Engine</h3>
                <p>Reels, images, posts, and copy generated for your brand, on schedule.</p>
              </article>
              <article className="capability">
                <div className="capability-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 3v18h18" />
                    <path d="M7 14l4-4 3 3 5-6" />
                    <path d="M14 7h5v5" />
                  </svg>
                </div>
                <span className="micro meta">CAPABILITY 04</span>
                <h3>Ads &amp; Growth</h3>
                <p>Paid strategies that bring in qualified leads, with the numbers to prove it.</p>
              </article>
            </div>
          </div>
        </section>

        {/* ============================================================
            Section 4 — THE 8-POINT AUDIT (the hook)
            ============================================================ */}
        <section className="audit" id="audit">
          <div className="wrap">
            <div className="audit-head">
              <div>
                <span className="eyebrow micro">START HERE</span>
                <h2>
                  The 8-Point <em>Business Audit</em>
                </h2>
              </div>
              <div className="audit-body">
                <p>
                  Before I build anything, I look at your business across the eight dimensions that actually drive growth. You&apos;ll get a personalized report showing exactly where you&apos;re leaving money on the table &mdash; and a clear plan to fix it.
                </p>
              </div>
            </div>

            <div className="audit-layout">
              <div className="audit-radar-wrap">
                <AuditRadar />
              </div>

              <ol className="audit-list" aria-label="The 8 audit dimensions">
                {AUDIT_DETAIL.map((d, i) => (
                  <li className="audit-dim" key={d.name}>
                    <span className="audit-dim-num">{String(i + 1).padStart(2, '0')} / {d.name.toUpperCase()}</span>
                    <span className="audit-dim-name">{d.name}</span>
                    <span className="audit-dim-desc">{d.desc}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="audit-cta">
              <div className="audit-cta-copy">
                <h3>Join the waitlist for The 8-Point Audit</h3>
                <p>I&apos;ll let you know the moment it opens. No charge, no spam.</p>
              </div>
              <WaitlistForm
                source="audit"
                variant="inline"
                theme="dark"
                ctaLabel="Get early access"
              />
            </div>
          </div>
        </section>

        {/* ============================================================
            Section 5 — WHY THIS WORKS (authority)
            ============================================================ */}
        <section className="why" id="why">
          <div className="wrap">
            <div className="why-head">
              <div>
                <span className="eyebrow micro">WHY THIS WORKS</span>
                <h2>
                  Big-company rigor.
                  <br />
                  Small-business <em>common sense.</em>
                </h2>
              </div>
              <div className="why-body">
                <p>
                  At Amazon, I learned how the world&apos;s largest companies make decisions: working backward from the customer, separating reversible bets from irreversible ones, treating every day like Day One. Most small businesses never get exposed to those frameworks. They&apos;re not complicated &mdash; they just need someone to translate them.
                </p>
                <p>
                  That&apos;s the work. I take what runs Amazon and Wall Street and adapt it for a med spa in Hialeah, a plumber in Kendall, a coach scaling from one to ten. Same principles. Different scale.
                </p>
              </div>
            </div>

            <div className="why-stats">
              <div className="why-stat">
                <div className="why-stat-num">15+ years</div>
                <div className="why-stat-label">
                  Building software
                  <span className="why-stat-sub">for Amazon, VMware, and high-growth startups.</span>
                </div>
              </div>
              <div className="why-stat">
                <div className="why-stat-num">Senior Engineer</div>
                <div className="why-stat-label">
                  At Amazon
                  <span className="why-stat-sub">currently building Amazon&apos;s internal communication platform.</span>
                </div>
              </div>
              <div className="why-stat">
                <div className="why-stat-num">Bilingual</div>
                <div className="why-stat-label">
                  US-based
                  <span className="why-stat-sub">based in Miami, working with clients across the country.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            Section 6 — ABOUT JOSE (the human)
            ============================================================ */}
        <section className="about" id="about">
          <div className="wrap">
            <div className="about-grid">
              <div className="about-img">
                {/* WebP source + PNG fallback. Same asset pair is also
                    used on /old-site. */}
                <picture>
                  <source srcSet="/landing/images/about_portrait.webp" type="image/webp" />
                  <img
                    src="/landing/images/about_portrait.png"
                    alt="Jose Mendez"
                    loading="lazy"
                    decoding="async"
                    width="1200"
                    height="1500"
                  />
                </picture>
                <div
                  className="about-img-placeholder"
                  style={{ display: 'none' }}
                  aria-hidden="true"
                >
                  Founder photo
                  <br />
                  /landing/images/about_portrait.png
                </div>
              </div>
              <div className="about-content">
                <span className="eyebrow micro">ABOUT</span>
                <h2>
                  From Havana to Amazon to <em>your business.</em>
                </h2>
                <p>
                  I started my career as an intern in Cuba, building internal tools for a company that couldn&apos;t afford anyone more experienced. Every job after that &mdash; Ecuador, Costa Rica, Miami, eventually Amazon &mdash; was the same pattern: walk into a business, find what&apos;s broken, build the system that fixes it.
                </p>
                <p>
                  Somewhere along the way I realized the businesses that need this work the most aren&apos;t the Fortune 500. They&apos;re the ones run by people who immigrated, hustled, and built something real with their hands. They have the customers. They have the craft. What they&apos;re missing is the engineering.
                </p>
                <p>
                  I built <strong>jomendez.io</strong> to close that gap.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            Section 7 — THE PATH
            ============================================================ */}
        <section className="path">
          <div className="wrap">
            <div className="path-head">
              <span className="eyebrow micro">THE PATH</span>
              <h2>
                A clear path. <em>No surprises.</em>
              </h2>
            </div>
            <ol className="path-steps">
              <li className="path-step">
                <span className="path-step-num serif">01</span>
                <span className="path-step-eyebrow mono micro">STEP 01</span>
                <h3>Join the waitlist</h3>
                <p>When the audit opens, you&apos;ll be among the first to get access. No charge to join.</p>
              </li>
              <li className="path-step">
                <span className="path-step-num serif">02</span>
                <span className="path-step-eyebrow mono micro">STEP 02</span>
                <h3>Take the audit</h3>
                <p>A guided assessment of your business across the eight dimensions, plus a personalized report with specific recommendations.</p>
              </li>
              <li className="path-step">
                <span className="path-step-num serif">03</span>
                <span className="path-step-eyebrow mono micro">STEP 03</span>
                <h3>We build it together</h3>
                <p>Pick the recommendations that matter most. I scope, I build, I hand it off &mdash; or we keep working together long-term.</p>
              </li>
            </ol>
          </div>
        </section>

        {/* ============================================================
            Section 8 — FINAL CTA
            ============================================================ */}
        <section className="final blueprint grain" id="join">
          <div className="wrap">
            <div className="final-wrap">
              <h2>
                Your business deserves the same systems the <em>Fortune 500 use.</em>
              </h2>
              <p className="final-sub">
                Join the waitlist for The 8-Point Business Audit. I&apos;ll let you know the moment it&apos;s open.
              </p>
              <div className="final-form">
                <WaitlistForm
                  source="final"
                  variant="stacked"
                  theme="dark"
                  ctaLabel={'Join the waitlist \u2014 Free'}
                  successMessage={'You\u2019re on the list. I\u2019ll email you the moment the audit opens.'}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            Section 9 — FOOTER
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
            <div className="footer-address" style={{ textAlign: 'center', fontSize: '0.55rem', opacity: 0.5, marginTop: '0.75rem', letterSpacing: '0.03em' }}>
              13375 SW 42 Ter, Miami, FL 33175 &nbsp;|&nbsp; 786 486 1561
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}

export default Landing
