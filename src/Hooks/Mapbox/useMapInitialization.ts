import { useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"
import useHandleMapClick from "./useHandleMapClick"
import isNull from "lodash-es/isNull"

export default function useMapInitialization({containerId, markersRef}: {
	containerId: string;
	markersRef: React.RefObject<mapboxgl.Marker[]>;
}) {
	const mapRef = useRef<mapboxgl.Map | null>(null)
	const handleMapClick = useHandleMapClick(mapRef)

	useEffect(() => {
		mapRef.current = new mapboxgl.Map({
			container: containerId,
			style: "mapbox://styles/mapbox/satellite-streets-v12",
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


		mapRef.current.on("load", () => {
			if (!isNull(mapRef.current)) {
				addNYCLotLines(mapRef.current)
			}
		})

		const currentMarkers = markersRef.current
		const currentMap = mapRef.current

		return () => {
			currentMarkers?.forEach(marker => marker.remove())
			currentMap.remove()
		}
	}, [containerId])

	return mapRef
}

function addNYCLotLines(map: mapboxgl.Map) {
	try {
		const geoJsonUrl = "/data/pluto.geojson"

		map.addSource("nyc-lots", {
			type: "geojson",
			data: geoJsonUrl,
		})

		map.addLayer({
			id: "lot-lines",
			type: "line",
			source: "nyc-lots",
			layout: {
				"line-join": "round",
				"line-cap": "round"
			},
			paint: {
				"line-color": "white",
				"line-width": [
					"interpolate",
					["linear"],
					["zoom"],
					10, 0.5,
					15, 1.5,
					20, 3
				],
				"line-opacity": [
					"interpolate",
					["linear"],
					["zoom"],
					10, 0.3,
					15, 0.8,
					20, 1
				]
			}
		})
	} catch (error) {
		console.error("Error loading NYC lot lines:", error)
	}
}
