import type { ButtonVariant, ButtonSize } from './AppButton.type'

export const BUTTON_TOKENS = {
  borderRadius: 'full',
  fontWeight: '600',
  transition: 'all 0.2s ease',
  variants: {
    primary: {
      bg: 'teal.600',
      color: 'white',
      _hover: { bg: 'teal.700', shadow: 'teal' },
      _active: { bg: 'teal.800' },
    },
    secondary: {
      bg: 'teal.50',
      color: 'teal.700',
      _hover: { bg: 'teal.100' },
      _active: { bg: 'teal.200' },
    },
    outline: {
      bg: 'transparent',
      color: 'teal.700',
      border: '1.5px solid',
      borderColor: 'teal.300',
      _hover: { bg: 'teal.50', borderColor: 'teal.400' },
      _active: { bg: 'teal.100' },
    },
    ghost: {
      bg: 'transparent',
      color: 'teal.700',
      _hover: { bg: 'teal.50' },
      _active: { bg: 'teal.100' },
    },
  } satisfies Record<ButtonVariant, object>,
  sizes: {
    sm: { h: '36px', px: '16px', fontSize: '13px' },
    md: { h: '44px', px: '22px', fontSize: '15px' },
    lg: { h: '52px', px: '28px', fontSize: '16px' },
  } satisfies Record<ButtonSize, object>,
} as const
