import type { ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface AppButtonProps {
  label: string
  variant?: ButtonVariant
  size?: ButtonSize
  onClick?: () => void
  isLoading?: boolean
  isDisabled?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
}
