import { useI18n } from '../i18n'

export function useTranslation() {
  const { t, lang, setLang } = useI18n()
  return { t, lang, setLang }
}
