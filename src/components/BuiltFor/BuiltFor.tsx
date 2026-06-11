import { Box, Grid, Text, VStack, Flex } from '@chakra-ui/react'
import { FiUser, FiUsers, FiMapPin } from 'react-icons/fi'
import { SectionWrapper } from '../UI/SectionWrapper/SectionWrapper'
import { AppBadge } from '../UI/AppBadge/AppBadge'
import { useTranslation } from '../../hooks/useTranslation'
import { useScrollAnimationGroup } from '../../hooks/useScrollAnimation'

const ICONS = [FiUser, FiUsers, FiMapPin]
const ACCENT_COLORS = ['teal', 'blue', 'purple']

export function BuiltFor() {
  const { t } = useTranslation()
  const groupRef = useScrollAnimationGroup<HTMLDivElement>()

  return (
    <SectionWrapper background="gray" id="built-for">
      <Box ref={groupRef}>
        <Box textAlign="center" mb="12">
          <Box className="animate-fade-up">
            <AppBadge>{t.builtFor.badge}</AppBadge>
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
            {t.builtFor.headline}
          </Text>
        </Box>

        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
          gap="6"
          maxW="900px"
          mx="auto"
        >
          {(t.builtFor.items as readonly { title: string; description: string }[]).map(
            (item, i) => {
              const Icon = ICONS[i]
              const color = ACCENT_COLORS[i]
              return (
                <Box
                  key={i}
                  bg="white"
                  borderRadius="2xl"
                  p="8"
                  border="1px solid"
                  borderColor="gray.200"
                  shadow="sm"
                  transition="transform 0.2s ease, box-shadow 0.2s ease"
                  _hover={{ transform: 'translateY(-4px)', shadow: 'md' }}
                  display="flex"
                  flexDirection="column"
                  className={`animate-fade-up animate-delay-${i + 1}`}
                >
                  <Flex
                    w="52px"
                    h="52px"
                    borderRadius="xl"
                    bg={`${color}.50`}
                    color={`${color}.600`}
                    align="center"
                    justify="center"
                    mb="5"
                    fontSize="22px"
                    flexShrink={0}
                  >
                    <Icon />
                  </Flex>
                  <VStack align="start" gap="3" flex="1">
                    <Text fontSize="1.125rem" fontWeight="700" color="gray.900">
                      {item.title}
                    </Text>
                    <Text fontSize="0.9375rem" color="gray.600" lineHeight="1.7">
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
