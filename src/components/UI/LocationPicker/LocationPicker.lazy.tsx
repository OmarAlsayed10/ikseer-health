import { lazy, Suspense } from 'react'
import { Box, Flex, Spinner, Text } from '@chakra-ui/react'
import { useTranslation } from '../../../hooks/useTranslation'
import { LOCATION_PICKER_TOKENS } from './LocationPicker.token'
import type { LocationPickerProps } from './LocationPicker.type'

const LocationPickerInner = lazy(() => import('./LocationPicker'))

function Fallback({ height }: { height?: string }) {
  const { t } = useTranslation()
  return (
    <Flex
      h={height ?? LOCATION_PICKER_TOKENS.mapHeight}
      w="full"
      align="center"
      justify="center"
      gap="3"
      borderRadius={LOCATION_PICKER_TOKENS.mapBorderRadius}
      border="1px solid"
      borderColor={LOCATION_PICKER_TOKENS.mapBorderColor}
      bg="gray.50"
    >
      <Spinner size="md" color="teal.500" />
      <Text fontSize="14px" color="gray.500">
        {t.common.loading}
      </Text>
    </Flex>
  )
}

export function LocationPickerLazy(props: LocationPickerProps) {
  return (
    <Box>
      <Suspense fallback={<Fallback height={props.height} />}>
        <LocationPickerInner {...props} />
      </Suspense>
    </Box>
  )
}
