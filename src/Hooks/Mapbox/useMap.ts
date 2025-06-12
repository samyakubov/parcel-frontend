import mapboxgl from "mapbox-gl"
import { toast } from "react-toastify"
import {useRef} from "react"
import useMapInitialization from "./useMapInitialization"
import useMapMarkers from "./useMapMarkers"

export function useMap(containerId: string) {
	const accessToken = process.env.REACT_APP_MAPBOX_API_KEY as string
	const markersRef = useRef<mapboxgl.Marker[] | null>(null)
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

	return mapRef.current
}
