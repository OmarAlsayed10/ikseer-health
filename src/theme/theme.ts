import { createSystem, defaultConfig } from '@chakra-ui/react'

export const system = createSystem(defaultConfig, {
  globalCss: {
    '*': { boxSizing: 'border-box' },
    html: { scrollBehavior: 'smooth' },
    body: {
      bg: 'gray.50',
      color: 'gray.900',
      fontFamily: 'var(--font-body)',
      lineHeight: '1.7',
    },
    '.animate-fade-up': {
      opacity: '0',
      transform: 'translateY(24px)',
      transition:
        'opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)',
    },
    '.animate-fade-up.in-view': {
      opacity: '1',
      transform: 'translateY(0)',
    },
    '.animate-fade-in': {
      opacity: '0',
      transition: 'opacity 0.55s ease',
    },
    '.animate-fade-in.in-view': {
      opacity: '1',
    },
    '.animate-delay-1': { transitionDelay: '0.1s' },
    '.animate-delay-2': { transitionDelay: '0.2s' },
    '.animate-delay-3': { transitionDelay: '0.3s' },
    '.animate-delay-4': { transitionDelay: '0.4s' },
  },
  theme: {
    tokens: {
      colors: {
        teal: {
          25: { value: '#F0FAFB' },
          50: { value: '#E1F5F7' },
          100: { value: '#C2EBF0' },
          200: { value: '#9DDCE5' },
          300: { value: '#6FCBDA' },
          400: { value: '#3BB8CC' },
          500: { value: '#0FACBE' },
          600: { value: '#0D98AA' },
          700: { value: '#0A8394' },
          800: { value: '#0A7080' },
          900: { value: '#085E6B' },
          950: { value: '#053F47' },
        },
        gray: {
          25: { value: '#FCFCFD' },
          50: { value: '#F7F9FA' },
          100: { value: '#EDF1F3' },
          200: { value: '#D9E1E5' },
          300: { value: '#C0CDD3' },
          400: { value: '#94A8B1' },
          500: { value: '#677E87' },
          600: { value: '#4D6470' },
          700: { value: '#354C56' },
          800: { value: '#1E3540' },
          900: { value: '#0D1F26' },
          950: { value: '#060E12' },
        },
      },
      fonts: {
        heading: { value: 'var(--font-body, Inter, sans-serif)' },
        body: { value: 'var(--font-body, Inter, sans-serif)' },
      },
      radii: {
        sm: { value: '6px' },
        md: { value: '10px' },
        lg: { value: '14px' },
        xl: { value: '20px' },
        '2xl': { value: '28px' },
        full: { value: '9999px' },
      },
      shadows: {
        sm: { value: '0 1px 3px 0 rgba(13,31,38,0.08), 0 1px 2px -1px rgba(13,31,38,0.06)' },
        md: { value: '0 4px 12px -2px rgba(13,31,38,0.10), 0 2px 6px -2px rgba(13,31,38,0.06)' },
        lg: { value: '0 10px 30px -4px rgba(13,31,38,0.12), 0 4px 10px -4px rgba(13,31,38,0.06)' },
        xl: { value: '0 20px 50px -8px rgba(13,31,38,0.14), 0 8px 20px -8px rgba(13,31,38,0.08)' },
        teal: { value: '0 8px 30px -4px rgba(13,152,170,0.35)' },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: '{colors.teal.600}' },
          solidHover: { value: '{colors.teal.700}' },
          subtle: { value: '{colors.teal.50}' },
          muted: { value: '{colors.teal.100}' },
          emphasized: { value: '{colors.teal.200}' },
          fg: { value: 'white' },
          placeholder: { value: '{colors.teal.400}' },
        },
      },
    },
  },
})
