import { CONFIG } from './config'
import logoUrl from '../assets/logo.png'

const { cloudName } = CONFIG.cloudinary

const img = (publicId: string, transform = 'q_auto,f_auto') =>
  `https://res.cloudinary.com/${cloudName}/image/upload/${transform}/${publicId}`

const vid = (publicId: string, transform = 'q_auto') =>
  `https://res.cloudinary.com/${cloudName}/video/upload/${transform}/${publicId}`

export const MEDIA = {
  logo: logoUrl,

  hero: {
    mockup: img('nabd/hero-mockup', 'q_auto,f_auto,w_1200'),
    background: img('nabd/hero-bg', 'q_auto,f_auto'),
  },

  demos: {
    overview: vid('nabd/demo-overview'),
    appointment: vid('nabd/demo-appointment'),
    billing: vid('nabd/demo-billing'),
  },

  features: {
    patients: {
      video: vid('nabd/feature-patients'),
      thumbnail: img('nabd/feature-patients-thumb'),
    },
    scheduling: {
      video: vid('nabd/feature-scheduling'),
      thumbnail: img('nabd/feature-scheduling-thumb'),
    },
    billing: {
      video: vid('nabd/feature-billing'),
      thumbnail: img('nabd/feature-billing-thumb'),
    },
    reports: {
      video: vid('nabd/feature-reports'),
      thumbnail: img('nabd/feature-reports-thumb'),
    },
    staff: {
      video: vid('nabd/feature-staff'),
      thumbnail: img('nabd/feature-staff-thumb'),
    },
  },

  about: {
    team: img('nabd/team', 'q_auto,f_auto,w_900'),
    office: img('nabd/office', 'q_auto,f_auto,w_900'),
  },
} as const
