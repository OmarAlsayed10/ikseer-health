import type { ReactNode } from 'react'

export type BadgeVariant = 'teal' | 'white' | 'dark'

export interface AppBadgeProps {
  children: ReactNode
  variant?: BadgeVariant
}
