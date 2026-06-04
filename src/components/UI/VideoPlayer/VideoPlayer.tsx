import { useState, useRef, useEffect } from 'react'
import { Box, AspectRatio } from '@chakra-ui/react'
import { Play, Pause } from 'lucide-react'
import { VIDEO_TOKENS } from './VideoPlayer.token'
import type { VideoPlayerProps } from './VideoPlayer.type'

export function VideoPlayer({
  src,
  thumbnail,
  title,
  autoPlay = false,
  muted = true,
  aspectRatio = '16/9',
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [showOverlay, setShowOverlay] = useState(!autoPlay)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (autoPlay && videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [autoPlay])

  const toggle = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
      setIsPlaying(true)
      setShowOverlay(false)
    } else {
      video.pause()
      setIsPlaying(false)
      setShowOverlay(true)
    }
  }

  if (autoPlay) {
    return (
      <Box
        borderRadius={VIDEO_TOKENS.borderRadius}
        overflow="hidden"
        shadow={VIDEO_TOKENS.shadow}
        position="relative"
        pointerEvents="none"
      >
        <AspectRatio ratio={aspectRatio === '16/9' ? 16 / 9 : aspectRatio === '4/3' ? 4 / 3 : 1}>
          <video
            ref={videoRef}
            src={src}
            muted
            playsInline
            loop
            autoPlay
            title={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </AspectRatio>
      </Box>
    )
  }

  return (
    <Box
      borderRadius={VIDEO_TOKENS.borderRadius}
      overflow="hidden"
      shadow={VIDEO_TOKENS.shadow}
      position="relative"
      cursor="pointer"
      onClick={toggle}
      role="button"
      aria-label={isPlaying ? 'Pause video' : 'Play video'}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle() }}
    >
      <AspectRatio ratio={aspectRatio === '16/9' ? 16 / 9 : aspectRatio === '4/3' ? 4 / 3 : 1}>
        <video
          ref={videoRef}
          src={src}
          poster={thumbnail}
          muted={muted}
          playsInline
          loop
          autoPlay={autoPlay}
          title={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </AspectRatio>

      {showOverlay && (
        <Box
          position="absolute"
          inset="0"
          bg={VIDEO_TOKENS.overlayBg}
          display="flex"
          alignItems="center"
          justifyContent="center"
          transition="opacity 0.2s ease"
        >
          <Box
            w={VIDEO_TOKENS.playButtonSize}
            h={VIDEO_TOKENS.playButtonSize}
            borderRadius="full"
            bg={VIDEO_TOKENS.playButtonBg}
            display="flex"
            alignItems="center"
            justifyContent="center"
            shadow={VIDEO_TOKENS.playButtonShadow}
            transition="all 0.2s ease"
            _hover={{ bg: VIDEO_TOKENS.playButtonHoverBg, transform: 'scale(1.08)' }}
          >
            {isPlaying ? (
              <Pause size={28} color="var(--chakra-colors-teal-700)" />
            ) : (
              <Play size={28} color="var(--chakra-colors-teal-700)" style={{ marginLeft: '3px' }} />
            )}
          </Box>
        </Box>
      )}
    </Box>
  )
}
