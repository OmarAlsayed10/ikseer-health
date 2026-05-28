import { Box, Text, VStack } from '@chakra-ui/react'
import { AppButton } from '../UI/AppButton/AppButton'
import { useTranslation } from '../../hooks/useTranslation'
import { useScrollAnimationGroup } from '../../hooks/useScrollAnimation'
import { CTA_BANNER_TOKENS } from './CTABanner.token'
import type { CTABannerProps } from './CTABanner.type'

export function CTABanner({ onRequestAccess }: CTABannerProps) {
  const { t } = useTranslation()
  const groupRef = useScrollAnimationGroup<HTMLDivElement>()

  return (
    <Box style={{ background: CTA_BANNER_TOKENS.bg }} py={CTA_BANNER_TOKENS.py}>
      <Box maxW="1200px" mx="auto" px={{ base: '20px', md: '40px', lg: '60px' }}>
        <VStack gap="6" textAlign="center" ref={groupRef}>
          <Text
            as="h2"
            fontSize={{ base: '2rem', md: '2.75rem' }}
            fontWeight="800"
            color={CTA_BANNER_TOKENS.headlineColor}
            letterSpacing="-0.02em"
            lineHeight="1.15"
            maxW="600px"
            className="animate-fade-up"
          >
            {t.hero.headline}
          </Text>
          <Text
            fontSize={{ base: '1rem', md: '1.125rem' }}
            color={CTA_BANNER_TOKENS.subColor}
            maxW="480px"
            lineHeight="1.7"
            className="animate-fade-up animate-delay-1"
          >
            {t.hero.subheadline}
          </Text>
          <Box className="animate-fade-up animate-delay-2">
            <AppButton
              label={t.hero.primaryCta}
              variant="secondary"
              size="lg"
              onClick={onRequestAccess}
            />
          </Box>
        </VStack>
      </Box>
    </Box>
  )
}
