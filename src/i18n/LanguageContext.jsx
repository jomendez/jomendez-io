import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

/**
 * Lightweight translation engine — no external dependency.
 *
 * Two languages: English ('en') and Spanish ('es'). The active language
 * is resolved once on first load:
 *   1. an explicit choice the visitor saved previously (localStorage)
 *   2. otherwise the browser's preferred language (navigator.language)
 *   3. otherwise English
 *
 * Once the visitor picks a language from the nav toggle, that choice is
 * persisted and always wins on future visits.
 *
 * Page copy lives in per-page content modules under src/i18n/content/.
 * Each module exports `{ en: {...}, es: {...} }`; a component reads its
 * slice with the `useContent(module)` hook.
 */

const STORAGE_KEY = 'jm_lang'
const SUPPORTED = ['en', 'es']
const DEFAULT_LANG = 'en'

// Resolve the initial language: saved choice → browser preference →
// English. Wrapped in try/catch because localStorage throws in some
// privacy modes.
function detectInitialLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (SUPPORTED.includes(saved)) return saved
  } catch {
    /* localStorage unavailable — fall through to browser detection */
  }

  const nav =
    (typeof navigator !== 'undefined' &&
      (navigator.language ||
        (navigator.languages && navigator.languages[0]))) ||
    ''
  if (nav.toLowerCase().startsWith('es')) return 'es'

  return DEFAULT_LANG
}

const LanguageContext = createContext(null)

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(detectInitialLanguage)

  // Keep the document <html lang> attribute in sync — matters for
  // screen readers and search engines.
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const setLanguage = useCallback((lang) => {
    if (!SUPPORTED.includes(lang)) return
    setLanguageState(lang)
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* persistence is best-effort — the in-memory choice still applies */
    }
  }, [])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Access the active language + the setter (used by the nav toggle).
export const useLanguage = () => {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within <LanguageProvider>')
  }
  return ctx
}

// Pick the active-language slice of a content module. Falls back to
// English if a language slice is missing, so a partially-translated
// module degrades gracefully instead of crashing.
export const useContent = (contentModule) => {
  const { language } = useLanguage()
  return contentModule[language] || contentModule.en
}

export { SUPPORTED as SUPPORTED_LANGUAGES }
