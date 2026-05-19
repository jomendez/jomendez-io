import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import stylesCss from './Landing.styles.css?raw'
import AuditRadar, { AUDIT_DIMENSIONS } from '../components/AuditRadar'
import { ensureAnonymousAuth } from '../services/auth'
import { useContent } from '../i18n/LanguageContext'
import LanguageToggle from '../i18n/LanguageToggle'
import landingContent from '../i18n/content/landing'

/**
 * The homepage (/). Bilingual — all copy comes from the per-language
 * content module (src/i18n/content/landing.jsx); the active slice is
 * read with useContent(). The visual system is unchanged: Inter +
 * Instrument Serif + JetBrains Mono on the same color tokens, styles
 * injected as a scoped <style> tag from Landing.styles.css.
 *
 * The previous homepage is preserved at /old-site (see App.jsx).
 */

const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap'

// Pricing tier order → /contact plan slug + analytics data-cta value.
const PLAN_SLUGS = ['starter', 'growth', 'pro']

// Sanity check: the translated audit dimension lists must stay the same
// length as the radar's axes (the radar renders its own English labels).
if (
  landingContent.en.audit.dimensions.length !== AUDIT_DIMENSIONS.length ||
  landingContent.es.audit.dimensions.length !== AUDIT_DIMENSIONS.length
) {
  console.warn(
    'Audit dimension lists are out of sync with the radar axes. Order matters.'
  )
}

// Section icons live in the component (they're JSX, not copy) and are
// zipped with the translated card content by index.
const LEAK_ICONS = [
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    <circle cx="12" cy="12" r="3" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2v20M17 6c-1-2-3-3-5-3-3 0-5 1.5-5 4 0 6 11 4 11 10 0 2.5-2.5 4-5.5 4-2.5 0-4.5-1-5.5-3" />
  </svg>,
]

const CAPABILITY_ICONS = [
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 7.04 4.96l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2z" />
    <path d="M19 3v4M21 5h-4M5 17v4M7 19H3" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 3v18h18" />
    <path d="M7 14l4-4 3 3 5-6" />
    <path d="M14 7h5v5" />
  </svg>,
]

// Two CTA buttons used in the hero, audit-cta, and final sections.
// "Get free business audit" routes to /free-audit; "Book a Strategy
// Call" routes to /strategy-call. data-cta / data-source feed analytics.
const CtaButtons = ({ source }) => {
  const t = useContent(landingContent)
  return (
    <div className="cta-buttons">
      <Link
        to="/free-audit"
        className="btn btn-primary"
        data-cta="free-audit"
        data-source={source}
      >
        {t.cta.freeAudit}
      </Link>
      <Link
        to="/strategy-call"
        className="btn btn-outline"
        data-cta="strategy-call"
        data-source={source}
      >
        {t.cta.bookCall}
      </Link>
    </div>
  )
}

