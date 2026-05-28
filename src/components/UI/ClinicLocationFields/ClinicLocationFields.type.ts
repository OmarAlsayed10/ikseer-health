import type { LocationValue } from '../LocationPicker/LocationPicker.type'

export interface ClinicLocationValue {
  countryIso2: string
  city: string
  street: string
  location: LocationValue | null
}

export interface ClinicLocationFieldsErrors {
  countryIso2?: string
  city?: string
  street?: string
  location?: string
}

export interface ClinicLocationFieldsProps {
  value: ClinicLocationValue
  onChange: (value: ClinicLocationValue) => void
  errors?: ClinicLocationFieldsErrors
}
