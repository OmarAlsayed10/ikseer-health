import { Button, Flex, Spinner } from '@chakra-ui/react'
import { BUTTON_TOKENS } from './AppButton.token'
import type { AppButtonProps } from './AppButton.type'

export function AppButton({
  label,
  variant = 'primary',
  size = 'md',
  onClick,
  isLoading = false,
  isDisabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  type = 'button',
  ariaLabel,
}: AppButtonProps) {
  const tokens = BUTTON_TOKENS.variants[variant]
  const sizeTokens = BUTTON_TOKENS.sizes[size]

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      aria-label={ariaLabel ?? label}
      w={fullWidth ? 'full' : 'auto'}
      borderRadius={BUTTON_TOKENS.borderRadius}
      fontWeight={BUTTON_TOKENS.fontWeight}
      transition={BUTTON_TOKENS.transition}
      h={sizeTokens.h}
      px={sizeTokens.px}
      fontSize={sizeTokens.fontSize}
      cursor={isDisabled || isLoading ? 'not-allowed' : 'pointer'}
      opacity={isDisabled ? 0.6 : 1}
      {...tokens}
    >
      {isLoading ? (
        <Flex align="center" gap="2">
          <Spinner size="sm" />
          {label}
        </Flex>
      ) : (
        <Flex align="center" gap="2">
          {leftIcon}
          {label}
          {rightIcon}
        </Flex>
      )}
    </Button>
  )
}
