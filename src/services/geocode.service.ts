const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org'

export interface ForwardGeocodeQuery {
  countryIso2: string
  city: string
  street: string
}

export interface ReverseGeocodeResult {
  countryIso2: string | null
  country: string | null
  city: string | null
  street: string | null
}

export type GeocodeResult<T> =
  | { success: true; data: T }
  | { success: false; error: string }

interface NominatimSearchItem {
  lat: string
  lon: string
}

interface NominatimReverseResponse {
  address?: {
    country_code?: string
    country?: string
    city?: string
    town?: string
    village?: string
    municipality?: string
    county?: string
    state?: string
    road?: string
    pedestrian?: string
    residential?: string
    house_number?: string
  }
}

const TIMEOUT_MS = 8_000

async function nominatim<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Accept: 'application/json', 'Accept-Language': 'en' },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  })
  if (!res.ok) throw new Error(`Nominatim HTTP ${res.status}`)
  return (await res.json()) as T
}

export async function forwardGeocode(
  q: ForwardGeocodeQuery,
): Promise<GeocodeResult<{ lat: number; lng: number }>> {
  const street = q.street.trim()
  const city = q.city.trim()
  const iso2 = q.countryIso2.trim().toLowerCase()
  if (!street || !city || !iso2) return { success: false, error: 'Missing address fields.' }

  const params = new URLSearchParams({
    format: 'json',
    limit: '1',
    addressdetails: '0',
    street,
    city,
    countrycodes: iso2,
  })

  try {
    const items = await nominatim<NominatimSearchItem[]>(
      `${NOMINATIM_BASE}/search?${params.toString()}`,
    )
    if (!items.length) return { success: false, error: 'Address not found.' }
    const lat = parseFloat(items[0].lat)
    const lng = parseFloat(items[0].lon)
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return { success: false, error: 'Invalid coordinates returned.' }
    }
    return { success: true, data: { lat, lng } }
  } catch (err) {
    if (err instanceof Error && err.name === 'TimeoutError') {
      return { success: false, error: 'Geocode timed out.' }
    }
    return { success: false, error: 'Geocode failed.' }
  }
}

export async function reverseGeocode(
  lat: number,
  lng: number,
): Promise<GeocodeResult<ReverseGeocodeResult>> {
  const params = new URLSearchParams({
    format: 'json',
    addressdetails: '1',
    lat: String(lat),
    lon: String(lng),
    zoom: '18',
  })

  try {
    const data = await nominatim<NominatimReverseResponse>(
      `${NOMINATIM_BASE}/reverse?${params.toString()}`,
    )
    const addr = data.address ?? {}
    const city =
      addr.city ?? addr.town ?? addr.village ?? addr.municipality ?? addr.county ?? addr.state ?? null
    const street = [addr.road ?? addr.pedestrian ?? addr.residential, addr.house_number]
      .filter(Boolean)
      .join(' ') || null
    return {
      success: true,
      data: {
        countryIso2: addr.country_code ? addr.country_code.toUpperCase() : null,
        country: addr.country ?? null,
        city,
        street,
      },
    }
  } catch (err) {
    if (err instanceof Error && err.name === 'TimeoutError') {
      return { success: false, error: 'Reverse geocode timed out.' }
    }
    return { success: false, error: 'Reverse geocode failed.' }
  }
}
