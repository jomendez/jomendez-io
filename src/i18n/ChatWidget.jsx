import { useEffect } from 'react'
import { useLanguage } from './LanguageContext'

/**
 * GoHighLevel chat widget, loaded language-conditionally.
 *
 * There are two GHL chat widgets — one English, one Spanish. The
 * matching one is loaded once, on first mount, based on the active
 * language (the i18n engine resolves that from a saved choice or the
 * browser preference). The loader script is appended imperatively,
 * the same pattern used for the other GHL embeds.
 *
 * The widget is picked at page load. If a visitor flips the language
 * toggle mid-session, the chat widget keeps the page-load language
 * until the next full page load — the new choice is persisted, so any
 * later visit or refresh loads the right widget. GHL provides no clean
 * way to swap an already-initialized chat widget in place.
 */

// GHL chat widget IDs, per language.
const WIDGET_IDS = {
  en: '6a056524f7ab4175e3a00f93',
  es: '6a0b918d51fd5b999ae69995',
}

// Module-level guard: load the widget exactly once per page load, even
// if the component re-mounts (e.g. React StrictMode in development).
let chatWidgetLoaded = false

const ChatWidget = () => {
  const { language } = useLanguage()

  useEffect(() => {
    if (chatWidgetLoaded) return
    chatWidgetLoaded = true

    const script = document.createElement('script')
    script.src = 'https://beta.leadconnectorhq.com/loader.js'
    script.setAttribute(
      'data-resources-url',
      'https://beta.leadconnectorhq.com/chat-widget/loader.js',
    )
    script.setAttribute('data-widget-id', WIDGET_IDS[language] || WIDGET_IDS.en)
    document.body.appendChild(script)
  }, [language])

  return null
}

export default ChatWidget
