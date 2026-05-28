export interface VideoPlayerProps {
  src: string
  thumbnail?: string
  title?: string
  autoPlay?: boolean
  muted?: boolean
  aspectRatio?: '16/9' | '4/3' | '1/1'
}
