import { useCallback, useRef } from "react"
import isNull from "lodash-es/isNull"
import { mapStore } from "@/stores/map-store"
import mapboxgl from "mapbox-gl"
import { createMarker } from "./create-marker"
import { flyTo } from "./fly-to"
import { addPropertyModal } from "./add-property-modal"

export default function useHandleMapClick(mapRef: React.RefObject<mapboxgl.Map | null>) {
	const markerRef = useRef<mapboxgl.Marker | null>(null)

	return useCallback((e: mapboxgl.MapMouseEvent) => {
		if (isNull(mapRef.current)) return
		const { lng, lat } = e.lngLat

		try {
			mapStore.setCoords({ latitude: lat, longitude: lng })
			if (!isNull(markerRef.current)) {
				markerRef.current.remove()
			}

			markerRef.current = createMarker(lng, lat, mapRef.current)

			flyTo(lng, lat, mapRef.current)

			addPropertyModal(lat, lng)
		} catch (error) {
			console.error("Error handling map click:", error)
		}
	}, [mapRef])
}