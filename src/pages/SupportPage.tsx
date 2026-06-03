import { Box } from '@chakra-ui/react'
import { Support } from '../components/Support/Support'
import { PageHeader } from '../components/UI/PageHeader/PageHeader'
import { useTranslation } from '../hooks/useTranslation'

interface SupportPageProps {
  onRequestAccess: () => void
}

export function SupportPage({ onRequestAccess }: SupportPageProps) {
  const { t } = useTranslation()

  return (
    <Box>
      <Box h="68px" />
      <PageHeader
        badge={t.support.badge}
        headline={t.support.headline}
        subheadline={t.support.subheadline}
      />
      <Support onRequestAccess={onRequestAccess} />
    </Box>
  )
}
