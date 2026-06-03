import { Box } from '@chakra-ui/react'
import { Contact } from '../components/Contact/Contact'
import { PageHeader } from '../components/UI/PageHeader/PageHeader'
import { useTranslation } from '../hooks/useTranslation'

export function ContactPage() {
  const { t } = useTranslation()

  return (
    <Box>
      <Box h="68px" />
      <PageHeader
        badge={t.contact.badge}
        headline={t.contact.headline}
        subheadline={t.contact.subheadline}
      />
      <Contact />
    </Box>
  )
}
