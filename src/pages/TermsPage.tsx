import { Box } from '@chakra-ui/react'
import { PageHeader } from '../components/UI/PageHeader/PageHeader'
import { LegalContent } from '../components/UI/LegalContent/LegalContent'
import { useTranslation } from '../hooks/useTranslation'

export function TermsPage() {
  const { t } = useTranslation()

  return (
    <Box>
      <Box h="68px" />
      <PageHeader
        badge={t.terms.badge}
        headline={t.terms.headline}
        align="left"
      />
      <LegalContent
        effectiveDate={t.terms.effectiveDate}
        lastUpdated={t.terms.lastUpdated}
        sections={t.terms.sections}
      />
    </Box>
  )
}
