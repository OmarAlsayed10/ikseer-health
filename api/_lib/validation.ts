import { findCountry } from './countries'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const NAME_LETTER_RE = /[A-Za-z؀-ۿ]/

export interface AccessRequestInput {
  fullName?: unknown
  email?: unknown
  countryIso2?: unknown
  countryCode?: unknown
  phoneNational?: unknown
  clinicName?: unknown
  clinicCountryIso2?: unknown
  clinicCity?: unknown
  clinicStreet?: unknown
  location?: unknown
  details?: unknown
}

export interface AccessRequestValid {
  fullName: string
  email: string
  countryIso2: string
  countryCode: string
  phoneNational: string
  clinicName: string
  clinicCountryIso2: string
  clinicCountryName: string
  clinicCity: string
  clinicStreet: string
  location: { lat: number; lng: number }
  details: string
}

export type ValidationResult =
  | { ok: true; value: AccessRequestValid }
  | { ok: false; message: string }

const str = (v: unknown, max: number): string =>
  typeof v === 'string' ? v.slice(0, max).trim() : ''

const isFiniteNumber = (n: unknown): n is number =>
  typeof n === 'number' && Number.isFinite(n)

export function validateAccessRequestServer(input: AccessRequestInput): ValidationResult {
  const fullName = str(input.fullName, 100)
  const email = str(input.email, 200).toLowerCase()
  const countryIso2 = str(input.countryIso2, 4).toUpperCase()
  const phoneNational = str(input.phoneNational, 20).replace(/\D/g, '').replace(/^0+/, '')
  const clinicName = str(input.clinicName, 150)
  const clinicCountryIso2 = str(input.clinicCountryIso2, 4).toUpperCase()
  const clinicCity = str(input.clinicCity, 100)
  const clinicStreet = str(input.clinicStreet, 200)
  const details = str(input.details, 2000)

  if (!fullName || fullName.length < 2) return { ok: false, message: 'Invalid name.' }
  if (!NAME_LETTER_RE.test(fullName)) return { ok: false, message: 'Invalid name.' }
  if (!EMAIL_RE.test(email)) return { ok: false, message: 'Invalid email.' }

  const country = findCountry(countryIso2)
  if (!country) return { ok: false, message: 'Invalid country.' }
  if (!country.nationalLength.includes(phoneNational.length)) {
    return { ok: false, message: 'Invalid phone number for selected country.' }
  }

  if (!clinicName || clinicName.length < 2) return { ok: false, message: 'Invalid clinic name.' }

  const clinicCountry = findCountry(clinicCountryIso2)
  if (!clinicCountry) return { ok: false, message: 'Invalid clinic country.' }
  if (!clinicCity || clinicCity.length < 2) return { ok: false, message: 'Invalid clinic city.' }
  if (!clinicStreet || clinicStreet.length < 2) {
    return { ok: false, message: 'Invalid clinic street.' }
  }

  const loc = input.location as { lat?: unknown; lng?: unknown } | null | undefined
  if (
    !loc ||
    !isFiniteNumber(loc.lat) ||
    !isFiniteNumber(loc.lng) ||
    loc.lat < -90 ||
    loc.lat > 90 ||
    loc.lng < -180 ||
    loc.lng > 180
  ) {
    return { ok: false, message: 'Invalid location.' }
  }

  return {
    ok: true,
    value: {
      fullName,
      email,
      countryIso2: country.iso2,
      countryCode: country.code,
      phoneNational,
      clinicName,
      clinicCountryIso2: clinicCountry.iso2,
      clinicCountryName: clinicCountry.nameEn,
      clinicCity,
      clinicStreet,
      location: { lat: loc.lat, lng: loc.lng },
      details,
    },
  }
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
