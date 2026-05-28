import type { CardVariant } from './AppCard.type'

export const CARD_TOKENS = {
  borderRadius: 'xl',
  transition: 'box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease',
  variants: {
    default: {
      bg: 'white',
      border: '1px solid',
      borderColor: 'gray.200',
      shadow: 'sm',
    },
    elevated: {
      bg: 'white',
      shadow: 'md',
      border: 'none',
    },
    outlined: {
      bg: 'white',
      border: '1.5px solid',
      borderColor: 'teal.200',
      shadow: 'none',
    },
    filled: {
      bg: 'teal.25',
      border: '1px solid',
      borderColor: 'teal.100',
      shadow: 'none',
    },
  } satisfies Record<CardVariant, object>,
  hover: {
    shadow: 'lg',
    transform: 'translateY(-2px)',
    borderColor: 'teal.200',
  },
} as const
