import { Box, Grid, Text, HStack } from '@chakra-ui/react'
import { Play } from 'lucide-react'
import { AppButton } from '../UI/AppButton/AppButton'
import { AppBadge } from '../UI/AppBadge/AppBadge'
import { useTranslation } from '../../hooks/useTranslation'
import { useScrollAnimationGroup } from '../../hooks/useScrollAnimation'
import { HeroVisual } from './HeroVisual'
import { HERO_TOKENS } from './Hero.token'
import type { HeroProps } from './Hero.type'

export function Hero({ onRequestAccess, onWatchDemo }: HeroProps) {
  const { t } = useTranslation()
  const groupRef = useScrollAnimationGroup<HTMLDivElement>()

  return (
    <Box
      as="section"
      minH={HERO_TOKENS.minHeight}
      display="flex"
      alignItems="center"
      pt="68px"
      bg="white"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        inset="0"
        style={{ background: HERO_TOKENS.gradientBg }}
        pointerEvents="none"
        aria-hidden
      />

      <Box maxW="1200px" mx="auto" px={{ base: '20px', md: '40px', lg: '60px' }} w="full">
        <Grid
          ref={groupRef}
          templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
          gap={{ base: '12', lg: '16' }}
          alignItems="center"
          py={{ base: '14', md: '20' }}
        >
          <Box>
            <Box className="animate-fade-up">
              <AppBadge variant={HERO_TOKENS.badgeVariant}>{t.hero.badge}</AppBadge>
            </Box>

            <Text
              as="h1"
              mt="5"
              fontSize={HERO_TOKENS.headlineSizes}
              fontWeight={HERO_TOKENS.headlineFontWeight}
              lineHeight={HERO_TOKENS.headlineLineHeight}
              color="gray.900"
              letterSpacing="-0.02em"
              className="animate-fade-up animate-delay-1"
            >
              {t.hero.headline}
            </Text>

            <Text
              mt="6"
              fontSize={HERO_TOKENS.subheadlineSizes}
              color={HERO_TOKENS.subheadlineColor}
              lineHeight="1.75"
              maxW={HERO_TOKENS.subheadlineMaxW}
              className="animate-fade-up animate-delay-2"
            >
              {t.hero.subheadline}
            </Text>

            <HStack
              mt="8"
              gap="3"
              flexWrap="wrap"
              className="animate-fade-up animate-delay-3"
            >
              <AppButton
                label={t.hero.primaryCta}
                variant="primary"
                size="lg"
                onClick={onRequestAccess}
              />
              <AppButton
                label={t.hero.secondaryCta}
                variant="outline"
                size="lg"
                onClick={onWatchDemo}
                leftIcon={<Play size={16} />}
              />
            </HStack>

            <HStack
              mt="6"
              gap="2"
              className="animate-fade-up animate-delay-4"
              flexWrap="wrap"
              align="baseline"
            >
              <Text fontSize="13px" color="gray.500">
                {t.hero.priceHook.prefix}
              </Text>
              <Text fontSize="1.25rem" fontWeight="700" color="teal.700" lineHeight="1">
                {t.hero.priceHook.amount}
              </Text>
              <Text fontSize="13px" color="gray.500">
                {t.hero.priceHook.suffix}
              </Text>
            </HStack>

            {/*
              Stats hidden until we have real numbers to publish.
              <HStack mt="12" gap="8" className="animate-fade-up animate-delay-4" flexWrap="wrap">
                {[
                  { value: '2+', label: t.hero.stats.clinics },
                  { value: '100+', label: t.hero.stats.appointments },
                  { value: '99.9%', label: t.hero.stats.uptime },
                ].map((stat) => (
                  <VStack key={stat.label} align="start" gap="0">
                    <Text fontSize="1.75rem" fontWeight="700" color="teal.700" lineHeight="1">
                      {stat.value}
                    </Text>
                    <Text fontSize="13px" color="gray.500" mt="1">
                      {stat.label}
                    </Text>
                  </VStack>
                ))}
              </HStack>
            */}
          </Box>

          <Box
            display={{ base: 'none', lg: 'block' }}
            className="animate-fade-in animate-delay-2"
          >
            <HeroVisual />
          </Box>
        </Grid>
      </Box>
    </Box>
  )
}

