import mapboxgl from "mapbox-gl"

export default function createMarker(lng: number, lat: number, map: mapboxgl.Map) {
	const mainMarker = new mapboxgl.Marker()
	const mainEl = mainMarker.getElement()
	mainEl.style.opacity = "0"
	mainEl.style.transition = "opacity 0.5s"

	mainMarker.setLngLat([lng, lat]).addTo(map)
	setTimeout(() => (mainEl.style.opacity = "1"), 50)

	return mainMarker
}
