import { Box, Input, Textarea, Text, chakra } from '@chakra-ui/react'
import { INPUT_TOKENS } from './AppInput.token'
import type { AppInputProps, AppTextareaProps } from './AppInput.type'

const Label = chakra('label')

function FieldLabel({
  htmlFor,
  children,
  isRequired,
}: {
  htmlFor: string
  children: string
  isRequired?: boolean
}) {
  return (
    <Label
      htmlFor={htmlFor}
      display="block"
      mb="1.5"
      fontSize={INPUT_TOKENS.labelFontSize}
      fontWeight={INPUT_TOKENS.labelFontWeight}
      color={INPUT_TOKENS.labelColor}
    >
      {children}
      {isRequired && (
        <Text as="span" color="red.500" ms="1">
          *
        </Text>
      )}
    </Label>
  )
}

export function AppInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
  isDisabled = false,
  isRequired = false,
  helperText,
}: AppInputProps) {
  const hasError = Boolean(error)

  return (
    <Box>
      <FieldLabel htmlFor={id} isRequired={isRequired}>
        {label}
      </FieldLabel>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={isDisabled}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        borderRadius={INPUT_TOKENS.borderRadius}
        h={INPUT_TOKENS.height}
        fontSize={INPUT_TOKENS.fontSize}
        bg={INPUT_TOKENS.bg}
        borderColor={hasError ? INPUT_TOKENS.errorBorderColor : INPUT_TOKENS.borderColor}
        _focus={{
          borderColor: hasError ? INPUT_TOKENS.errorBorderColor : INPUT_TOKENS.focusBorderColor,
          boxShadow: hasError
            ? '0 0 0 3px rgba(229,53,53,0.12)'
            : '0 0 0 3px rgba(13,152,170,0.12)',
          outline: 'none',
        }}
        _placeholder={{ color: 'gray.400' }}
        _disabled={{ opacity: 0.6, cursor: 'not-allowed' }}
      />
      {hasError && (
        <Text
          id={`${id}-error`}
          mt="1.5"
          fontSize={INPUT_TOKENS.errorFontSize}
          color="red.500"
          role="alert"
        >
          {error}
        </Text>
      )}
      {!hasError && helperText && (
        <Text
          id={`${id}-helper`}
          mt="1.5"
          fontSize={INPUT_TOKENS.helperFontSize}
          color={INPUT_TOKENS.helperColor}
        >
          {helperText}
        </Text>
      )}
    </Box>
  )
}

export function AppTextarea({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  isDisabled = false,
  isRequired = false,
  rows = 4,
  helperText,
}: AppTextareaProps) {
  const hasError = Boolean(error)

  return (
    <Box>
      <FieldLabel htmlFor={id} isRequired={isRequired}>
        {label}
      </FieldLabel>
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={isDisabled}
        rows={rows}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        borderRadius={INPUT_TOKENS.borderRadius}
        fontSize={INPUT_TOKENS.fontSize}
        bg={INPUT_TOKENS.bg}
        borderColor={hasError ? INPUT_TOKENS.errorBorderColor : INPUT_TOKENS.borderColor}
        resize="vertical"
        minH="120px"
        _focus={{
          borderColor: hasError ? INPUT_TOKENS.errorBorderColor : INPUT_TOKENS.focusBorderColor,
          boxShadow: hasError
            ? '0 0 0 3px rgba(229,53,53,0.12)'
            : '0 0 0 3px rgba(13,152,170,0.12)',
          outline: 'none',
        }}
        _placeholder={{ color: 'gray.400' }}
        _disabled={{ opacity: 0.6, cursor: 'not-allowed' }}
      />
      {hasError && (
        <Text
          id={`${id}-error`}
          mt="1.5"
          fontSize={INPUT_TOKENS.errorFontSize}
          color="red.500"
          role="alert"
        >
          {error}
        </Text>
      )}
      {!hasError && helperText && (
        <Text
          id={`${id}-helper`}
          mt="1.5"
          fontSize={INPUT_TOKENS.helperFontSize}
          color={INPUT_TOKENS.helperColor}
        >
          {helperText}
        </Text>
      )}
    </Box>
  )
}
