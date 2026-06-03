import { Box, Text } from '@chakra-ui/react'
import { SectionWrapper } from '../UI/SectionWrapper/SectionWrapper'
import { AppBadge } from '../UI/AppBadge/AppBadge'
import { VideoPlayer } from '../UI/VideoPlayer/VideoPlayer'
import { useTranslation } from '../../hooks/useTranslation'
import { useScrollAnimationGroup } from '../../hooks/useScrollAnimation'
import { MEDIA } from '../../constants/media'
import type { VideoDemoProps } from './VideoDemo.type'

export function VideoDemo({ onRequestAccess: _ }: VideoDemoProps) {
  const { t } = useTranslation()
  const groupRef = useScrollAnimationGroup<HTMLDivElement>()

  const overview = {
    label: t.videoDemo.chapters.overview,
    src: MEDIA.demos.overview,
    thumbnail: MEDIA.hero.mockup,
  }

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

        <Box maxW="900px" w="full" mx="auto" mt="8" className="animate-fade-up animate-delay-3">
          <VideoPlayer
            src={overview.src}
            thumbnail={overview.thumbnail}
            title={overview.label}
          />
        </Box>
      </Box>
    </SectionWrapper>
  )
}
