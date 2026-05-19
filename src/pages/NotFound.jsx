import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import baseStylesCss from './Landing.styles.css?raw'
import pageStylesCss from './NotFound.styles.css?raw'
import { useContent } from '../i18n/LanguageContext'

/**
 * 404 page — rendered by the catch-all <Route path="*"> in App.jsx for
 * any URL that doesn't match a real route.
 *
 * Bilingual via the i18n engine; the copy is small enough to keep in a
 * local content object rather than its own content module.
 *
 * Adds a `robots: noindex` meta tag while mounted so a not-found page
 * doesn't get indexed. (The HTTP status is still 200 — the SPA host
 * rewrites every path to index.html; returning a true 404 status is a
 * separate hosting-config change.)
 */

const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap'

const notFoundContent = {
  en: {
    title: 'Page not found — Jomendez Inc',
    heading: 'This page doesn’t exist.',
    body: 'The link may be broken, or the page may have moved.',
    cta: 'Back to home',
    homeLink: 'Jomendez Inc home',
  },
  es: {
    title: 'Página no encontrada — Jomendez Inc',
    heading: 'Esta página no existe.',
    body: 'Puede que el enlace esté roto o que la página se haya movido.',
    cta: 'Volver al inicio',
    homeLink: 'Inicio de Jomendez Inc',
  },
}

const NotFound = () => {
  const t = useContent(notFoundContent)

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

  // Tab title + a noindex robots tag — both removed on unmount so other
  // routes are unaffected.
  useEffect(() => {
    const prevTitle = document.title
    document.title = t.title

    const robots = document.createElement('meta')
    robots.name = 'robots'
    robots.content = 'noindex'
    document.head.appendChild(robots)

    return () => {
      document.title = prevTitle
      robots.parentNode && robots.parentNode.removeChild(robots)
    }
  }, [t.title])

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <style>{baseStylesCss}</style>
      <style>{pageStylesCss}</style>

      {/* NAV — brand only */}
      <nav className="nav scrolled" aria-label="Primary">
        <div className="nav-inner">
          <Link to="/" className="nav-logo" aria-label={t.homeLink}>
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
        </div>
      </nav>

      <main className="nf-main">
        <div className="wrap nf-wrap">
          <span className="nf-code">404</span>
          <h1 className="nf-heading">{t.heading}</h1>
          <p className="nf-body">{t.body}</p>
          <Link to="/" className="btn btn-primary">
            {t.cta}
          </Link>
        </div>
      </main>
    </>
  )
}

export default NotFound
