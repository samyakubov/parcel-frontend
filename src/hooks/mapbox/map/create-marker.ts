import {mapStore} from "@/stores/map-store"
import isNull from "lodash-es/isNull"
import mapboxgl from "mapbox-gl"

export default function createMarker(lng: number, lat: number) {
	if (isNull(mapStore._map)) {
		return null
	}
	const mainMarker = new mapboxgl.Marker()
	const mainEl = mainMarker.getElement()
	mainEl.style.opacity = "0"
	mainEl.style.transition = "opacity 0.5s"

	mainMarker.setLngLat([lng, lat]).addTo(mapStore._map)
	setTimeout(() => (mainEl.style.opacity = "1"), 50)

	return mainMarker
}

