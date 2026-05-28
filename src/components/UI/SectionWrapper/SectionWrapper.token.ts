import type { SectionBackground } from './SectionWrapper.type'

export const SECTION_TOKENS = {
  containerMaxW: '1200px',
  containerPx: { base: '20px', md: '40px', lg: '60px' },
  defaultPy: { base: '72px', md: '96px' },
  backgrounds: {
    white: { bg: 'white' },
    gray: { bg: 'gray.50' },
    teal: { bg: 'teal.25' },
    dark: {
      bg: 'gray.900',
      color: 'white',
    },
  } satisfies Record<SectionBackground, object>,
} as const
