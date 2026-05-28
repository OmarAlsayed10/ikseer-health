import { Box } from '@chakra-ui/react'
import { Contact } from '../components/Contact/Contact'
import { Support } from '../components/Support/Support'
import { PageHeader } from '../components/UI/PageHeader/PageHeader'
import { useTranslation } from '../hooks/useTranslation'

interface ContactPageProps {
  onRequestAccess: () => void
}

export function ContactPage({ onRequestAccess }: ContactPageProps) {
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
      <Support onRequestAccess={onRequestAccess} />
    </Box>
  )
}
