import type { LocationValue } from '../UI/LocationPicker/LocationPicker.type'

export interface RequestAccessFormData {
  fullName: string
  email: string
  countryIso2: string
  phoneNational: string
  clinicName: string
  clinicCountryIso2: string
  clinicCity: string
  clinicStreet: string
  location: LocationValue | null
  details: string
}

export interface RequestAccessProps {
  isOpen: boolean
  onClose: () => void
}
