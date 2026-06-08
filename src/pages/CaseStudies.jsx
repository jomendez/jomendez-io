import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import baseStylesCss from './Landing.styles.css?raw'
import pageStylesCss from './CaseStudies.styles.css?raw'
import { useContent, useLanguage } from '../i18n/LanguageContext'
import LanguageToggle from '../i18n/LanguageToggle'
import caseStudiesContent from '../i18n/content/caseStudies'

/**
 * SVG donut chart driven by the legend percentages. Each tier gets a
 * stroke-dasharray segment around a circle so the result is a clean
 * 4-segment ring with no canvas / library overhead. The colors live in
 * CSS (var(--cs-tier-*)) so the visualization theme follows tokens.
 */
const TIER_COLOR_VAR = {
  good: 'var(--cs-tier-good)',
  medium: 'var(--cs-tier-medium)',
  bad: 'var(--cs-tier-bad)',
  unranked: 'var(--cs-tier-unranked)',
}

const Donut = ({ legend, size = 88, stroke = 14 }) => {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  // Build segments in order. Start angle is -90° (12 o'clock).
  let offset = 0
  const segments = legend
    .filter((s) => s.percent > 0)
    .map((s, i) => {
      const len = (c * s.percent) / 100
      const node = (
        <circle
          key={i}
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={TIER_COLOR_VAR[s.tier]}
          strokeWidth={stroke}
          strokeDasharray={`${len} ${c - len}`}
          strokeDashoffset={-offset}
        />
      )
      offset += len
      return node
    })
  return (
    <svg
      className="cs-card-donut-svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-hidden="true"
    >
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>{segments}</g>
    </svg>
  )
}

/**
 * /case-studies — full case-studies landing.
 *
 * Long-form proof page. Renders five detailed client stories with the
 * actual before/after heatmap visualizations pulled from the live
 * ranking dashboards (under public/landing/case-studies/), plus four
 * shorter stat-card cases under "More wins". All copy lives in the
 * caseStudiesContent module so EN + ES toggle cleanly.
 *
 * Visual system is shared with / via Landing.styles.css; per-page
 * tweaks (long-form layout, case-card structure, brief grid) live in
 * CaseStudies.styles.css.
 */

const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap'

