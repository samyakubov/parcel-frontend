
export default function flyTo (lng: number, lat: number, map: mapboxgl.Map) {
	map.flyTo({
		center: [lng, lat],
		zoom: 18,
		duration: 3000,
		essential: true,
		curve: 1.42,
	})
}
