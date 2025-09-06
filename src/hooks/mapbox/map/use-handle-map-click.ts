import { useCallback, useRef } from "react"
import isNull from "lodash-es/isNull"
import { mapStore } from "@/stores/map-store"
import mapboxgl from "mapbox-gl"

export default function useHandleMapClick(mapRef: React.RefObject<mapboxgl.Map | null>) {
	const markerRef = useRef<mapboxgl.Marker | null>(null)

	return useCallback((e: mapboxgl.MapMouseEvent) => {
		if (isNull(mapRef.current)) return
		const { lng, lat } = e.lngLat

		try {
			mapStore.setCoords({ latitude: lat, longitude: lng })

			if (!isNull(markerRef.current)) {
				markerRef.current.remove()
			}

			const mainMarker = new mapboxgl.Marker()
			const mainEl = mainMarker.getElement()
			mainEl.style.opacity = "0"
			mainEl.style.transition = "opacity 0.5s"

			mainMarker.setLngLat([lng, lat]).addTo(mapRef.current)
			setTimeout(() => (mainEl.style.opacity = "1"), 50)

			markerRef.current = mainMarker

			mapRef.current.flyTo({
				center: [lng, lat],
				zoom: 18,
				duration: 3000,
				essential: true,
				curve: 1.42,
			})
		} catch (error) {
			console.error("Error handling map click:", error)
		}
	}, [mapRef])
}