const CaseStudies = () => {
  const t = useContent(caseStudiesContent)
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

  // Per-route metadata: title, description, OG/Twitter tags, canonical.
  // Follows the active language; re-runs when it changes.
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
    const URL = 'https://jomendez.io/case-studies'
    const IMAGE_ALT =
      'Jomendez Inc client case studies — local SEO heatmap results across nine industries'

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

  // Scroll to top on mount.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <style>{baseStylesCss}</style>
      <style>{pageStylesCss}</style>

      {/* WebPage + ItemList structured data — each detailed case
          is an Article-like entry in the list. Helps search engines
          recognize this as a collection of case studies. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: t.meta.title,
            description: t.meta.description,
            url: 'https://jomendez.io/case-studies',
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
            mainEntity: {
              '@type': 'ItemList',
              numberOfItems: t.cases.length + t.briefCases.length,
              itemListElement: [
                ...t.cases.map((c, i) => ({
                  '@type': 'ListItem',
                  position: i + 1,
                  name: `${c.industry} — ${c.timeframe}`,
                  url: `https://jomendez.io/case-studies#${c.slug}`,
                })),
                ...t.briefCases.map((c, i) => ({
                  '@type': 'ListItem',
                  position: t.cases.length + i + 1,
                  name: `${c.industry} — ${c.timeframe}`,
                })),
              ],
            },
          }),
        }}
      />

      {/* NAV — minimal: brand + back to home + language toggle. */}
      <nav className="nav scrolled" aria-label={t.a11y.primaryNav}>
        <div className="nav-inner">
          <Link to="/" className="nav-logo" aria-label={t.a11y.homeLink}>
            <img
              src="/landing/jm-logo.webp"
              alt="Jomendez Inc"
              className="brand-mark"
              width="36"
              height="36"
              decoding="async"
            />
            <span className="mono micro">JOMENDEZ / INC</span>
          </Link>
          <div className="nav-links">
            <Link to="/" className="cs-nav-back">
              {t.nav.back}
            </Link>
            <LanguageToggle />
          </div>
        </div>
      </nav>

      <main id="top">
        {/* ============================================================
            HERO
            ============================================================ */}
        <section className="cs-hero blueprint grain">
          <div className="wrap">
            <div className="cs-hero-inner">
              <span className="eyebrow micro">{t.hero.eyebrow}</span>
              <h1 className="cs-hero-headline">{t.hero.headline}</h1>
              <p className="cs-hero-sub">{t.hero.sub}</p>
              <p className="cs-hero-fineprint mono micro">
                {t.hero.fineprint}
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
            DETAILED CASES — 5 long-form, image + narrative + bullets
            ============================================================ */}
        <section className="cs-cases" aria-label={t.a11y.casesLabel}>
          <div className="wrap">
            {t.cases.map((c, i) => (
              <article
                key={c.slug}
                className={`cs-case${i % 2 === 1 ? ' cs-case--alt' : ''}`}
                id={c.slug}
              >
                <header className="cs-case-head">
                  <p className="cs-case-index mono micro">
                    {String(i + 1).padStart(2, '0')} / {String(t.cases.length).padStart(2, '0')}
                  </p>
                  <h2 className="cs-case-title">{c.industry}</h2>
                  <p className="cs-case-meta">
                    <span className="cs-case-timeframe">{c.timeframe}</span>
                    <span className="cs-case-divider" aria-hidden="true">·</span>
                    <span className="cs-case-location">{c.location}</span>
                  </p>
                </header>

                <ul className="cs-case-stats">
                  {c.heroStats.map((stat, j) => (
                    <li key={j} className="cs-case-stat">
                      <span className="cs-case-stat-value">{stat.value}</span>
                      <span className="cs-case-stat-label">{stat.label}</span>
                    </li>
                  ))}
                </ul>

                <p className="cs-case-intro">{c.intro}</p>

                <div className="cs-case-strategy">
                  <h3>{c.strategyHeading}</h3>
                  <p>{c.strategyBody}</p>
                </div>

                <div className="cs-case-benefits">
                  {c.keyBenefits.map((b, j) => (
                    <div key={j} className="cs-case-benefit">
                      <p className="cs-case-benefit-title">{b.title}</p>
                      <p className="cs-case-benefit-body">{b.body}</p>
                    </div>
                  ))}
                </div>

                <div className="cs-case-results">
                  <header className="cs-case-results-head">
                    <h3>{c.resultsHeading}</h3>
                  </header>
                  <figure className="cs-case-image">
                    <p className="cs-case-image-eyebrow mono micro">
                      {c.imageEyebrow}
                    </p>
                    <div
                      className={`cs-case-image-strip cs-case-image-strip--${c.images.length}`}
                    >
                      {c.images.map((img, j) => (
                        <div key={j} className="cs-case-image-card">
                          {img.label && (
                            <p className="cs-case-image-card-label mono micro">
                              {img.label}
                            </p>
                          )}
                          {img.fullImage ? (
                            /* Single-image card (e.g. AutoGlass Search
                               Console dashboard) — no chrome to recreate. */
                            <div className="cs-case-image-card-frame">
                              <img
                                src={img.fullImage}
                                alt={img.alt}
                                loading="lazy"
                                decoding="async"
                              />
                            </div>
                          ) : (
                            /* Map card — heatmap image on top, then the
                               recreated SearchAtlas-style chrome below:
                               keyword pill, ranking score, donut + 4-row
                               tier legend. Everything except the map is
                               native HTML so the data is searchable,
                               accessible, and themeable. */
                            <div className="cs-card-rich">
                              <div className="cs-card-map">
                                <img
                                  src={img.map}
                                  alt={img.alt}
                                  loading="lazy"
                                  decoding="async"
                                />
                              </div>
                              <div className="cs-card-meta">
                                <div className="cs-card-keyword">
                                  <span>{img.keyword}</span>
                                  <span
                                    className="cs-card-keyword-caret"
                                    aria-hidden="true"
                                  >
                                    ▾
                                  </span>
                                </div>
                                <p className="cs-card-score-label">
                                  {t.cardLabels.scoreLabel}
                                </p>
                                <p
                                  className={`cs-card-score cs-card-score--${
                                    parseFloat(img.score) < 7 ? 'good' : 'bad'
                                  }`}
                                >
                                  {img.score}
                                </p>
                                <div className="cs-card-donut-row">
                                  <Donut legend={img.legend} />
                                  <ul className="cs-card-legend">
                                    {img.legend.map((s, k) => (
                                      <li
                                        key={k}
                                        className={`cs-card-legend-row cs-card-legend-row--${s.tier}`}
                                      >
                                        <span
                                          className="cs-card-legend-dot"
                                          aria-hidden="true"
                                        />
                                        <span className="cs-card-legend-label">
                                          {t.cardLabels.tiers[s.tier]}
                                        </span>
                                        <span className="cs-card-legend-value">
                                          {t.cardLabels.pins(s.pins)} (
                                          {s.percent}%)
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <figcaption className="cs-case-image-caption">
                      {c.imageCaption}
                    </figcaption>
                  </figure>
                  <ul className="cs-case-bullets">
                    {c.resultsBullets.map((bullet, j) => (
                      <li key={j}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ============================================================
            BRIEF CASES — 4 stat-card extras
            ============================================================ */}
        <section
          className="cs-brief"
          aria-label={t.a11y.briefCasesLabel}
        >
          <div className="wrap">
            <header className="cs-brief-head">
              <span className="eyebrow micro">{t.briefSection.eyebrow}</span>
              <h2>{t.briefSection.heading}</h2>
              <p>{t.briefSection.body}</p>
            </header>

            <ul className="cs-brief-grid">
              {t.briefCases.map((b, i) => (
                <li key={i} className="cs-brief-card">
                  <div className="cs-brief-card-head">
                    <p className="cs-brief-industry">{b.industry}</p>
                    <p className="cs-brief-timeframe mono micro">
                      {b.timeframe}
                    </p>
                  </div>
                  <ul className="cs-brief-stats">
                    {b.stats.map((s, j) => (
                      <li key={j} className="cs-brief-stat">
                        <span className="cs-brief-stat-value">{s.value}</span>
                        <span className="cs-brief-stat-label">{s.label}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="cs-brief-summary">{b.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============================================================
            FINAL CTA — book a strategy call
            ============================================================ */}
        <section className="cs-final blueprint grain">
          <div className="wrap">
            <div className="cs-final-inner">
              <span className="eyebrow micro">{t.finalCta.eyebrow}</span>
              <h2>{t.finalCta.heading}</h2>
              <p>{t.finalCta.body}</p>
              <div className="cs-final-cta">
                <Link
                  to="/strategy-call"
                  className="btn btn-primary"
                  data-cta="strategy-call"
                  data-source="case-studies-final"
                >
                  {t.finalCta.bookLabel}
                </Link>
                <Link
                  to="/free-audit"
                  className="btn btn-outline"
                  data-cta="free-audit"
                  data-source="case-studies-final"
                >
                  {t.finalCta.auditLabel}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            FOOTER — mirrors Landing footer
            ============================================================ */}
        <footer className="footer">
          <div className="wrap">
            <div className="footer-inner">
              <div className="footer-brand">
                <img
                  src="/landing/jm-logo.webp"
                  alt="Jomendez Inc"
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

export default CaseStudies
