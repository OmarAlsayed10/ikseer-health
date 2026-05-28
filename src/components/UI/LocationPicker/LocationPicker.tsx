import { useEffect, useRef } from 'react'
import { Box, Flex, Text, chakra } from '@chakra-ui/react'
import { MapPin } from 'lucide-react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { fromLonLat, toLonLat } from 'ol/proj'
import Style from 'ol/style/Style'
import Icon from 'ol/style/Icon'
import 'ol/ol.css'
import { useTranslation } from '../../../hooks/useTranslation'
import { INPUT_TOKENS } from '../AppInput/AppInput.token'
import { LOCATION_PICKER_TOKENS } from './LocationPicker.token'
import type { LocationPickerProps } from './LocationPicker.type'

const Label = chakra('label')

const PIN_SVG = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
    <path d="M16 0C7.163 0 0 7.163 0 16c0 11 16 24 16 24s16-13 16-24C32 7.163 24.837 0 16 0z" fill="${LOCATION_PICKER_TOKENS.markerColor}"/>
    <circle cx="16" cy="16" r="6" fill="white"/>
  </svg>`,
)
const PIN_DATA_URL = `data:image/svg+xml;charset=utf-8,${PIN_SVG}`

function LocationPickerImpl({
  id,
  label,
  value,
  onChange,
  error,
  isRequired,
  height,
  initialCenter,
  initialZoom,
}: LocationPickerProps) {
  const { t } = useTranslation()
  const hasError = Boolean(error)
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<Map | null>(null)
  const sourceRef = useRef<VectorSource | null>(null)
  const onChangeRef = useRef(onChange)

  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const center = initialCenter ?? LOCATION_PICKER_TOKENS.defaultCenter
    const source = new VectorSource()
    const vectorLayer = new VectorLayer({
      source,
      style: new Style({
        image: new Icon({ src: PIN_DATA_URL, anchor: [0.5, 1], scale: 1 }),
      }),
    })

    const map = new Map({
      target: containerRef.current,
      layers: [new TileLayer({ source: new OSM() }), vectorLayer],
      view: new View({
        center: fromLonLat([center.lng, center.lat]),
        zoom: initialZoom ?? LOCATION_PICKER_TOKENS.defaultZoom,
      }),
      controls: [],
    })

    map.on('click', (evt) => {
      const [lng, lat] = toLonLat(evt.coordinate)
      onChangeRef.current({ lat, lng })
    })

    mapRef.current = map
    sourceRef.current = source

    return () => {
      map.setTarget(undefined)
      mapRef.current = null
      sourceRef.current = null
    }
  }, [initialCenter, initialZoom])

  useEffect(() => {
    const source = sourceRef.current
    const map = mapRef.current
    if (!source || !map) return
    source.clear()
    if (value) {
      const coord = fromLonLat([value.lng, value.lat])
      source.addFeature(new Feature(new Point(coord)))
      map.getView().animate({ center: coord, zoom: Math.max(map.getView().getZoom() ?? 5, 13), duration: 300 })
    }
  }, [value])

  useEffect(() => {
    const handle = () => mapRef.current?.updateSize()
    window.addEventListener('resize', handle)
    const raf = requestAnimationFrame(handle)
    return () => {
      window.removeEventListener('resize', handle)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <Box>
      {label && (
        <Label
          htmlFor={id}
          display="block"
          mb="1.5"
          fontSize={INPUT_TOKENS.labelFontSize}
          fontWeight={INPUT_TOKENS.labelFontWeight}
          color={INPUT_TOKENS.labelColor}
        >
          {label}
          {isRequired && (
            <Text as="span" color="red.500" ms="1">
              *
            </Text>
          )}
        </Label>
      )}

      <Box
        id={id}
        ref={containerRef}
        h={height ?? LOCATION_PICKER_TOKENS.mapHeight}
        w="full"
        borderRadius={LOCATION_PICKER_TOKENS.mapBorderRadius}
        border="1px solid"
        borderColor={
          hasError ? LOCATION_PICKER_TOKENS.mapErrorBorderColor : LOCATION_PICKER_TOKENS.mapBorderColor
        }
        overflow="hidden"
        position="relative"
        style={{ touchAction: 'none' }}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : `${id}-helper`}
      />

      {value ? (
        <Flex
          id={`${id}-helper`}
          mt="2"
          align="center"
          gap="1.5"
          px="2.5"
          py="1"
          bg={LOCATION_PICKER_TOKENS.coordsBg}
          borderRadius="md"
          fontSize={LOCATION_PICKER_TOKENS.coordsFontSize}
          color={LOCATION_PICKER_TOKENS.coordsColor}
          dir="ltr"
          w="fit-content"
        >
          <MapPin size={12} />
          <Text as="span">
            {value.lat.toFixed(4)}°, {value.lng.toFixed(4)}°
          </Text>
        </Flex>
      ) : (
        <Text id={`${id}-helper`} mt="2" fontSize="12px" color="gray.500">
          {t.requestAccess.form.locationHelper}
        </Text>
      )}

      {hasError && (
        <Text id={`${id}-error`} mt="1.5" fontSize={INPUT_TOKENS.errorFontSize} color="red.500" role="alert">
          {error}
        </Text>
      )}
    </Box>
  )
}

export const LocationPicker = LocationPickerImpl
export default LocationPickerImpl