const Landing = () => {
  const t = useContent(landingContent)
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

  // Tab title — follows the active language; restored on unmount.
  useEffect(() => {
    const prev = document.title
    document.title = t.meta.title
    return () => {
      document.title = prev
    }
  }, [t.meta.title])

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
            logo: 'https://jomendez.io/landing/jm-logo.webp',
            image: 'https://jomendez.io/landing/images/og.png',
            description:
              'Jomendez Inc builds smart websites and AI-powered sales systems — website, CRM, booking, AI chat, and automated follow-up — that help local businesses capture, follow up with, and convert more leads. Founded by Jose Mendez.',
            areaServed: 'United States',
            founder: {
              '@type': 'Person',
              name: 'Jose Mendez',
              jobTitle: 'Founder',
              sameAs: [
                'https://www.linkedin.com/in/jomendez/',
                'https://github.com/jomendez',
              ],
            },
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer support',
              email: 'support@jomendez.io',
              telephone: '+1-786-952-5448',
              areaServed: 'US',
              availableLanguage: ['English', 'Spanish'],
            },
            sameAs: [
              'https://www.linkedin.com/in/jomendez/',
              'https://github.com/jomendez',
            ],
          }),
        }}
      />

      {/* FAQPage markup — built from the same FAQ content the section
          renders, so the structured data always matches what's visible.
          Follows the active language. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: t.faq.items.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.a,
              },
            })),
          }),
        }}
      />

      {/* NAV */}
      <nav
        className={`nav${scrolled ? ' scrolled' : ''}`}
        aria-label={t.a11y.primaryNav}
      >
        <div className="nav-inner">
          <a href="#top" className="nav-logo" aria-label={t.a11y.homeLink}>
            <img
              src="/landing/jm-logo.webp"
              alt=""
              className="brand-mark"
              width="36"
              height="36"
              decoding="async"
            />
            <span className="mono micro">JOMENDEZ / INC</span>
          </a>
          <div className="nav-links">
            <a href="#audit">{t.nav.howItWorks}</a>
            <a href="#why">{t.nav.whyItWorks}</a>
            <a href="#about">{t.nav.about}</a>
            <a href="#pricing">{t.nav.pricing}</a>
            <LanguageToggle />
            <Link
              to="/strategy-call"
              className="nav-cta"
              data-cta="strategy-call"
              data-source="nav"
            >
              <span className="pill" aria-hidden="true"></span>
              <span style={{ color: 'rgb(255, 255, 255)' }}>
                {t.cta.bookCall}
              </span>
            </Link>
          </div>
          <button
            className={`nav-hamburger${menuOpen ? ' is-open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? t.a11y.closeMenu : t.a11y.openMenu}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="mobile-menu" aria-label={t.a11y.mobileNav}>
          <a href="#audit" onClick={() => setMenuOpen(false)}>
            {t.nav.howItWorks}
          </a>
          <a href="#why" onClick={() => setMenuOpen(false)}>
            {t.nav.whyItWorks}
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            {t.nav.about}
          </a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>
            {t.nav.pricing}
          </a>
          <LanguageToggle className="lang-toggle--block" />
          <Link
            to="/strategy-call"
            className="nav-cta"
            data-cta="strategy-call"
            data-source="mobile-nav"
            onClick={() => setMenuOpen(false)}
          >
            <span className="pill" aria-hidden="true"></span>
            <span>{t.cta.bookCall}</span>
          </Link>
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
                  {t.hero.eyebrow}
                </div>
                <h1 className="hero-headline">{t.hero.headline}</h1>
                <p className="hero-sub">{t.hero.sub}</p>
                <div className="hero-cta-stack">
                  <CtaButtons source="hero" />
                  <p className="hero-cta-fineprint">{t.hero.fineprint}</p>
                </div>
              </div>

              <div className="hero-portrait">
                {/* WebP source + PNG fallback so we serve modern formats
                    where supported and degrade gracefully where not. */}
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
                  <h3>{t.hero.portraitTagline}</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---- TRUST STRIP ---- */}
        <section className="trust" aria-label={t.a11y.trust}>
          <div className="wrap-wide trust-inner">
            <p className="mono micro trust-label">{t.trust.label}</p>
            <div className="trust-logos">
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
                <span className="eyebrow micro">{t.problem.eyebrow}</span>
                <h2>{t.problem.heading}</h2>
              </div>
              <div className="problem-body">
                {t.problem.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            <div className="leaks" aria-label={t.a11y.leaks}>
              {t.problem.leaks.map((leak, i) => (
                <div className="leak" key={i}>
                  <span className="leak-num mono micro">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="leak-icon" aria-hidden="true">
                    {LEAK_ICONS[i]}
                  </div>
                  <h3>{leak.title}</h3>
                  <p>{leak.desc}</p>
                </div>
              ))}
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
                <span className="eyebrow micro">{t.promise.eyebrow}</span>
                <h2>{t.promise.heading}</h2>
              </div>
              <div className="promise-body">
                {t.promise.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            <div className="capabilities" aria-label={t.a11y.capabilities}>
              {t.promise.capabilities.map((cap, i) => (
                <article className="capability" key={i}>
                  <div className="capability-icon" aria-hidden="true">
                    {CAPABILITY_ICONS[i]}
                  </div>
                  <span className="micro meta">{cap.label}</span>
                  <h3>{cap.title}</h3>
                  <p>{cap.desc}</p>
                </article>
              ))}
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
                <span className="eyebrow micro">{t.audit.eyebrow}</span>
                <h2>{t.audit.heading}</h2>
              </div>
              <div className="audit-body">
                {t.audit.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            <div className="audit-layout">
              <div className="audit-radar-wrap">
                <AuditRadar />
              </div>

              <ol className="audit-list" aria-label={t.a11y.auditDimensions}>
                {t.audit.dimensions.map((d, i) => (
                  <li className="audit-dim" key={i}>
                    <span className="audit-dim-num">
                      {String(i + 1).padStart(2, '0')} / {d.name.toUpperCase()}
                    </span>
                    <span className="audit-dim-name">{d.name}</span>
                    <span className="audit-dim-desc">{d.desc}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="audit-cta">
              <div className="audit-cta-copy">
                <h3>{t.audit.ctaHeading}</h3>
                <p>{t.audit.ctaBody}</p>
              </div>
              <CtaButtons source="audit" />
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
                <span className="eyebrow micro">{t.why.eyebrow}</span>
                <h2>{t.why.heading}</h2>
              </div>
              <div className="why-body">
                {t.why.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            <div className="why-stats">
              {t.why.stats.map((stat, i) => (
                <div className="why-stat" key={i}>
                  <div className="why-stat-num">{stat.num}</div>
                  <div className="why-stat-label">
                    {stat.label}
                    <span className="why-stat-sub">{stat.sub}</span>
                  </div>
                </div>
              ))}
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
                {/* WebP source + PNG fallback for the founder portrait. */}
                <picture>
                  <source srcSet="/landing/images/jose.webp" type="image/webp" />
                  <img
                    src="/landing/images/jose.png"
                    alt="Jose Mendez"
                    loading="lazy"
                    decoding="async"
                    width="1122"
                    height="1402"
                  />
                </picture>
                <div
                  className="about-img-placeholder"
                  style={{ display: 'none' }}
                  aria-hidden="true"
                >
                  Founder photo
                  <br />
                  /landing/images/jose.png
                </div>
              </div>
              <div className="about-content">
                <span className="eyebrow micro">{t.about.eyebrow}</span>
                <h2>{t.about.heading}</h2>
                {t.about.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                <p>{t.about.bodyClosing}</p>
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
              <span className="eyebrow micro">{t.path.eyebrow}</span>
              <h2>{t.path.heading}</h2>
            </div>
            <ol className="path-steps">
              {t.path.steps.map((step, i) => (
                <li className="path-step" key={i}>
                  <span className="path-step-num serif">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="path-step-eyebrow mono micro">
                    {step.label}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============================================================
            Section 7.5 — PRICING
            ============================================================ */}
        <section className="pricing" id="pricing">
          <div className="wrap">
            <div className="pricing-head">
              <span className="eyebrow micro">{t.pricing.eyebrow}</span>
              <h2>{t.pricing.heading}</h2>
              <p>{t.pricing.sub}</p>
            </div>

            <div className="pricing-grid">
              {t.pricing.tiers.map((tier, i) => (
                <article
                  className={`pricing-card${i === 1 ? ' pricing-card--featured' : ''}`}
                  key={i}
                >
                  <header className="pricing-card-head">
                    <span className="pricing-tier">{tier.tier}</span>
                    <p className="pricing-tier-sub">{tier.tierSub}</p>
                  </header>
                  <div className="pricing-price">
                    <span className="pricing-price-amount">
                      {tier.priceAmount}
                    </span>
                    <span className="pricing-price-plus">+</span>
                    <span className="pricing-price-recurring">
                      {tier.priceRecurring}
                    </span>
                  </div>
                  <p className="pricing-card-desc">{tier.desc}</p>
                  <ul className="pricing-features">
                    {tier.features.map((f, fi) => (
                      <li key={fi}>{f}</li>
                    ))}
                  </ul>
                  <Link
                    to={`/contact?selected_plan=${PLAN_SLUGS[i]}`}
                    className="btn btn-primary pricing-cta"
                    data-cta={`signup-${PLAN_SLUGS[i]}`}
                    data-source="pricing"
                  >
                    {t.pricing.cta}
                  </Link>
                </article>
              ))}
            </div>

            {/* CUSTOM tier — full-width banner card below the grid. */}
            <aside className="pricing-custom">
              <div className="pricing-custom-content">
                <span className="pricing-tier">{t.pricing.custom.tier}</span>
                <h3>{t.pricing.custom.heading}</h3>
                <p>{t.pricing.custom.body}</p>
                <ul className="pricing-custom-features">
                  {t.pricing.custom.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
              <div className="pricing-custom-cta">
                <span className="pricing-custom-price">
                  {t.pricing.custom.price}
                </span>
                <p className="pricing-custom-price-sub">
                  {t.pricing.custom.priceSub}
                </p>
                <Link
                  to="/strategy-call"
                  className="btn btn-primary pricing-cta"
                  data-cta="signup-custom"
                  data-source="pricing"
                >
                  {t.pricing.custom.cta}
                </Link>
              </div>
            </aside>
          </div>
        </section>

        {/* ============================================================
            Section 7.7 — FAQ
            Native <details>/<summary> accordion — no JS, keyboard-
            accessible out of the box.
            ============================================================ */}
        <section className="faq" id="faq">
          <div className="wrap">
            <div className="faq-head">
              <span className="eyebrow micro">{t.faq.eyebrow}</span>
              <h2>{t.faq.heading}</h2>
            </div>

            <div className="faq-list">
              {t.faq.items.map((item, i) => (
                <details className="faq-item" key={i}>
                  <summary className="faq-q">{item.q}</summary>
                  <div className="faq-a">
                    <p>{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            Section 8 — FINAL CTA
            ============================================================ */}
        <section className="final blueprint grain" id="join">
          <div className="wrap">
            <div className="final-wrap">
              <h2>{t.final.heading}</h2>
              <p className="final-sub">{t.final.sub}</p>
              <div className="final-form">
                <CtaButtons source="final" />
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
                <img
                  src="/landing/jm-logo.webp"
                  alt=""
                  className="brand-mark"
                  width="36"
                  height="36"
                  decoding="async"
                />
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

export default Landing
