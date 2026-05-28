import { useState, useRef, useEffect } from 'react'
import { Box, Flex, Input, Text, chakra } from '@chakra-ui/react'
import { ChevronDown, Check } from 'lucide-react'
import { COUNTRIES, findCountry } from '../../../constants/countries'
import { useTranslation } from '../../../hooks/useTranslation'
import { INPUT_TOKENS } from '../AppInput/AppInput.token'
import { PHONE_INPUT_TOKENS } from './PhoneInput.token'
import type { PhoneInputProps } from './PhoneInput.type'

const Label = chakra('label')
const Btn = chakra('button')

export function PhoneInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  isRequired,
  isDisabled,
}: PhoneInputProps) {
  const { lang } = useTranslation()
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const hasError = Boolean(error)
  const country = findCountry(value.countryIso2) ?? COUNTRIES[0]

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const setCountry = (iso2: string) => {
    onChange({ ...value, countryIso2: iso2 })
    setOpen(false)
  }

  const maxDigits = Math.max(...country.nationalLength) + 1

  const setNumber = (next: string) => {
    const digits = next.replace(/\D/g, '').slice(0, maxDigits)
    onChange({ ...value, nationalNumber: digits })
  }

  return (
    <Box>
      <Label
        htmlFor={id}
        display="block"
        mb="1.5"
        fontSize={INPUT_TOKENS.labelFontSize}
        fontWeight={INPUT_TOKENS.labelFontWeight}
        color={INPUT_TOKENS.labelColor}
      >
        {label}
        {isRequired && (
          <Text as="span" color="red.500" ms="1">
            *
          </Text>
        )}
      </Label>

      <Flex ref={wrapRef} position="relative" gap="2" align="stretch" dir="ltr">
        <Box position="relative" flexShrink={0}>
          <Btn
            type="button"
            onClick={() => !isDisabled && setOpen((o) => !o)}
            disabled={isDisabled}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-label={`${label} country code`}
            w={PHONE_INPUT_TOKENS.triggerWidth}
            h={PHONE_INPUT_TOKENS.triggerHeight}
            px="3"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap="2"
            bg={PHONE_INPUT_TOKENS.triggerBg}
            border="1px solid"
            borderColor={
              hasError
                ? PHONE_INPUT_TOKENS.triggerErrorBorderColor
                : open
                  ? PHONE_INPUT_TOKENS.triggerFocusBorderColor
                  : PHONE_INPUT_TOKENS.triggerBorderColor
            }
            borderRadius={INPUT_TOKENS.borderRadius}
            cursor={isDisabled ? 'not-allowed' : 'pointer'}
            _hover={{ borderColor: isDisabled ? undefined : 'teal.400' }}
            _disabled={{ opacity: 0.6 }}
            transition="border-color 0.15s ease"
          >
            <Flex align="center" gap="2">
              <Text as="span" fontSize={PHONE_INPUT_TOKENS.flagFontSize} lineHeight="1">
                {country.flag}
              </Text>
              <Text
                as="span"
                fontSize={PHONE_INPUT_TOKENS.codeFontSize}
                fontWeight={PHONE_INPUT_TOKENS.codeFontWeight}
                color={PHONE_INPUT_TOKENS.codeColor}
              >
                {country.code}
              </Text>
            </Flex>
            <Box color="gray.500" transform={open ? 'rotate(180deg)' : undefined} transition="transform 0.15s ease">
              <ChevronDown size={16} />
            </Box>
          </Btn>

          {open && (
            <Box
              position="absolute"
              top="calc(100% + 6px)"
              insetStart="0"
              zIndex={20}
              minW="260px"
              maxH={PHONE_INPUT_TOKENS.menuMaxH}
              overflowY="auto"
              bg="white"
              borderRadius="lg"
              border="1px solid"
              borderColor="gray.200"
              shadow="lg"
              role="listbox"
              py="1"
            >
              {COUNTRIES.map((c) => {
                const selected = c.iso2 === country.iso2
                return (
                  <Btn
                    type="button"
                    key={c.iso2}
                    onClick={() => setCountry(c.iso2)}
                    role="option"
                    aria-selected={selected}
                    w="full"
                    px="3"
                    py="2"
                    display="flex"
                    alignItems="center"
                    gap="3"
                    bg={selected ? 'teal.50' : 'transparent'}
                    cursor="pointer"
                    textAlign="start"
                    _hover={{ bg: PHONE_INPUT_TOKENS.menuItemHoverBg }}
                    border="none"
                  >
                    <Text as="span" fontSize="18px" lineHeight="1">
                      {c.flag}
                    </Text>
                    <Text as="span" flex="1" fontSize="14px" color="gray.800">
                      {lang === 'ar' ? c.nameAr : c.nameEn}
                    </Text>
                    <Text as="span" fontSize="13px" color="gray.500" fontWeight="600">
                      {c.code}
                    </Text>
                    {selected && (
                      <Box color="teal.600">
                        <Check size={14} />
                      </Box>
                    )}
                  </Btn>
                )
              })}
            </Box>
          )}
        </Box>

        <Input
          id={id}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          value={value.nationalNumber}
          onChange={(e) => setNumber(e.target.value)}
          placeholder={placeholder}
          maxLength={maxDigits}
          disabled={isDisabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          flex="1"
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
      </Flex>

      {hasError && (
        <Text id={`${id}-error`} mt="1.5" fontSize={INPUT_TOKENS.errorFontSize} color="red.500" role="alert">
          {error}
        </Text>
      )}
    </Box>
  )
}
