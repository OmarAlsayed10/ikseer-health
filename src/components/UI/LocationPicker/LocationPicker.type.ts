export interface LocationValue {
  lat: number
  lng: number
}

export interface LocationPickerProps {
  id: string
  label: string
  value: LocationValue | null
  onChange: (value: LocationValue | null) => void
  error?: string
  isRequired?: boolean
  height?: string
  initialCenter?: LocationValue
  initialZoom?: number
}
