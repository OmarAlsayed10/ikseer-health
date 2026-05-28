import { useState, useEffect } from 'react'
import { Box, Flex, HStack, VStack, chakra } from '@chakra-ui/react'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { AppButton } from '../UI/AppButton/AppButton'
import { LanguageSwitch } from '../UI/LanguageSwitch/LanguageSwitch'
import { useTranslation } from '../../hooks/useTranslation'
import { ROUTES } from '../../constants/routes'
import { MEDIA } from '../../constants/media'
import { NAVBAR_TOKENS } from './Navbar.token'
import type { NavbarProps } from './Navbar.type'

const Img = chakra('img')
const NavLink = chakra(Link)

export function Navbar({ onRequestAccess }: NavbarProps) {
  const { t } = useTranslation()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const navLinks = [
    { label: t.nav.home, to: ROUTES.HOME },
    { label: t.nav.features, to: ROUTES.FEATURES },
    { label: t.nav.pricing, to: ROUTES.PRICING },
    { label: t.nav.about, to: ROUTES.ABOUT },
    { label: t.nav.support, to: ROUTES.SUPPORT },
    { label: t.nav.contact, to: ROUTES.CONTACT },
  ]

  return (
    <Box
      as="header"
      position="fixed"
      top="0"
      insetX="0"
      zIndex={NAVBAR_TOKENS.zIndex}
      bg={isScrolled ? NAVBAR_TOKENS.scrolledBg : NAVBAR_TOKENS.bg}
      borderBottom="1px solid"
      borderColor={isScrolled ? 'gray.200' : NAVBAR_TOKENS.borderColor}
      backdropFilter={isScrolled ? NAVBAR_TOKENS.scrolledBlur : 'none'}
      transition="all 0.3s ease"
      shadow={isScrolled ? 'sm' : 'none'}
    >
      <Box maxW="1200px" mx="auto" px={{ base: '20px', md: '40px', lg: '60px' }}>
        <Flex h={NAVBAR_TOKENS.height} align="center" justify="space-between">
          <NavLink to={ROUTES.HOME} aria-label="Nabd Clinic Home" textDecoration="none">
            <Img src={MEDIA.logo} alt="Nabd Clinic" h={NAVBAR_TOKENS.logoHeight} />
          </NavLink>

          <HStack gap="0" display={{ base: 'none', lg: 'flex' }}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  px="16px"
                  py="8px"
                  fontSize={NAVBAR_TOKENS.linkFontSize}
                  fontWeight={NAVBAR_TOKENS.linkFontWeight}
                  color={isActive ? NAVBAR_TOKENS.activeLinkColor : 'gray.600'}
                  bg={isActive ? NAVBAR_TOKENS.activeLinkBg : 'transparent'}
                  borderRadius="lg"
                  textDecoration="none"
                  _hover={{ color: NAVBAR_TOKENS.linkHoverColor, bg: NAVBAR_TOKENS.linkHoverBg }}
                  transition="all 0.15s ease"
                >
                  {link.label}
                </NavLink>
              )
            })}
          </HStack>

          <HStack gap="3" display={{ base: 'none', lg: 'flex' }}>
            <LanguageSwitch variant="pill" />
            <AppButton
              label={t.nav.requestAccess}
              variant="primary"
              size="sm"
              onClick={onRequestAccess}
            />
          </HStack>

          <HStack gap="2" display={{ base: 'flex', lg: 'none' }}>
            <LanguageSwitch variant="icon" />
            <Box
              as="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              p="2"
              color="gray.600"
              borderRadius="md"
              cursor="pointer"
              border="none"
              bg="transparent"
              _hover={{ color: 'teal.700', bg: 'teal.50' }}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </Box>
          </HStack>
        </Flex>
      </Box>

      {isOpen && (
        <Box
          borderTop="1px solid"
          borderColor="gray.100"
          bg="white"
          shadow="lg"
          display={{ base: 'block', lg: 'none' }}
        >
          <Box maxW="1200px" mx="auto" px="20px">
            <VStack align="stretch" py="4" gap="1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    px="4"
                    py="3"
                    fontSize="15px"
                    fontWeight="500"
                    color={isActive ? 'teal.700' : 'gray.700'}
                    bg={isActive ? 'teal.50' : 'transparent'}
                    borderRadius="lg"
                    textDecoration="none"
                    _hover={{ color: 'teal.700', bg: 'teal.50' }}
                    transition="all 0.15s ease"
                  >
                    {link.label}
                  </NavLink>
                )
              })}
              <Box pt="3" pb="2">
                <AppButton
                  label={t.nav.requestAccess}
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setIsOpen(false)
                    onRequestAccess()
                  }}
                  fullWidth
                />
              </Box>
            </VStack>
          </Box>
        </Box>
      )}
    </Box>
  )
}
