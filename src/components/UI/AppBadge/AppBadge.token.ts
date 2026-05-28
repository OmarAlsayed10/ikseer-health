import type { BadgeVariant } from './AppBadge.type'

export const BADGE_TOKENS = {
  borderRadius: 'full',
  px: '14px',
  py: '5px',
  fontSize: '12px',
  fontWeight: '600',
  letterSpacing: '0.04em',
  textTransform: 'uppercase' as const,
  variants: {
    teal: {
      bg: 'teal.50',
      color: 'teal.700',
      border: '1px solid',
      borderColor: 'teal.200',
    },
    white: {
      bg: 'rgba(255,255,255,0.15)',
      color: 'white',
      border: '1px solid rgba(255,255,255,0.25)',
    },
    dark: {
      bg: 'gray.100',
      color: 'gray.600',
      border: '1px solid',
      borderColor: 'gray.200',
    },
  } satisfies Record<BadgeVariant, object>,
} as const
