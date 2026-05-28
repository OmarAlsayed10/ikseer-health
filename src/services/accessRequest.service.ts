import { CONFIG } from '../constants/config'
import { sanitizeFormData } from '../utils/sanitize'
import { validateForm, validators } from '../utils/validation'
import { findCountry } from '../constants/countries'

export interface AccessRequestLocation {
  lat: number
  lng: number
}

export interface AccessRequestPayload {
  fullName: string
  email: string
  countryIso2: string
  countryCode: string
  phoneNational: string
  clinicName: string
  clinicCountryIso2: string
  clinicCity: string
  clinicStreet: string
  location: AccessRequestLocation
  details?: string
}

export interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
}

export type ServiceResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string }

export interface AccessRequestValidationErrors {
  fullName?: string
  email?: string
  phoneNational?: string
  clinicName?: string
  clinicCountryIso2?: string
  clinicCity?: string
  clinicStreet?: string
  location?: string
  agreedToTerms?: string
}

export function validateAccessRequest(
  data: Omit<AccessRequestPayload, 'countryCode' | 'location'> & {
    location: AccessRequestLocation | null
    agreedToTerms: boolean
  },
  messages: {
    phoneInvalid: string
    locationRequired: string
    privacyRequired: string
  },
): { errors: AccessRequestValidationErrors; isValid: boolean } {
  const country = findCountry(data.countryIso2)
  const phoneValidator = country
    ? validators.phoneNational(country.nationalLength, messages.phoneInvalid)
    : validators.phone(messages.phoneInvalid)

  const formCheck = validateForm(
    {
      fullName: data.fullName,
      email: data.email,
      phoneNational: data.phoneNational,
      clinicName: data.clinicName,
      clinicCity: data.clinicCity,
      clinicStreet: data.clinicStreet,
    },
    {
      fullName: [
        validators.required(),
        validators.minLength(2),
        validators.maxLength(100),
        validators.letters(),
      ],
      email: [validators.required(), validators.email()],
      phoneNational: [validators.required(), phoneValidator],
      clinicName: [validators.required(), validators.minLength(2), validators.maxLength(150)],
      clinicCity: [validators.required(), validators.minLength(2), validators.maxLength(100)],
      clinicStreet: [validators.required(), validators.minLength(2), validators.maxLength(200)],
    },
  )

  const errors: AccessRequestValidationErrors = { ...formCheck.errors }
  if (!data.clinicCountryIso2 || !findCountry(data.clinicCountryIso2)) {
    errors.clinicCountryIso2 = messages.locationRequired
  }
  if (!data.location) errors.location = messages.locationRequired
  if (!data.agreedToTerms) errors.agreedToTerms = messages.privacyRequired

  return { errors, isValid: Object.keys(errors).length === 0 }
}

export function validateContactForm(data: ContactPayload): ReturnType<typeof validateForm> {
  return validateForm(data, {
    name: [validators.required(), validators.minLength(2), validators.maxLength(100)],
    email: [validators.required(), validators.email()],
    subject: [validators.required(), validators.minLength(3), validators.maxLength(200)],
    message: [validators.required(), validators.minLength(10), validators.maxLength(2000)],
  })
}

export async function submitAccessRequest(
  raw: AccessRequestPayload,
): Promise<ServiceResult> {
  const { location, ...rest } = raw
  const sanitized = sanitizeFormData(rest) as Omit<AccessRequestPayload, 'location'>
  const payload: AccessRequestPayload = {
    ...sanitized,
    email: sanitized.email.toLowerCase(),
    phoneNational: sanitized.phoneNational.replace(/\D/g, '').replace(/^0+/, ''),
    location,
  }

  try {
    const res = await fetch(`${CONFIG.api.baseUrl}/api/access-request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(CONFIG.api.timeout),
    })

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      return { success: false, error: (body as { message?: string }).message ?? 'Request failed' }
    }

    return { success: true, data: undefined }
  } catch (err) {
    if (err instanceof Error && err.name === 'TimeoutError') {
      return { success: false, error: 'Request timed out. Please try again.' }
    }
    return { success: false, error: 'Network error. Please check your connection.' }
  }
}

export async function submitContactForm(raw: ContactPayload): Promise<ServiceResult> {
  const payload = sanitizeFormData(raw)

  try {
    const res = await fetch(`${CONFIG.api.baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(CONFIG.api.timeout),
    })

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      return { success: false, error: (body as { message?: string }).message ?? 'Request failed' }
    }

    return { success: true, data: undefined }
  } catch (err) {
    if (err instanceof Error && err.name === 'TimeoutError') {
      return { success: false, error: 'Request timed out. Please try again.' }
    }
    return { success: false, error: 'Network error. Please check your connection.' }
  }
}
