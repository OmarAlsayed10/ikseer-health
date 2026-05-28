import type { HTMLInputTypeAttribute } from 'react'

export interface AppInputProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: HTMLInputTypeAttribute
  error?: string
  isDisabled?: boolean
  isRequired?: boolean
  helperText?: string
}

export interface AppTextareaProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  isDisabled?: boolean
  isRequired?: boolean
  rows?: number
  helperText?: string
}
