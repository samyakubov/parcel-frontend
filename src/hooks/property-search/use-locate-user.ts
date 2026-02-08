import {useCallback} from "react"
import {mapStore} from "@/stores/map-store"
import useSearchByFuzzyCoords from "@/hooks/property-search/use-search-by-fuzzy-coords"




export default function useLocateUser() {
	const searchByFuzzyCoords = useSearchByFuzzyCoords()

	return useCallback(() => {
		if (!navigator.geolocation) {
			console.error("Geolocation is not supported by this browser")
			return
		}

		navigator.geolocation.getCurrentPosition(
			async (position) => {
				const { latitude, longitude } = position.coords
				mapStore.setCoords({ latitude, longitude })
				await searchByFuzzyCoords()
			},
			(error) => {
				console.error("Error getting location:", error)
			}
		)
	}, [])
}
