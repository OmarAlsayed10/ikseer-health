import { Box, Grid, Text, HStack, Flex } from '@chakra-ui/react'
import { FiHardDrive, FiLock, FiSmartphone, FiDownload, FiEyeOff } from 'react-icons/fi'
import { SectionWrapper } from '../UI/SectionWrapper/SectionWrapper'
import { AppBadge } from '../UI/AppBadge/AppBadge'
import { useTranslation } from '../../hooks/useTranslation'
import { useScrollAnimationGroup } from '../../hooks/useScrollAnimation'

const ICONS = [FiHardDrive, FiLock, FiSmartphone, FiDownload, FiEyeOff]

export function Security() {
  const { t } = useTranslation()
  const groupRef = useScrollAnimationGroup<HTMLDivElement>()

  return (
    <SectionWrapper background="gray" id="security">
      <Box ref={groupRef}>
        <Box textAlign="center" mb="12">
          <Box className="animate-fade-up">
            <AppBadge>{t.security.badge}</AppBadge>
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
            {t.security.headline}
          </Text>
          <Text
            mt="4"
            fontSize={{ base: '1rem', md: '1.125rem' }}
            color="gray.600"
            maxW="520px"
            mx="auto"
            lineHeight="1.7"
            className="animate-fade-up animate-delay-2"
          >
            {t.security.subheadline}
          </Text>
        </Box>

        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
          gap="5"
          maxW="960px"
          mx="auto"
        >
          {(t.security.items as readonly { title: string; description: string }[]).map(
            (item, i) => {
              const Icon = ICONS[i]
              const isLast = i === 4
              return (
                <Box
                  key={i}
                  bg="white"
                  borderRadius="xl"
                  p="6"
                  border="1px solid"
                  borderColor="gray.200"
                  shadow="sm"
                  className={`animate-fade-up animate-delay-${i + 1}`}
                  gridColumn={isLast ? { base: '1', md: 'span 2', lg: 'auto' } : undefined}
                >
                  <HStack gap="4" mb="3" align="start">
                    <Flex
                      w="40px"
                      h="40px"
                      borderRadius="lg"
                      bg="teal.50"
                      color="teal.600"
                      align="center"
                      justify="center"
                      fontSize="18px"
                      flexShrink={0}
                    >
                      <Icon />
                    </Flex>
                    <Text fontSize="15px" fontWeight="700" color="gray.900" pt="2px">
                      {item.title}
                    </Text>
                  </HStack>
                  <Text fontSize="13.5px" color="gray.600" lineHeight="1.65" ps="52px">
                    {item.description}
                  </Text>
                </Box>
              )
            }
          )}
        </Grid>
      </Box>
    </SectionWrapper>
  )
}
