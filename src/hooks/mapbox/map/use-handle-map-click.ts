import { useCallback, useRef } from "react"
import isNull from "lodash-es/isNull"
import { mapStore } from "@/stores/map-store"
import useSearchByFuzzyCoords from "@/hooks/property-search/use-search-by-fuzzy-coords"
import createMarker from "@/hooks/mapbox/map/create-marker"
import useFlyTo from "@/hooks/mapbox/map/fly-to"

export default function useHandleMapClick(mapRef: React.RefObject<mapboxgl.Map | null>) {
	const markerRef = useRef<mapboxgl.Marker | null>(null)
    const searchByFuzzyCoords = useSearchByFuzzyCoords()
    const flyTo = useFlyTo()

	return useCallback(async (e: mapboxgl.MapMouseEvent) => {
		if (isNull(mapRef.current)) return
		const { lng, lat } = e.lngLat

		try {
			mapStore.setCoords({ latitude: lat, longitude: lng })
			if (!isNull(markerRef.current)) {
				markerRef.current.remove()
			}
			markerRef.current = createMarker(lng, lat)

			flyTo(mapRef.current)

            await searchByFuzzyCoords()
		} catch (error) {
			console.error("Error handling map click:", error)
		}
	}, [mapRef, searchByFuzzyCoords])
}
