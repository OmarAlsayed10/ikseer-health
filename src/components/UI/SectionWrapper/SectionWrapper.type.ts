import type { ReactNode } from 'react'

export type SectionBackground = 'white' | 'gray' | 'teal' | 'dark'

export interface SectionWrapperProps {
  children: ReactNode
  background?: SectionBackground
  py?: string | number
  id?: string
  fullWidth?: boolean
}
