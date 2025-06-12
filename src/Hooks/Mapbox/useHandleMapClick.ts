import { useCallback, RefObject } from "react"
import isNull from "lodash-es/isNull"
import { useMapContext } from "../../Contexts/MapContext"
import useSearchByFuzzyCoords from "../Search/useSearchByFuzzyCoords"

export default function useHandleMapClick(mapRef: RefObject<mapboxgl.Map>) {
	const mapContext = useMapContext()
	const searchByCoods = useSearchByFuzzyCoords()

	return useCallback(async (e: mapboxgl.MapMouseEvent) => {
		if (isNull(mapRef.current)) return
		const { lng, lat } = e.lngLat
		const newCoords = { latitude: lat, longitude: lng }
		try {
			mapContext.setCoords(newCoords)
			await searchByCoods()
		} catch (error) {
			console.error("Error handling map click:", error)
		}

	}, [mapRef, mapContext, searchByCoods])
}
