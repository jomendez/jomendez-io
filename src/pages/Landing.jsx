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
  { name: 'Online Visibility', desc: 'Can the right customers actually find you?' },
  { name: 'Lead Capture', desc: 'Is your website turning visitors into contacts?' },
  { name: 'Lead Response', desc: 'How fast do new inquiries hear back from you?' },
  { name: 'Customer Retention', desc: 'Are past customers coming back — and sending referrals?' },
  { name: 'Operations & Time', desc: 'Where are the manual tasks eating your week?' },
  { name: 'Marketing Engine', desc: 'Is your content driving leads, or just creating busy work?' },
  { name: 'Financial Clarity', desc: 'Do you actually see your pipeline and your real numbers?' },
  { name: 'Tech Stack', desc: 'Are your tools working together, or fighting each other?' },
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
      'Jomendez Inc \u2014 Smart websites & AI-powered sales systems for local businesses.'
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
              'Jomendez Inc builds smart websites and AI-powered sales systems — website, CRM, booking, AI chat, and automated follow-up — that help local businesses capture, follow up with, and convert more leads. Founded by Jose Mendez.',
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
            <a href="#audit">How It Works</a>
            <a href="#why">Why It Works</a>
            <a href="#about">About</a>
            <a href="#join" className="nav-cta">
              <span className="pill" aria-hidden="true"></span>
              <span style={{ color: 'rgb(255, 255, 255)' }}>Book a Strategy Call</span>
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
          <a href="#audit" onClick={() => setMenuOpen(false)}>How It Works</a>
          <a href="#why" onClick={() => setMenuOpen(false)}>Why It Works</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#join" className="nav-cta" onClick={() => setMenuOpen(false)}>
            <span className="pill" aria-hidden="true"></span>
            <span>Book a Strategy Call</span>
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
                  &mdash; FRACTIONAL CTO / GROWTH SYSTEMS FOR LOCAL BUSINESSES
                </div>
                <h1 className="hero-headline">
                  Smart <em>websites</em> that help local businesses capture and convert more leads.
                </h1>
                <p className="hero-sub">
                  I build the website, CRM, booking, AI chat, and automated follow-up system that helps you respond faster, stay organized, and turn more inquiries into customers &mdash; without adding more work to your day.
                </p>
                <div className="hero-cta-stack">
                  <WaitlistForm
                    source="hero"
                    variant="inline"
                    theme="light"
                    ctaLabel="Book a Strategy Call"
                    ctaSentLabel={'Request received \u2713'}
                    successMessage={'Got it. I\u2019ll be in touch within 24 hours to schedule your call.'}
                  />
                  <p className="hero-cta-fineprint">
                    Free 20-minute call. We&apos;ll map where your business is losing leads.
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
                    The system behind
                    <br />
                    your website.
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
              Disciplined engineering
              <br />
              background
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
                <span className="eyebrow micro">THE REAL PROBLEM</span>
                <h2>
                  A website alone doesn&apos;t capture and convert leads.
                  <br />
                  The <em>system behind it</em> does.
                </h2>
              </div>
              <div className="problem-body">
                <p>
                  Whether you already have a website, you&apos;re replacing one that isn&apos;t working, or you&apos;re launching your business from scratch &mdash; the goal is the same: every lead captured, every inquiry followed up with, every appointment booked. Most businesses never get there because nobody built the system underneath.
                </p>
                <p>
                  Inquiries arrive from referrals, social, ads, and walk-ins. They land in different places &mdash; phone, DMs, email, a sticky note &mdash; and the ones that don&apos;t get a fast, organized response quietly disappear.
                </p>
                <p>
                  What&apos;s missing isn&apos;t another pretty page. It&apos;s one place to catch every lead, one clear process for following up, and the automation to keep it running while you focus on the work.
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
                <h3>Leads that never get a reply</h3>
                <p>Inquiries arrive while you&apos;re with a customer, on a job, or asleep. With nothing set up to catch and respond, they quietly go to a competitor.</p>
              </div>
              <div className="leak">
                <span className="leak-num mono micro">02</span>
                <div className="leak-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <h3>Hours lost to manual work</h3>
                <p>Copying contacts between notebooks and apps, sending the same messages by hand, chasing no-shows, and juggling tools that don&apos;t talk to each other.</p>
              </div>
              <div className="leak">
                <span className="leak-num mono micro">03</span>
                <div className="leak-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2v20M17 6c-1-2-3-3-5-3-3 0-5 1.5-5 4 0 6 11 4 11 10 0 2.5-2.5 4-5.5 4-2.5 0-4.5-1-5.5-3" />
                  </svg>
                </div>
                <h3>Customers who never come back</h3>
                <p>With no plan for follow-up, reviews, or reactivation, every customer is a one-and-done. Your best source of future revenue stays cold.</p>
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
                <span className="eyebrow micro">THE SYSTEM</span>
                <h2>
                  A complete lead conversion system, <em>built around your business.</em>
                </h2>
              </div>
              <div className="promise-body">
                <p>
                  Not just a website. Your website, CRM, booking, AI chat, and automated follow-up all working together as one system &mdash; so every lead gets captured, every inquiry gets a fast response, and nothing falls through the cracks.
                </p>
                <p>Simple for your team. Powerful behind the scenes. You don&apos;t need to learn any of it &mdash; that&apos;s my job.</p>
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
                <h3>Smart Business Websites</h3>
                <p>Fast, professional sites built to capture leads &mdash; not just look good. Designed to turn visitors into booked appointments.</p>
              </article>
              <article className="capability">
                <div className="capability-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 7.04 4.96l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </div>
                <span className="micro meta">CAPABILITY 02</span>
                <h3>CRM &amp; Lead Pipeline</h3>
                <p>Every lead in one place, with a clear next step for each one. Real visibility into your pipeline &mdash; no spreadsheets, no guessing.</p>
              </article>
              <article className="capability">
                <div className="capability-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z" />
                    <path d="M19 3v4M21 5h-4M5 17v4M7 19H3" />
                  </svg>
                </div>
                <span className="micro meta">CAPABILITY 03</span>
                <h3>AI Chat &amp; Automated Follow-Up</h3>
                <p>Reply to new leads in seconds. Send reminders and follow-ups automatically. An AI assistant answers common questions 24/7.</p>
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
                <h3>Booking &amp; Customer Reactivation</h3>
                <p>Online booking, review collection, and win-back campaigns that bring quiet customers back &mdash; without you lifting a finger.</p>
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
                <span className="eyebrow micro">FIND THE GAPS</span>
                <h2>
                  The 8-Point <em>Business Audit</em>
                </h2>
              </div>
              <div className="audit-body">
                <p>
                  Before we build anything, we look at your business across the eight dimensions that drive growth. You&apos;ll see exactly where leads are leaking, where follow-up is breaking down, and what to fix first &mdash; in plain English.
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
                <h3>Let&apos;s find what to build first</h3>
                <p>Book a short strategy call. We&apos;ll talk through where your business is &mdash; new, growing, or stuck &mdash; and what to put in place first to start capturing and converting more leads.</p>
              </div>
              <WaitlistForm
                source="audit"
                variant="inline"
                theme="dark"
                ctaLabel="Book a Strategy Call"
                ctaSentLabel={'Request received ✓'}
                successMessage={'Got it. I’ll be in touch within 24 hours to schedule your call.'}
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
                  Not a basic website.
                  <br />
                  Not a <em>generic agency.</em>
                </h2>
              </div>
              <div className="why-body">
                <p>
                  Most agencies stop at the website. The result looks fine, but every lead still depends on you remembering to follow up. I build the operational system behind the website &mdash; capture, CRM, booking, follow-up, AI &mdash; so every inquiry moves through a clear process, automatically.
                </p>
                <p>
                  My background is in professional software engineering, but my focus is simple: helping local businesses use technology to respond faster, stay organized, and close more opportunities. The same disciplined approach used to build reliable systems at scale &mdash; applied to your business at your scale.
                </p>
              </div>
            </div>

            <div className="why-stats">
              <div className="why-stat">
                <div className="why-stat-num">15+ years</div>
                <div className="why-stat-label">
                  Building reliable systems
                  <span className="why-stat-sub">across enterprise and high-growth startup environments.</span>
                </div>
              </div>
              <div className="why-stat">
                <div className="why-stat-num">Fractional CTO</div>
                <div className="why-stat-label">
                  For local businesses
                  <span className="why-stat-sub">the technical partner most small businesses can&apos;t justify hiring full-time.</span>
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
                  The technical partner most small businesses <em>never get.</em>
                </h2>
                <p>
                  I started my career as an intern in Cuba, building internal tools for a company that couldn&apos;t afford anyone more experienced. Every job after that &mdash; Ecuador, Costa Rica, Miami, and into senior engineering work in the US &mdash; was the same pattern: walk into a business, find what&apos;s broken, build the system that fixes it.
                </p>
                <p>
                  Somewhere along the way I realized the businesses that need this work the most are the ones run by people who hustled and built something real with their hands. They have the customers. They have the craft. What they&apos;re missing is the system behind it &mdash; the kind of digital operating system larger companies already use to capture, follow up, and convert.
                </p>
                <p>
                  I built <strong>jomendez.io</strong> to bring that system to local businesses.
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
                <h3>Book a strategy call</h3>
                <p>A free 20-minute conversation about your business, your goals, and what a complete system would look like for you &mdash; whether you&apos;re launching, growing, or rebuilding.</p>
              </li>
              <li className="path-step">
                <span className="path-step-num serif">02</span>
                <span className="path-step-eyebrow mono micro">STEP 02</span>
                <h3>Get your audit &amp; plan</h3>
                <p>We walk through the 8-Point Business Audit together. You leave with a clear map of what to fix first &mdash; and what you can ignore.</p>
              </li>
              <li className="path-step">
                <span className="path-step-num serif">03</span>
                <span className="path-step-eyebrow mono micro">STEP 03</span>
                <h3>Build your growth system</h3>
                <p>Pick what matters most. I scope, I build, I hand it off &mdash; or we keep working together long-term. You stay in business mode. I handle the technology.</p>
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
                Stop losing leads. Start building a system that <em>converts them.</em>
              </h2>
              <p className="final-sub">
                Book a short strategy call. We&apos;ll map the fastest path to a complete system &mdash; whether you&apos;re starting from scratch, replacing what isn&apos;t working, or filling in the gaps.
              </p>
              <div className="final-form">
                <WaitlistForm
                  source="final"
                  variant="stacked"
                  theme="dark"
                  ctaLabel="Book a Strategy Call"
                  ctaSentLabel={'Request received \u2713'}
                  successMessage={'Got it. I\u2019ll be in touch within 24 hours to schedule your call.'}
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
          </div>
        </footer>
      </main>
    </>
  )
}

export default Landing
