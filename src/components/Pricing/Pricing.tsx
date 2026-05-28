import { Box, Grid, Text, VStack, HStack, Flex } from '@chakra-ui/react'
import { Check } from 'lucide-react'
import { SectionWrapper } from '../UI/SectionWrapper/SectionWrapper'
import { AppBadge } from '../UI/AppBadge/AppBadge'
import { AppButton } from '../UI/AppButton/AppButton'
import { useTranslation } from '../../hooks/useTranslation'
import { useScrollAnimationGroup } from '../../hooks/useScrollAnimation'
import { PRICING_TOKENS } from './Pricing.token'
import type { PricingProps } from './Pricing.type'

export function Pricing({ onRequestAccess, onContactSales }: PricingProps) {
  const { t } = useTranslation()
  const groupRef = useScrollAnimationGroup<HTMLDivElement>()

  const plans = [
    {
      key: 'starter' as const,
      name: t.pricing.plans.starter.name,
      description: t.pricing.plans.starter.description,
      cta: t.pricing.plans.starter.cta,
      features: t.pricing.plans.starter.features,
      isPopular: false,
    },
    {
      key: 'professional' as const,
      name: t.pricing.plans.professional.name,
      description: t.pricing.plans.professional.description,
      cta: t.pricing.plans.professional.cta,
      features: t.pricing.plans.professional.features,
      isPopular: true,
    },
    {
      key: 'enterprise' as const,
      name: t.pricing.plans.enterprise.name,
      description: t.pricing.plans.enterprise.description,
      cta: t.pricing.plans.enterprise.cta,
      features: t.pricing.plans.enterprise.features,
      isPopular: false,
    },
  ]

  const handleCta = (key: string) => {
    if (key === 'enterprise') {
      onContactSales()
    } else {
      onRequestAccess()
    }
  }

  return (
    <SectionWrapper background="teal" id="pricing">
      <Box ref={groupRef}>
        <Box textAlign="center" mb="12">
          <Box className="animate-fade-up">
            <AppBadge>{t.pricing.badge}</AppBadge>
          </Box>
          <Text
            as="h2"
            mt="4"
            fontSize={{ base: '1.875rem', md: '2.5rem' }}
            fontWeight="700"
            color="gray.900"
            letterSpacing="-0.02em"
            className="animate-fade-up animate-delay-1"
          >
            {t.pricing.headline}
          </Text>
          <Text
            mt="4"
            fontSize={{ base: '1rem', md: '1.125rem' }}
            color="gray.600"
            maxW="520px"
            mx="auto"
            className="animate-fade-up animate-delay-2"
          >
            {t.pricing.subheadline}
          </Text>
        </Box>

        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
          gap="6"
          alignItems="stretch"
        >
          {plans.map((plan) => (
            <Box
              key={plan.key}
              bg="white"
              borderRadius="xl"
              border={plan.isPopular ? PRICING_TOKENS.popularBorderWidth : '1px'}
              borderStyle="solid"
              borderColor={plan.isPopular ? PRICING_TOKENS.popularBorderColor : 'gray.200'}
              shadow={plan.isPopular ? 'lg' : 'sm'}
              p="8"
              display="flex"
              flexDirection="column"
              position="relative"
              className="animate-fade-up"
              transform={plan.isPopular ? { md: 'scale(1.02)' } : undefined}
            >
              {plan.isPopular && (
                <Flex
                  position="absolute"
                  top="-12px"
                  left="50%"
                  transform="translateX(-50%)"
                  bg={PRICING_TOKENS.popularBadgeBg}
                  color={PRICING_TOKENS.popularBadgeColor}
                  px="12px"
                  py="4px"
                  borderRadius="full"
                  fontSize="12px"
                  fontWeight="600"
                  letterSpacing="0.04em"
                  textTransform="uppercase"
                  whiteSpace="nowrap"
                >
                  {t.pricing.mostPopular}
                </Flex>
              )}

              <VStack align="start" gap="2" mb="6">
                <Text fontSize="20px" fontWeight="700" color="gray.900">
                  {plan.name}
                </Text>
                <Text fontSize="14px" color="gray.500">
                  {plan.description}
                </Text>
              </VStack>

              <Box mb="6" py="4" borderTop="1px solid" borderBottom="1px solid" borderColor="gray.100">
                <Text fontSize="14px" color="gray.500" fontStyle="italic">
                  {t.pricing.contactForPricing}
                </Text>
              </Box>

              <VStack align="start" gap="3" flex="1" mb="8">
                {plan.features.map((feature) => (
                  <HStack key={feature} gap="3" align="start">
                    <Box color={PRICING_TOKENS.featureCheckColor} flexShrink={0} mt="1px">
                      <Check size={15} strokeWidth={2.5} />
                    </Box>
                    <Text fontSize={PRICING_TOKENS.featureFontSize} color="gray.600" lineHeight="1.5">
                      {feature}
                    </Text>
                  </HStack>
                ))}
              </VStack>

              <AppButton
                label={plan.cta}
                variant={plan.isPopular ? 'primary' : 'outline'}
                size="md"
                onClick={() => handleCta(plan.key)}
                fullWidth
              />
            </Box>
          ))}
        </Grid>
      </Box>
    </SectionWrapper>
  )
}
