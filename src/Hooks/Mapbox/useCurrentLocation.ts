import { useCallback } from "react"
import useSearchByFuzzyCoords from "../Search/useSearchByFuzzyCoords"
import {toast} from "react-toastify"
import {mapStore} from "../../Stores/MapStore"

export default function useCurrentLocation() {
	const searchByCords = useSearchByFuzzyCoords()
	return useCallback(async (): Promise<void> => {
		if (!("geolocation" in navigator)) return

		try {
			const position = await new Promise<GeolocationPosition>((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject)
			})

			mapStore.setCoords({latitude:position.coords.latitude, longitude: position.coords.longitude})
			await searchByCords()
		} catch (e) {
			console.error("Error getting location: ", e)
			toast.error("Error getting your location")
			mapStore.setCoords(null)
		}
	}, [mapStore, searchByCords])
}
