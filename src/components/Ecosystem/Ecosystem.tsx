import { Box, Text, VStack, HStack, Flex, Grid } from '@chakra-ui/react'
import { FiMonitor, FiActivity, FiPackage, FiPlus, FiArrowRight } from 'react-icons/fi'
import { SectionWrapper } from '../UI/SectionWrapper/SectionWrapper'
import { AppBadge } from '../UI/AppBadge/AppBadge'
import { useTranslation } from '../../hooks/useTranslation'
import { useScrollAnimationGroup } from '../../hooks/useScrollAnimation'

const PRODUCT_ICONS = [FiMonitor, FiActivity, FiPackage, FiPlus]

type ProductStatus = 'live' | 'soon' | 'future'

const STATUS_STYLES: Record<ProductStatus, { badge: string; badgeText: string; border: string; iconBg: string; iconColor: string; opacity: number }> = {
  live: {
    badge: 'teal.500',
    badgeText: 'white',
    border: 'teal.200',
    iconBg: 'teal.50',
    iconColor: 'teal.600',
    opacity: 1,
  },
  soon: {
    badge: 'gray.700',
    badgeText: 'white',
    border: 'gray.200',
    iconBg: 'gray.100',
    iconColor: 'gray.500',
    opacity: 0.85,
  },
  future: {
    badge: 'gray.300',
    badgeText: 'gray.700',
    border: 'gray.150',
    iconBg: 'gray.50',
    iconColor: 'gray.400',
    opacity: 0.65,
  },
}

export function Ecosystem() {
  const { t } = useTranslation()
  const groupRef = useScrollAnimationGroup<HTMLDivElement>()

  const products = t.ecosystem.products as readonly {
    status: ProductStatus
    statusLabel: string
    title: string
    description: string
  }[]

  return (
    <SectionWrapper background="white" id="ecosystem">
      <Box ref={groupRef}>
        <Box textAlign="center" mb="14">
          <Box className="animate-fade-up">
            <AppBadge variant="teal">{t.ecosystem.badge}</AppBadge>
          </Box>
          <Text
            as="h2"
            mt="4"
            fontSize={{ base: '1.875rem', md: '2.625rem' }}
            fontWeight="800"
            color="gray.900"
            letterSpacing="-0.025em"
            lineHeight="1.2"
            maxW="680px"
            mx="auto"
            className="animate-fade-up animate-delay-1"
          >
            {t.ecosystem.headline}
          </Text>
          <Text
            mt="5"
            fontSize={{ base: '1rem', md: '1.125rem' }}
            color="gray.600"
            maxW="600px"
            mx="auto"
            lineHeight="1.75"
            className="animate-fade-up animate-delay-2"
          >
            {t.ecosystem.subheadline}
          </Text>
        </Box>

        {/* Products connected display */}
        <Box position="relative" mb="10" className="animate-fade-up animate-delay-3">
          <Grid
            templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
            gap="0"
            maxW="1000px"
            mx="auto"
            position="relative"
          >
            {/* Connector line — large desktop only */}
            <Box
              display={{ base: 'none', lg: 'block' }}
              position="absolute"
              top="36px"
              left="calc(12.5% + 26px)"
              right="calc(12.5% + 26px)"
              h="2px"
              bg="linear-gradient(90deg, #0FACBE 0%, #CBD5E0 60%, #CBD5E0 100%)"
              zIndex={0}
            />

            {products.map((product, i) => {
              const Icon = PRODUCT_ICONS[i]
              const style = STATUS_STYLES[product.status]
              return (
                <VStack
                  key={product.title}
                  gap="0"
                  align="center"
                  px={{ base: '0', md: '4' }}
                  mb={{ base: '6', md: '0' }}
                  opacity={style.opacity}
                  position="relative"
                  zIndex={1}
                >
                  {/* Icon circle */}
                  <Flex
                    w="72px"
                    h="72px"
                    borderRadius="full"
                    bg={style.iconBg}
                    color={style.iconColor}
                    align="center"
                    justify="center"
                    border="2px solid"
                    borderColor={style.border}
                    fontSize="26px"
                    mb="4"
                    flexShrink={0}
                  >
                    <Icon />
                  </Flex>

                  {/* Status badge */}
                  <Box
                    px="10px"
                    py="3px"
                    borderRadius="full"
                    bg={style.badge}
                    mb="3"
                    display="inline-block"
                  >
                    <Text fontSize="11px" fontWeight="600" color={style.badgeText} letterSpacing="0.04em" textTransform="uppercase">
                      {product.statusLabel}
                    </Text>
                  </Box>

                  <Text fontSize="1.125rem" fontWeight="700" color="gray.900" mb="2" textAlign="center">
                    {product.title}
                  </Text>
                  <Text fontSize="13px" color="gray.500" lineHeight="1.6" textAlign="center">
                    {product.description}
                  </Text>
                </VStack>
              )
            })}
          </Grid>
        </Box>

        {/* Strip */}
        <Box
          bg="teal.600"
          borderRadius="2xl"
          px={{ base: '6', md: '10' }}
          py="5"
          maxW="860px"
          mx="auto"
          className="animate-fade-up animate-delay-4"
        >
          <HStack justify="center" flexWrap="wrap" gap={{ base: '3', md: '0' }}>
            {(t.ecosystem.strip as string).split(' · ').map((item, i, arr) => (
              <HStack key={item} gap="0" flexShrink={0}>
                <Text fontSize={{ base: '13px', md: '14px' }} fontWeight="600" color="white" textAlign="center">
                  {item}
                </Text>
                {i < arr.length - 1 && (
                  <Box color="teal.200" mx="3" display={{ base: 'none', md: 'flex' }} alignItems="center">
                    <FiArrowRight size={14} />
                  </Box>
                )}
              </HStack>
            ))}
          </HStack>
        </Box>
      </Box>
    </SectionWrapper>
  )
}
