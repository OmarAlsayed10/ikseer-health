import { Box } from '@chakra-ui/react'
import { Pricing } from '../components/Pricing/Pricing'
import { Support } from '../components/Support/Support'
import { PageHeader } from '../components/UI/PageHeader/PageHeader'
import { useTranslation } from '../hooks/useTranslation'

interface PricingPageProps {
  onRequestAccess: () => void
  onContactSales: () => void
}

export function PricingPage({ onRequestAccess, onContactSales }: PricingPageProps) {
  const { t } = useTranslation()

  return (
    <Box>
      <Box h="68px" />
      <PageHeader
        badge={t.pricing.badge}
        headline={t.pricing.headline}
        subheadline={t.pricing.subheadline}
      />
      <Pricing onRequestAccess={onRequestAccess} onContactSales={onContactSales} />
      <Support onRequestAccess={onRequestAccess} />
    </Box>
  )
}
