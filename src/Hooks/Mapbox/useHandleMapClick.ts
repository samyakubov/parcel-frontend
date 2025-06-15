import { useCallback, RefObject } from "react"
import isNull from "lodash-es/isNull"
import useSearchByFuzzyCoords from "../Search/useSearchByFuzzyCoords"
import {mapStore} from "../../Stores/MapStore"

export default function useHandleMapClick(mapRef: RefObject<mapboxgl.Map>) {
	const searchByCoods = useSearchByFuzzyCoords()

	return useCallback(async (e: mapboxgl.MapMouseEvent) => {
		if (isNull(mapRef.current)) return
		const { lng, lat } = e.lngLat
		const newCoords = { latitude: lat, longitude: lng }
		try {
			mapStore.setCoords(newCoords)
			await searchByCoods()
		} catch (error) {
			console.error("Error handling map click:", error)
		}

	}, [mapRef, mapStore, searchByCoods])
}
