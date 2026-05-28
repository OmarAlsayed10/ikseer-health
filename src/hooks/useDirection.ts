import { useI18n } from '../i18n'

export type Direction = 'ltr' | 'rtl'

export function useDirection(): Direction {
  const { lang } = useI18n()
  return lang === 'ar' ? 'rtl' : 'ltr'
}
