import { Box, Flex, Grid, Text, VStack, HStack, chakra } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { useTranslation } from '../../hooks/useTranslation'
import { ROUTES } from '../../constants/routes'
import { MEDIA } from '../../constants/media'
import { FOOTER_TOKENS } from './Footer.token'
import type { FooterProps } from './Footer.type'

const Img = chakra('img')
const Anchor = chakra('a')
const NavLink = chakra(Link)

export function Footer({ onRequestAccess }: FooterProps) {
  const { t } = useTranslation()

  const productLinks = [
    { label: t.footer.links.features, to: ROUTES.FEATURES },
    { label: t.footer.links.pricing, to: ROUTES.PRICING },
  ]

  const companyLinks = [
    { label: t.footer.links.about, to: ROUTES.ABOUT },
    { label: t.footer.links.support, to: ROUTES.SUPPORT },
    { label: t.footer.links.contact, to: ROUTES.CONTACT },
  ]

  return (
    <Box as="footer" bg={FOOTER_TOKENS.bg} color={FOOTER_TOKENS.color}>
      <Box maxW="1200px" mx="auto" px={{ base: '20px', md: '40px', lg: '60px' }}>
        <Grid
          templateColumns={{ base: '1fr', md: '2fr 1fr 1fr 1fr' }}
          gap={{ base: '10', md: '12' }}
          py="16"
        >
          <VStack align="start" gap="4">
            <Img src={MEDIA.logo} alt="Ikseer Clinic" h={FOOTER_TOKENS.logoHeight} />
            <Text fontSize={FOOTER_TOKENS.fontSize} lineHeight="1.6" maxW="260px">
              {t.footer.tagline}
            </Text>
            <HStack gap="2" mt="2">
              <Anchor
                href={`mailto:${t.contact.email.value}`}
                display="flex"
                alignItems="center"
                gap="2"
                fontSize="13px"
                color={FOOTER_TOKENS.linkColor}
                textDecoration="none"
                _hover={{ color: FOOTER_TOKENS.linkHoverColor }}
                transition="color 0.15s ease"
              >
                <Mail size={14} />
                {t.contact.email.value}
              </Anchor>
            </HStack>
          </VStack>

          <VStack align="start" gap="3">
            <Text
              fontSize="12px"
              fontWeight="600"
              letterSpacing="0.08em"
              textTransform="uppercase"
              color={FOOTER_TOKENS.headingColor}
            >
              {t.footer.nav.product}
            </Text>
            {productLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                fontSize={FOOTER_TOKENS.fontSize}
                color={FOOTER_TOKENS.linkColor}
                textDecoration="none"
                _hover={{ color: FOOTER_TOKENS.linkHoverColor }}
                transition="color 0.15s ease"
              >
                {link.label}
              </NavLink>
            ))}
          </VStack>

          <VStack align="start" gap="3">
            <Text
              fontSize="12px"
              fontWeight="600"
              letterSpacing="0.08em"
              textTransform="uppercase"
              color={FOOTER_TOKENS.headingColor}
            >
              {t.footer.nav.company}
            </Text>
            {companyLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                fontSize={FOOTER_TOKENS.fontSize}
                color={FOOTER_TOKENS.linkColor}
                textDecoration="none"
                _hover={{ color: FOOTER_TOKENS.linkHoverColor }}
                transition="color 0.15s ease"
              >
                {link.label}
              </NavLink>
            ))}
          </VStack>

          <VStack align="start" gap="3">
            <Text
              fontSize="12px"
              fontWeight="600"
              letterSpacing="0.08em"
              textTransform="uppercase"
              color={FOOTER_TOKENS.headingColor}
            >
              {t.footer.nav.legal}
            </Text>
            <NavLink
              to="/privacy"
              fontSize={FOOTER_TOKENS.fontSize}
              color={FOOTER_TOKENS.linkColor}
              textDecoration="none"
              _hover={{ color: FOOTER_TOKENS.linkHoverColor }}
              transition="color 0.15s ease"
            >
              {t.footer.links.privacy}
            </NavLink>
            <NavLink
              to="/terms"
              fontSize={FOOTER_TOKENS.fontSize}
              color={FOOTER_TOKENS.linkColor}
              textDecoration="none"
              _hover={{ color: FOOTER_TOKENS.linkHoverColor }}
              transition="color 0.15s ease"
            >
              {t.footer.links.terms}
            </NavLink>
          </VStack>
        </Grid>

        <Flex
          borderTop="1px solid"
          borderColor={FOOTER_TOKENS.borderColor}
          py="6"
          justify="space-between"
          align="center"
          direction={{ base: 'column', md: 'row' }}
          gap="3"
        >
          <Text fontSize="13px" color="gray.500">
            {t.footer.copyright}
          </Text>
          <Box
            as="button"
            onClick={onRequestAccess}
            fontSize="13px"
            color="teal.400"
            fontWeight="500"
            cursor="pointer"
            bg="transparent"
            border="none"
            _hover={{ color: 'teal.300' }}
            transition="color 0.15s ease"
          >
            {t.nav.requestAccess} →
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}
