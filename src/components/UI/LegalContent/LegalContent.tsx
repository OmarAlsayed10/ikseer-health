import { Box, Flex, Text, VStack, List } from '@chakra-ui/react'
import { LEGAL_TOKENS } from './LegalContent.token'
import type { LegalContentProps } from './LegalContent.type'

export function LegalContent({ effectiveDate, lastUpdated, sections }: LegalContentProps) {
  return (
    <Box py={{ base: '40px', md: '64px' }}>
      <Box maxW="1200px" mx="auto" px={{ base: '20px', md: '40px', lg: '60px' }}>
        {/* Effective & Last Updated dates */}
        <Flex
          gap={{ base: '2', md: '6' }}
          direction={{ base: 'column', md: 'row' }}
          mb={{ base: '8', md: '12' }}
        >
          <Text fontSize={LEGAL_TOKENS.effectiveDateSize} color={LEGAL_TOKENS.effectiveDateColor}>
            <Text as="span" fontWeight="600" color="gray.700">{effectiveDate.split(':')[0]}:</Text>{' '}
            {effectiveDate.split(':').slice(1).join(':').trim()}
          </Text>
          <Text fontSize={LEGAL_TOKENS.effectiveDateSize} color={LEGAL_TOKENS.effectiveDateColor}>
            <Text as="span" fontWeight="600" color="gray.700">{lastUpdated.split(':')[0]}:</Text>{' '}
            {lastUpdated.split(':').slice(1).join(':').trim()}
          </Text>
        </Flex>

        {/* Sections */}
        <VStack align="stretch" gap={LEGAL_TOKENS.sectionGap}>
          {sections.map((section, index) => (
            <Box
              key={index}
              bg={LEGAL_TOKENS.cardBg}
              border="1px solid"
              borderColor={LEGAL_TOKENS.cardBorder}
              borderRadius="16px"
              boxShadow={LEGAL_TOKENS.cardShadow}
              p={{ base: '24px', md: '32px' }}
              transition="box-shadow 0.2s ease, transform 0.2s ease"
              _hover={{
                boxShadow: '0 4px 12px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.04)',
                transform: 'translateY(-1px)',
              }}
            >
              <Flex align="center" gap="3" mb="4">
                <Flex
                  align="center"
                  justify="center"
                  w="36px"
                  h="36px"
                  borderRadius="10px"
                  bg={LEGAL_TOKENS.sectionNumberBg}
                  flexShrink={0}
                >
                  <Text
                    fontSize="14px"
                    fontWeight="700"
                    color={LEGAL_TOKENS.sectionNumberColor}
                  >
                    {index + 1}
                  </Text>
                </Flex>
                <Text
                  as="h2"
                  fontSize={LEGAL_TOKENS.headingSize}
                  fontWeight="700"
                  color={LEGAL_TOKENS.headingColor}
                  letterSpacing="-0.01em"
                >
                  {section.title}
                </Text>
              </Flex>

              <VStack align="stretch" gap="3" pl={{ base: '0', md: '48px' }}>
                {section.paragraphs?.map((p, i) => (
                  <Text
                    key={i}
                    fontSize={LEGAL_TOKENS.bodySize}
                    color={LEGAL_TOKENS.bodyColor}
                    lineHeight="1.75"
                  >
                    {p}
                  </Text>
                ))}

                {section.bullets && section.bullets.length > 0 && (
                  <List.Root gap="2" pl="4">
                    {section.bullets.map((item, i) => (
                      <List.Item
                        key={i}
                        fontSize={LEGAL_TOKENS.bodySize}
                        color={LEGAL_TOKENS.listColor}
                        lineHeight="1.75"
                        _marker={{ color: LEGAL_TOKENS.bulletColor }}
                      >
                        {item}
                      </List.Item>
                    ))}
                  </List.Root>
                )}
              </VStack>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  )
}
