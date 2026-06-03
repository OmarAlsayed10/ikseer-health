import { HStack, Text, chakra } from '@chakra-ui/react'
import { useTranslation } from '../../hooks/useTranslation'
import { CONFIG } from '../../constants/config'

const Anchor = chakra('a')

const WHATSAPP_GREEN = '#25D366'
const WHATSAPP_GREEN_HOVER = '#1DA851'

export function WhatsAppButton() {
  const { t, lang } = useTranslation()
  const isRtl = lang === 'ar'

  const href = `https://wa.me/${CONFIG.contact.whatsapp}`

  return (
    <Anchor
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.ariaLabel}
      position="fixed"
      bottom={{ base: '16px', md: '24px' }}
      {...(isRtl
        ? { left: { base: '16px', md: '24px' } }
        : { right: { base: '16px', md: '24px' } })}
      zIndex={1000}
      bg={WHATSAPP_GREEN}
      color="white"
      borderRadius="full"
      px={{ base: '14px', md: '18px' }}
      py={{ base: '10px', md: '12px' }}
      boxShadow="0 8px 20px rgba(37, 211, 102, 0.35)"
      transition="background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease"
      _hover={{
        bg: WHATSAPP_GREEN_HOVER,
        transform: 'translateY(-2px)',
        boxShadow: '0 10px 24px rgba(37, 211, 102, 0.45)',
        textDecoration: 'none',
      }}
      _focusVisible={{
        outline: '2px solid white',
        outlineOffset: '2px',
      }}
    >
      <HStack gap="8px" align="center">
        <WhatsAppIcon />
        <Text
          fontSize={{ base: '13px', md: '14px' }}
          fontWeight="600"
          display={{ base: 'none', sm: 'inline' }}
          lineHeight="1"
        >
          {t.whatsapp.label}
        </Text>
      </HStack>
    </Anchor>
  )
}

function WhatsAppIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.11 17.36c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.34.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.08.15.2 2.09 3.2 5.07 4.48.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.34zm-5.42 7.43h-.01a11 11 0 01-5.6-1.54l-.4-.24-4.16 1.09 1.11-4.06-.26-.42a11.06 11.06 0 011.71-13.46A11.04 11.04 0 0123.5 8.85a11.03 11.03 0 01-9.81 15.94zm9.39-20.43A13.18 13.18 0 0013.69 1c-7.27 0-13.19 5.91-13.2 13.18a13.16 13.16 0 001.76 6.6L0 28l7.4-1.94a13.2 13.2 0 006.29 1.6h.01c7.27 0 13.18-5.91 13.19-13.18a13.1 13.1 0 00-3.86-9.32z" />
    </svg>
  )
}
