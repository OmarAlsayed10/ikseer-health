import type { ReactNode } from 'react'

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled'

export interface AppCardProps {
  children: ReactNode
  variant?: CardVariant
  isHoverable?: boolean
  padding?: string | number
  className?: string
  onClick?: () => void
}
