import { Box } from '@chakra-ui/react'
import { BADGE_TOKENS } from './AppBadge.token'
import type { AppBadgeProps } from './AppBadge.type'

export function AppBadge({ children, variant = 'teal' }: AppBadgeProps) {
  const tokens = BADGE_TOKENS.variants[variant]

  return (
    <Box
      as="span"
      display="inline-block"
      borderRadius={BADGE_TOKENS.borderRadius}
      px={BADGE_TOKENS.px}
      py={BADGE_TOKENS.py}
      fontSize={BADGE_TOKENS.fontSize}
      fontWeight={BADGE_TOKENS.fontWeight}
      letterSpacing={BADGE_TOKENS.letterSpacing}
      textTransform={BADGE_TOKENS.textTransform}
      {...tokens}
    >
      {children}
    </Box>
  )
}
