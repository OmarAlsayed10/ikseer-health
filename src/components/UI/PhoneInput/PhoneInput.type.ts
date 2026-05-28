export interface PhoneInputValue {
  countryIso2: string
  nationalNumber: string
}

export interface PhoneInputProps {
  id: string
  label: string
  value: PhoneInputValue
  onChange: (value: PhoneInputValue) => void
  placeholder?: string
  error?: string
  isRequired?: boolean
  isDisabled?: boolean
}
