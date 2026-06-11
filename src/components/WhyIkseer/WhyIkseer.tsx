import { Box, Grid, Text, VStack } from '@chakra-ui/react'
import { FiWifiOff, FiGlobe, FiLayers } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { SectionWrapper } from '../UI/SectionWrapper/SectionWrapper'
import { AppBadge } from '../UI/AppBadge/AppBadge'
import { useTranslation } from '../../hooks/useTranslation'
import { useScrollAnimationGroup } from '../../hooks/useScrollAnimation'

const ICONS = [FiWifiOff, FiGlobe, FaWhatsapp, FiLayers]

export function WhyIkseer() {
  const { t } = useTranslation()
  const groupRef = useScrollAnimationGroup<HTMLDivElement>()

  return (
    <SectionWrapper background="white" id="why-ikseer">
      <Box ref={groupRef}>
        <Box textAlign="center" mb="12">
          <Box className="animate-fade-up">
            <AppBadge>{t.whyIkseer.badge}</AppBadge>
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
            {t.whyIkseer.headline}
          </Text>
          <Text
            mt="4"
            fontSize={{ base: '1rem', md: '1.125rem' }}
            color="gray.500"
            maxW="480px"
            mx="auto"
            className="animate-fade-up animate-delay-2"
          >
            {t.whyIkseer.subheadline}
          </Text>
        </Box>

        <Grid
          templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
          gap="6"
        >
          {(t.whyIkseer.items as readonly { title: string; description: string }[]).map(
            (item, i) => {
              const Icon = ICONS[i]
              return (
                <Box
                  key={i}
                  bg="gray.50"
                  borderRadius="2xl"
                  p="6"
                  border="1px solid"
                  borderColor="gray.100"
                  transition="border-color 0.2s ease, box-shadow 0.2s ease"
                  _hover={{ borderColor: 'teal.200', shadow: 'sm' }}
                  className={`animate-fade-up animate-delay-${i + 1}`}
                >
                  <Box
                    w="44px"
                    h="44px"
                    borderRadius="xl"
                    bg="teal.50"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="teal.600"
                    mb="4"
                    fontSize="20px"
                  >
                    <Icon />
                  </Box>
                  <VStack align="start" gap="2">
                    <Text fontSize="15px" fontWeight="700" color="gray.900">
                      {item.title}
                    </Text>
                    <Text fontSize="14px" color="gray.600" lineHeight="1.65">
                      {item.description}
                    </Text>
                  </VStack>
                </Box>
              )
            }
          )}
        </Grid>
      </Box>
    </SectionWrapper>
  )
}
