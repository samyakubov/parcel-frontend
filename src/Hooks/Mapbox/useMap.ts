import mapboxgl from "mapbox-gl"
import { toast } from "react-toastify"
import {useEffect, useRef} from "react"
import useDarkMode from "../useDarkMode"
import useMapInitialization from "./useMapInitialization"
import useMapMarkers from "./useMapMarkers"

export function useMap(containerId: string) {
	const accessToken = process.env.REACT_APP_MAPBOX_API_KEY as string
	const markersRef = useRef<mapboxgl.Marker[] | null>(null)
	const isDarkMode = useDarkMode()
	const mapRef = useMapInitialization({containerId, markersRef})
	if (!accessToken) {
		console.error("Mapbox access token is required")
		toast.error("Unable to access map")
	}
	mapboxgl.accessToken = accessToken

	useMapMarkers({
		mapRef,
		markersRef
	})

	useEffect(() => {
		if (!mapRef.current) return

		const newStyle = isDarkMode
			? "mapbox://styles/mapbox/dark-v11"
			: "mapbox://styles/mapbox/light-v11"

		mapRef.current.setStyle(newStyle)
	}, [isDarkMode])

	return mapRef.current
}
