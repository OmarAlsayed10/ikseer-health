import { Box } from '@chakra-ui/react'
import { CARD_TOKENS } from './AppCard.token'
import type { AppCardProps } from './AppCard.type'

export function AppCard({
  children,
  variant = 'default',
  isHoverable = false,
  padding = 6,
  className,
  onClick,
}: AppCardProps) {
  const tokens = CARD_TOKENS.variants[variant]

  return (
    <Box
      p={padding}
      borderRadius={CARD_TOKENS.borderRadius}
      transition={CARD_TOKENS.transition}
      cursor={onClick || isHoverable ? 'pointer' : 'default'}
      className={className}
      onClick={onClick}
      _hover={
        isHoverable || onClick
          ? {
              shadow: CARD_TOKENS.hover.shadow,
              transform: CARD_TOKENS.hover.transform,
              borderColor: CARD_TOKENS.hover.borderColor,
            }
          : undefined
      }
      {...tokens}
    >
      {children}
    </Box>
  )
}
