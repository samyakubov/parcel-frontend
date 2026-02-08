import {useEffect, useRef} from "react"
import mapboxgl from "mapbox-gl"
import useHandleMapClick from "@/hooks/mapbox/map/use-handle-map-click"
import {MAP_STYLES, MapStyle, NYC_BOUNDS, NYC_CENTER} from "@/constants/mapbox"
import {mapStore} from "@/stores/map-store"



export default function useInitMap(containerId: string, initialStyle: MapStyle = "satellite") {
	mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string
	const mapRef = useRef<mapboxgl.Map | null>(null)
	const handleMapClick = useHandleMapClick(mapRef)

	useEffect(() => {
		if (mapRef.current) return

		mapRef.current = new mapboxgl.Map({
			container: containerId,
			style: MAP_STYLES[initialStyle],
			center: [NYC_CENTER.longitude, NYC_CENTER.latitude],
			zoom: 10,
			attributionControl: false
		})

		mapStore.setMap(mapRef.current)

		mapRef.current.on("load", () => {
			const map = mapRef.current
			if (!map) return

			const layersToHide = ["poi-label", "poi-label-park", "transit-label"]
			layersToHide.forEach(layerId => {
				if (map.getLayer(layerId)) {
					map.setLayoutProperty(layerId, "visibility", "none")
				}
			})
		})

		mapRef.current.fitBounds(NYC_BOUNDS as mapboxgl.LngLatBoundsLike, {
			padding: 50,
			maxZoom: 20,
			duration: 1000,
			easing: (t) => t * (2 - t)
		})

		mapRef.current.once("styledata", () => {
			const map = mapRef.current
			if (!map) return

			const layersToHide = ["poi-label", "poi-label-park", "transit-label"]
			layersToHide.forEach(layerId => {
				if (map.getLayer(layerId)) {
					map.setLayoutProperty(layerId, "visibility", "none")
				}
			})
		})

		mapRef.current.setMaxBounds(NYC_BOUNDS as mapboxgl.LngLatBoundsLike)
		mapRef.current.on("click", handleMapClick)

		return () => {
			mapStore.clearMarker()
		}
	}, [containerId, handleMapClick, initialStyle])


	return mapRef
}
