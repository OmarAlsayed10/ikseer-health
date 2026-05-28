import { useState } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { SectionWrapper } from '../UI/SectionWrapper/SectionWrapper'
import { AppBadge } from '../UI/AppBadge/AppBadge'
import { VideoPlayer } from '../UI/VideoPlayer/VideoPlayer'
import { useTranslation } from '../../hooks/useTranslation'
import { useScrollAnimationGroup } from '../../hooks/useScrollAnimation'
import { MEDIA } from '../../constants/media'
import { VIDEO_DEMO_TOKENS } from './VideoDemo.token'
import type { VideoDemoProps } from './VideoDemo.type'

type Chapter = 'overview' | 'appointments' | 'billing'

export function VideoDemo({ onRequestAccess: _ }: VideoDemoProps) {
  const { t } = useTranslation()
  const [activeChapter, setActiveChapter] = useState<Chapter>('overview')
  const groupRef = useScrollAnimationGroup<HTMLDivElement>()

  const chapters: { key: Chapter; label: string; src: string; thumbnail?: string }[] = [
    {
      key: 'overview',
      label: t.videoDemo.chapters.overview,
      src: MEDIA.demos.overview,
      thumbnail: MEDIA.hero.mockup,
    },
    {
      key: 'appointments',
      label: t.videoDemo.chapters.appointments,
      src: MEDIA.demos.appointment,
    },
    {
      key: 'billing',
      label: t.videoDemo.chapters.billing,
      src: MEDIA.demos.billing,
    },
  ]

  const active = chapters.find((c) => c.key === activeChapter)!

  return (
    <SectionWrapper background="gray" id="demo">
      <Box ref={groupRef} textAlign="center">
        <Box className="animate-fade-up">
          <AppBadge>{t.videoDemo.badge}</AppBadge>
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
          {t.videoDemo.headline}
        </Text>
        <Text
          mt="4"
          fontSize={{ base: '1rem', md: '1.125rem' }}
          color="gray.600"
          maxW="600px"
          mx="auto"
          className="animate-fade-up animate-delay-2"
        >
          {t.videoDemo.subheadline}
        </Text>

        <Box
          mt="8"
          mb="8"
          maxW="full"
          overflowX="auto"
          className="animate-fade-up animate-delay-3"
          css={{ scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}
        >
          <Flex justify={{ base: 'flex-start', md: 'center' }} minW="min-content" px="4px">
            <Flex
              bg="gray.100"
              borderRadius="full"
              p="4px"
              gap="2px"
              flexShrink={0}
            >
              {chapters.map((chapter) => (
                <Box
                  key={chapter.key}
                  as="button"
                  onClick={() => setActiveChapter(chapter.key)}
                  px={{ base: '12px', md: '16px' }}
                  py="8px"
                  borderRadius="full"
                  fontSize={VIDEO_DEMO_TOKENS.tabFontSize}
                  fontWeight={VIDEO_DEMO_TOKENS.tabFontWeight}
                  bg={activeChapter === chapter.key ? VIDEO_DEMO_TOKENS.tabActiveBg : VIDEO_DEMO_TOKENS.tabInactiveBg}
                  color={activeChapter === chapter.key ? VIDEO_DEMO_TOKENS.tabActiveColor : VIDEO_DEMO_TOKENS.tabInactiveColor}
                  shadow={activeChapter === chapter.key ? VIDEO_DEMO_TOKENS.tabActiveShadow : 'none'}
                  border="none"
                  cursor="pointer"
                  transition="all 0.2s ease"
                  whiteSpace="nowrap"
                >
                  {chapter.label}
                </Box>
              ))}
            </Flex>
          </Flex>
        </Box>

        <Box maxW="900px" w="full" mx="auto" className="animate-fade-up animate-delay-4">
          <VideoPlayer
            key={activeChapter}
            src={active.src}
            thumbnail={active.thumbnail}
            title={active.label}
          />
        </Box>
      </Box>
    </SectionWrapper>
  )
}
