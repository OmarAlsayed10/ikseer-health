import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { en, type Translations } from './en'
import { ar } from './ar'

export type Language = 'en' | 'ar'

interface I18nContextValue {
  lang: Language
  t: Translations
  setLang: (lang: Language) => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

const STORAGE_KEY = 'ikseer_lang'

function resolveInitialLang(): Language {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'ar' || stored === 'en') return stored
  const browser = navigator.language.startsWith('ar') ? 'ar' : 'en'
  return browser
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(resolveInitialLang)

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    localStorage.setItem(STORAGE_KEY, newLang)
    document.documentElement.lang = newLang
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr'
  }

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  const t: Translations = lang === 'ar' ? ar : en

  return <I18nContext.Provider value={{ lang, t, setLang }}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
