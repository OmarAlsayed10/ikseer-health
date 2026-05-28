import { Box, Text, VStack } from '@chakra-ui/react'
import { AppBadge } from '../AppBadge/AppBadge'
import { PAGE_HEADER_TOKENS } from './PageHeader.token'
import type { PageHeaderProps } from './PageHeader.type'

export function PageHeader({ badge, headline, subheadline, align = 'center' }: PageHeaderProps) {
  const isCenter = align === 'center'

  return (
    <Box style={{ background: PAGE_HEADER_TOKENS.bg }} py={PAGE_HEADER_TOKENS.py}>
      <Box maxW="1200px" mx="auto" px={{ base: '20px', md: '40px', lg: '60px' }}>
        <VStack align={isCenter ? 'center' : 'start'} gap="4" textAlign={isCenter ? 'center' : 'start'}>
          {badge && <AppBadge>{badge}</AppBadge>}
          <Text
            as="h1"
            fontSize={PAGE_HEADER_TOKENS.headlineSizes}
            fontWeight={PAGE_HEADER_TOKENS.headlineFontWeight}
            color="gray.900"
            letterSpacing="-0.02em"
            lineHeight="1.15"
          >
            {headline}
          </Text>
          {subheadline && (
            <Text
              fontSize={{ base: '1rem', md: '1.125rem' }}
              color={PAGE_HEADER_TOKENS.subheadlineColor}
              maxW={isCenter ? PAGE_HEADER_TOKENS.subheadlineMaxW : 'none'}
              lineHeight="1.7"
            >
              {subheadline}
            </Text>
          )}
        </VStack>
      </Box>
    </Box>
  )
}
