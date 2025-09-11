import { useCallback, useRef } from "react"
import isNull from "lodash-es/isNull"
import { mapStore } from "@/stores/map-store"
import flyTo from "@/hooks/mapbox/map/fly-to"
import useSearchByFuzzyCoords from "@/hooks/property-search/use-search-by-fuzzy-coords"
import createMarker from "@/hooks/mapbox/map/create-marker"

export default function useHandleMapClick(mapRef: React.RefObject<mapboxgl.Map | null>) {
	const markerRef = useRef<mapboxgl.Marker | null>(null)
    const searchByFuzzyCoords = useSearchByFuzzyCoords()

	return useCallback(async (e: mapboxgl.MapMouseEvent) => {
		if (isNull(mapRef.current)) return
		const { lng, lat } = e.lngLat

		try {
			mapStore.setCoords({ latitude: lat, longitude: lng })
			if (!isNull(markerRef.current)) {
				markerRef.current.remove()
			}

			markerRef.current = createMarker(lng, lat, mapRef.current)

			flyTo(lng, lat, mapRef.current)

            await searchByFuzzyCoords()
		} catch (error) {
			console.error("Error handling map click:", error)
		}
	}, [mapRef, searchByFuzzyCoords])
}
