import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './en.json'
import pt from './pt.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'pt'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'sma-lang',
    },
  })

// Sync <html lang="…"> whenever language changes.
// Screen readers use this to select the correct voice engine.
// Google uses it for language targeting.
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
})
// Set initial value
document.documentElement.lang = i18n.language || 'en'

export default i18n
export const SUPPORTED_LANGS = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'pt', label: 'PT', name: 'Português' },
]
