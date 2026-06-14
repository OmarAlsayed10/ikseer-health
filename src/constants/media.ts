import { CONFIG } from './config'
import logoUrl from '../assets/logo.png'
import logoWhiteUrl from '../assets/logoWhite.png'

const { cloudName } = CONFIG.cloudinary

const img = (publicId: string, transform = 'q_auto,f_auto') =>
  `https://res.cloudinary.com/${cloudName}/image/upload/${transform}/${publicId}`

const vid = (publicId: string, transform = 'q_auto') =>
  `https://res.cloudinary.com/${cloudName}/video/upload/${transform}/${publicId}`

export const MEDIA = {
  logo: logoUrl,
  logoWhite: logoWhiteUrl,

  hero: {
    mockup: img('ikseer/hero-mockup', 'q_auto,f_auto,w_1200'),
    background: img('ikseer/hero-bg', 'q_auto,f_auto'),
  },

  demos: {
    overview: 'https://res.cloudinary.com/dr85phcjz/video/upload/q_auto/f_auto/v1781473057/Blue_Digital_Website_New_Features_Announcement_Video_k1iaiz.mp4',
    appointment: vid('ikseer/demo-appointment'),
    billing: vid('ikseer/demo-billing'),
  },

  features: {
    patients: {
      video: vid('ikseer/feature-patients'),
      thumbnail: img('patients_kkkdf4'),
    },
    scheduling: {
      video: vid('ikseer/feature-scheduling'),
      thumbnail: img('scheduling_cxrw9w'),
    },
    billing: {
      video: vid('ikseer/feature-billing'),
      thumbnail: img('billing_ngkud9'),
    },
    reports: {
      video: vid('ikseer/feature-reports'),
      thumbnail: img('reports_lnagam'),
    },
    staff: {
      video: vid('ikseer/feature-staff'),
      thumbnail: img('staff_a0rdbd'),
    },
    whatsapp: {
      video: vid('ikseer/feature-whatsapp'),
      thumbnail: img('whatsapp_pt2sk1'),
    },
    ai: {
      video: vid('ikseer/feature-ai'),
      thumbnail: img('ai_ehahmb'),
    },
  },

  about: {
    team: img('ikseer/team', 'q_auto,f_auto,w_900'),
    office: img('ikseer/office', 'q_auto,f_auto,w_900'),
  },
} as const
