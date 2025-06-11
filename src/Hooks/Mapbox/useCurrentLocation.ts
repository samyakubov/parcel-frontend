import { useCallback } from "react"
import {useMapContext} from "../../Contexts/MapContext"
import useSearchByFuzzyCoords from "../Search/useSearchByFuzzyCoords"
import {toast} from "react-toastify"

export default function useCurrentLocation() {
	const mapContext = useMapContext()
	const searchByCords = useSearchByFuzzyCoords()
	return useCallback(async (): Promise<void> => {
		if (!("geolocation" in navigator)) return

		try {
			const position = await new Promise<GeolocationPosition>((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject)
			})

			mapContext.setCoords({latitude:position.coords.latitude, longitude: position.coords.longitude})
			await searchByCords()
		} catch (e) {
			console.error("Error getting location: ", e)
			toast.error("Error getting your location")
			mapContext.setCoords(null)
		}
	}, [mapContext, searchByCords])
}
