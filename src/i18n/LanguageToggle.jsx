import { useLanguage } from './LanguageContext'

/**
 * EN | ES segmented toggle for the nav. The active language is
 * highlighted; clicking the other one switches and persists the choice.
 *
 * `className` lets the caller add placement tweaks (e.g. the mobile
 * menu uses a full-width variant).
 */
const LanguageToggle = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage()

  return (
    <div
      className={`lang-toggle ${className}`.trim()}
      role="group"
      aria-label="Language / Idioma"
    >
      <button
        type="button"
        className={`lang-toggle-btn${language === 'en' ? ' is-active' : ''}`}
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        lang="en"
      >
        EN
      </button>
      <span className="lang-toggle-sep" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        className={`lang-toggle-btn${language === 'es' ? ' is-active' : ''}`}
        onClick={() => setLanguage('es')}
        aria-pressed={language === 'es'}
        lang="es"
      >
        ES
      </button>
    </div>
  )
}

export default LanguageToggle
