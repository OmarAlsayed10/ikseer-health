import { useState } from 'react'
import { Box, Text, VStack, Flex, HStack } from '@chakra-ui/react'
import { FiChevronDown, FiChevronUp, FiArrowRight } from 'react-icons/fi'
import { SectionWrapper } from '../UI/SectionWrapper/SectionWrapper'
import { AppBadge } from '../UI/AppBadge/AppBadge'
import { AppButton } from '../UI/AppButton/AppButton'
import { useTranslation } from '../../hooks/useTranslation'
import { useScrollAnimationGroup } from '../../hooks/useScrollAnimation'
import { ROUTES } from '../../constants/routes'
import { useNavigate } from 'react-router-dom'

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(index === 0)

  return (
    <Box
      border="1px solid"
      borderColor={isOpen ? 'teal.200' : 'gray.200'}
      borderRadius="xl"
      overflow="hidden"
      transition="border-color 0.2s ease"
      bg="white"
    >
      <Box
        as="button"
        w="full"
        textAlign="start"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        bg="transparent"
        border="none"
        cursor="pointer"
        px="6"
        py="5"
      >
        <Flex justify="space-between" align="center" gap="4">
          <Text
            fontSize="15px"
            fontWeight="600"
            color={isOpen ? 'teal.700' : 'gray.900'}
            transition="color 0.2s ease"
            textAlign="start"
          >
            {question}
          </Text>
          <Box color="gray.400" flexShrink={0}>
            {isOpen ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
          </Box>
        </Flex>
      </Box>

      {isOpen && (
        <Box px="6" pb="5">
          <Box h="1px" bg="gray.100" mb="4" />
          <Text fontSize="14px" color="gray.600" lineHeight="1.7">
            {answer}
          </Text>
        </Box>
      )}
    </Box>
  )
}

export function HomeFAQ() {
  const { t } = useTranslation()
  const groupRef = useScrollAnimationGroup<HTMLDivElement>()
  const navigate = useNavigate()

  return (
    <SectionWrapper background="white" id="home-faq">
      <Box ref={groupRef}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'start', md: 'center' }}
          mb="10"
          gap="4"
        >
          <Box>
            <Box className="animate-fade-up">
              <AppBadge>{t.homeFaq.badge}</AppBadge>
            </Box>
            <Text
              as="h2"
              mt="4"
              fontSize={{ base: '1.875rem', md: '2.25rem' }}
              fontWeight="700"
              color="gray.900"
              letterSpacing="-0.02em"
              className="animate-fade-up animate-delay-1"
            >
              {t.homeFaq.headline}
            </Text>
          </Box>

          <HStack
            as="button"
            gap="2"
            color="teal.600"
            fontWeight="600"
            fontSize="14px"
            cursor="pointer"
            bg="transparent"
            border="none"
            flexShrink={0}
            onClick={() => navigate(ROUTES.SUPPORT)}
            _hover={{ color: 'teal.700' }}
            transition="color 0.15s ease"
            className="animate-fade-up animate-delay-2"
          >
            <Text>{t.homeFaq.viewAll}</Text>
            <FiArrowRight size={15} />
          </HStack>
        </Flex>

        <VStack gap="3" maxW="780px" mx="auto">
          {(t.homeFaq.items as readonly { q: string; a: string }[]).map((item, i) => (
            <FAQItem key={i} question={item.q} answer={item.a} index={i} />
          ))}
        </VStack>

        <Flex justify="center" mt="8" className="animate-fade-up">
          <AppButton
            label={t.homeFaq.viewAll}
            variant="outline"
            size="sm"
            onClick={() => navigate(ROUTES.SUPPORT)}
            rightIcon={<FiArrowRight size={14} />}
          />
        </Flex>
      </Box>
    </SectionWrapper>
  )
}
