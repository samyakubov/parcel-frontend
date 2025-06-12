import { useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"
import useDarkMode from "../useDarkMode"
import useHandleMapClick from "./useHandleMapClick"

export default function useMapInitialization({containerId, markersRef}: {
	containerId: string;
	markersRef: React.RefObject<mapboxgl.Marker[]>;
}) {
	const mapRef = useRef<mapboxgl.Map | null>(null)
	const isDarkMode = useDarkMode()
	const handleMapClick = useHandleMapClick(mapRef)

	useEffect(() => {
		mapRef.current = new mapboxgl.Map({
			container: containerId,
			style: isDarkMode ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/light-v11",
			center: [-73.935242, 40.73061],
			zoom: 10,
		})

		const nycBounds: mapboxgl.LngLatBoundsLike = [
			[-74.25909, 40.477399],
			[-73.700181, 40.917577],
		]

		mapRef.current.fitBounds(nycBounds, {
			padding: 50,
			maxZoom: 20,
			duration: 1000,
			easing: (t) => t * (2 - t)
		})

		mapRef.current.setMaxBounds(nycBounds)
		mapRef.current.on("click", handleMapClick)

		const currentMarkers = markersRef.current
		const currentMap = mapRef.current

		return () => {
			currentMarkers?.forEach(marker => marker.remove())
			currentMap.remove()
		}
	}, [containerId, isDarkMode])

	return mapRef
}
