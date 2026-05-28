import { Box } from '@chakra-ui/react'
import { SECTION_TOKENS } from './SectionWrapper.token'
import type { SectionWrapperProps } from './SectionWrapper.type'

export function SectionWrapper({
  children,
  background = 'white',
  py,
  id,
  fullWidth = false,
}: SectionWrapperProps) {
  const bgTokens = SECTION_TOKENS.backgrounds[background]

  return (
    <Box as="section" id={id} py={py ?? SECTION_TOKENS.defaultPy} {...bgTokens}>
      {fullWidth ? (
        children
      ) : (
        <Box maxW={SECTION_TOKENS.containerMaxW} mx="auto" px={SECTION_TOKENS.containerPx}>
          {children}
        </Box>
      )}
    </Box>
  )
}
