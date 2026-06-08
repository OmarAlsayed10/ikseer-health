export interface PricingPlan {
  key: 'free' | 'starter' | 'professional' | 'enterprise'
  name: string
  description: string
  cta: string
  features: string[]
  isPopular?: boolean
  isFree?: boolean
  price?: string
}

export interface PricingProps {
  onRequestAccess: () => void
  onContactSales: () => void
}
