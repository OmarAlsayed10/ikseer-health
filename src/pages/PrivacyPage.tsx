import { Box } from '@chakra-ui/react'
import { PageHeader } from '../components/UI/PageHeader/PageHeader'
import { LegalContent } from '../components/UI/LegalContent/LegalContent'
import { useTranslation } from '../hooks/useTranslation'

export function PrivacyPage() {
  const { t } = useTranslation()

  return (
    <Box>
      <Box h="68px" />
      <PageHeader
        badge={t.privacy.badge}
        headline={t.privacy.headline}
        align="left"
      />
      <LegalContent
        effectiveDate={t.privacy.effectiveDate}
        lastUpdated={t.privacy.lastUpdated}
        sections={t.privacy.sections}
      />
    </Box>
  )
}
