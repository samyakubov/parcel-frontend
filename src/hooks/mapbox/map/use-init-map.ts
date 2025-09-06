import {useEffect, useRef} from "react"
import mapboxgl from "mapbox-gl"
import useHandleMapClick from "@/hooks/mapbox/map/use-handle-map-click"
import {NYC_BOUNDS} from "@/constants/mapbox"


export default function useInitMap(containerId:string) {
	mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string
	const mapRef = useRef<mapboxgl.Map | null>(null)
	const handleMapClick = useHandleMapClick(mapRef)

	useEffect(() => {
		mapRef.current = new mapboxgl.Map({
			container: containerId,
			style: "mapbox://styles/mapbox/satellite-streets-v12",
			center: [-73.935242, 40.73061],
			zoom: 10,
		})

		mapRef.current.fitBounds(NYC_BOUNDS as mapboxgl.LngLatBoundsLike, {
			padding: 50,
			maxZoom: 20,
			duration: 1000,
			easing: (t) => t * (2 - t)
		})

		mapRef.current.setMaxBounds(NYC_BOUNDS as mapboxgl.LngLatBoundsLike)
		mapRef.current.on("click", handleMapClick)
	}, [containerId, handleMapClick])

	return mapRef
}
