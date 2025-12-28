import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import { mapStore } from "@/stores/map-store"
import useSearchByFuzzyCoords from "@/hooks/property-search/use-search-by-fuzzy-coords"
import useFlyTo from "@/hooks/mapbox/map/fly-to"

export default function useHandleMapClick(mapRef: React.RefObject<mapboxgl.Map | null>) {
	const searchByFuzzyCoords = useSearchByFuzzyCoords()
	const flyTo = useFlyTo()

	return useCallback(async (e: mapboxgl.MapMouseEvent) => {
		if (isNull(mapRef.current)) return
		const { lng, lat } = e.lngLat

		try {
			mapStore.setCoords({ latitude: lat, longitude: lng })
			mapStore.setMarker(lng, lat)

			flyTo()

			await searchByFuzzyCoords()
		} catch (error) {
			console.error("Error handling map click:", error)
		}
	}, [mapRef, searchByFuzzyCoords, flyTo])
}
