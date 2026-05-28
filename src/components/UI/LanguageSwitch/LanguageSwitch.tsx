import { Flex, Box } from '@chakra-ui/react'
import { useTranslation } from '../../../hooks/useTranslation'
import { LANG_SWITCH_TOKENS } from './LanguageSwitch.token'
import type { LanguageSwitchProps } from './LanguageSwitch.type'

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'عر' },
] as const

export function LanguageSwitch({ variant = 'pill' }: LanguageSwitchProps) {
  const { lang, setLang } = useTranslation()

  if (variant === 'icon') {
    const next = lang === 'en' ? 'ar' : 'en'
    const nextLabel = lang === 'en' ? 'عر' : 'EN'
    return (
      <Box
        as="button"
        onClick={() => setLang(next)}
        aria-label={`Switch to ${next === 'ar' ? 'Arabic' : 'English'}`}
        fontSize={LANG_SWITCH_TOKENS.fontSize}
        fontWeight={LANG_SWITCH_TOKENS.fontWeight}
        color="teal.700"
        px="3"
        py="1"
        borderRadius="md"
        _hover={{ bg: 'teal.50' }}
        transition={LANG_SWITCH_TOKENS.transition}
        cursor="pointer"
        border="none"
        bg="transparent"
      >
        {nextLabel}
      </Box>
    )
  }

  return (
    <Flex
      bg={LANG_SWITCH_TOKENS.bg}
      borderRadius={LANG_SWITCH_TOKENS.borderRadius}
      p="2px"
      gap="0"
      role="group"
      aria-label="Language selector"
    >
      {LANGUAGES.map(({ code, label }) => (
        <Box
          key={code}
          as="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          borderRadius={LANG_SWITCH_TOKENS.borderRadius}
          px={LANG_SWITCH_TOKENS.px}
          py={LANG_SWITCH_TOKENS.py}
          fontSize={LANG_SWITCH_TOKENS.fontSize}
          fontWeight={LANG_SWITCH_TOKENS.fontWeight}
          color={lang === code ? LANG_SWITCH_TOKENS.activeColor : LANG_SWITCH_TOKENS.inactiveColor}
          bg={lang === code ? LANG_SWITCH_TOKENS.activeBg : 'transparent'}
          transition={LANG_SWITCH_TOKENS.transition}
          cursor="pointer"
          border="none"
          _hover={lang !== code ? { color: 'gray.800' } : undefined}
        >
          {label}
        </Box>
      ))}
    </Flex>
  )
}
