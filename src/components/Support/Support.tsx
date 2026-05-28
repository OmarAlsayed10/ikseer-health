import { useState } from 'react'
import { Box, Text, VStack, Flex, Grid } from '@chakra-ui/react'
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react'
import { SectionWrapper } from '../UI/SectionWrapper/SectionWrapper'
import { AppBadge } from '../UI/AppBadge/AppBadge'
import { AppButton } from '../UI/AppButton/AppButton'
import { useTranslation } from '../../hooks/useTranslation'
import { useScrollAnimationGroup } from '../../hooks/useScrollAnimation'
import { SUPPORT_TOKENS } from './Support.token'
import type { SupportProps } from './Support.type'

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(index === 0)

  return (
    <Box
      border="1px solid"
      borderColor={isOpen ? 'teal.200' : SUPPORT_TOKENS.faqItemBorderColor}
      borderRadius={SUPPORT_TOKENS.faqItemBorderRadius}
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
            fontWeight={SUPPORT_TOKENS.faqQuestionFontWeight}
            color={isOpen ? 'teal.700' : 'gray.900'}
            transition="color 0.2s ease"
            textAlign="start"
          >
            {question}
          </Text>
          <Box color={SUPPORT_TOKENS.faqIconColor} flexShrink={0}>
            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </Box>
        </Flex>
      </Box>

      {isOpen && (
        <Box px="6" pb="5">
          <Box h="1px" bg="gray.100" mb="4" />
          <Text
            fontSize="14px"
            color={SUPPORT_TOKENS.faqAnswerColor}
            lineHeight={SUPPORT_TOKENS.faqAnswerLineHeight}
          >
            {answer}
          </Text>
        </Box>
      )}
    </Box>
  )
}

export function Support({ onRequestAccess }: SupportProps) {
  const { t } = useTranslation()
  const groupRef = useScrollAnimationGroup<HTMLDivElement>()

  return (
    <SectionWrapper background="white" id="support">
      <Box ref={groupRef}>
        <Grid templateColumns={{ base: '1fr', lg: '5fr 7fr' }} gap={{ base: '12', lg: '16' }}>
          <Box>
            <Box className="animate-fade-up">
              <AppBadge>{t.support.badge}</AppBadge>
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
              {t.support.headline}
            </Text>
            <Text
              mt="4"
              fontSize={{ base: '1rem', md: '1.0625rem' }}
              color="gray.600"
              lineHeight="1.7"
              className="animate-fade-up animate-delay-2"
            >
              {t.support.subheadline}
            </Text>

            <Box mt="8" className="animate-fade-up animate-delay-3">
              <Box
                p="6"
                bg="teal.50"
                borderRadius="xl"
                border="1px solid"
                borderColor="teal.100"
              >
                <Flex align="center" gap="3" mb="3">
                  <Box color="teal.600">
                    <MessageCircle size={20} />
                  </Box>
                  <Text fontWeight="600" color="gray.900" fontSize="15px">
                    {t.support.contactHeadline}
                  </Text>
                </Flex>
                <Text fontSize="14px" color="gray.600" mb="4">
                  {t.support.contactSubheadline}
                </Text>
                <AppButton
                  label={t.nav.requestAccess}
                  variant="primary"
                  size="sm"
                  onClick={onRequestAccess}
                />
              </Box>
            </Box>
          </Box>

          <Box>
            <Text
              fontSize="18px"
              fontWeight="700"
              color="gray.900"
              mb="6"
              className="animate-fade-up"
            >
              {t.support.faq.headline}
            </Text>
            <VStack gap="3">
              {(t.support.faq.items as readonly { q: string; a: string }[]).map((item, i) => (
                <FAQItem
                  key={i}
                  question={item.q}
                  answer={item.a}
                  index={i}
                />
              ))}
            </VStack>
          </Box>
        </Grid>
      </Box>
    </SectionWrapper>
  )
}
