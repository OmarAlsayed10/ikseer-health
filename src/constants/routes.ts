export const ROUTES = {
  HOME: '/',
  FEATURES: '/features',
  PRICING: '/pricing',
  ABOUT: '/about',
  SUPPORT: '/support',
  CONTACT: '/contact',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
