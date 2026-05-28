export interface PricingPlan {
  key: 'starter' | 'professional' | 'enterprise'
  name: string
  description: string
  cta: string
  features: string[]
  isPopular?: boolean
  price?: string
}

export interface PricingProps {
  onRequestAccess: () => void
  onContactSales: () => void
}
