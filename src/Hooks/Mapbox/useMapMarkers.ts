import {useEffect} from "react"
import isNull from "lodash-es/isNull"
import mapboxgl from "mapbox-gl"
import get from "lodash-es/get"
import isEmpty from "lodash-es/isEmpty"
import {NYC_BOUNDS} from "../../Constants/Constants"
import {useMapContext} from "../../Contexts/MapContext"

interface MapMarkersProps {
    mapRef: React.RefObject<mapboxgl.Map | null>;
    markersRef: React.MutableRefObject<mapboxgl.Marker[] | null>;
}

export default function useMapMarkers({mapRef, markersRef}: MapMarkersProps) {
	const mapContext = useMapContext()

	useEffect(() => {
		if (isNull(mapRef.current) || isNull(mapContext.coords)) return

		if (isNull(markersRef.current)) {
			markersRef.current = []
		} else {
			markersRef.current.forEach(marker => {
				marker.getElement().style.transition = "opacity 0.5s"
				marker.getElement().style.opacity = "0"
				setTimeout(() => marker.remove(), 500)
			})
			markersRef.current = []
		}

		try {
			const coords = mapContext.coords
			const mainLng = Number(coords.longitude)
			const mainLat = Number(coords.latitude)

			const mainMarker = new mapboxgl.Marker()
			const mainEl = mainMarker.getElement()
			mainEl.style.opacity = "0"
			mainEl.style.transition = "opacity 0.5s"
			mainMarker.setLngLat([mainLng, mainLat]).addTo(mapRef.current)
			setTimeout(() => mainEl.style.opacity = "1", 50)

			markersRef.current.push(mainMarker)

			const properties = get(mapContext, "relatedPropertiesToOwnerCoords", [])

			if (!mapContext.isRelatedPropertiesLoading && !isEmpty(properties) && !isNull(properties)) {
				const bounds = new mapboxgl.LngLatBounds(NYC_BOUNDS[0], NYC_BOUNDS[1])

				properties.forEach((property, index) => {
					const lng = Number(get(property, "longitude"))
					const lat = Number(get(property, "latitude"))

					if (lng >= NYC_BOUNDS[0][0] && lng <= NYC_BOUNDS[1][0] &&
                        lat >= NYC_BOUNDS[0][1] && lat <= NYC_BOUNDS[1][1]) {
						bounds.extend([lng, lat])

						const marker = new mapboxgl.Marker()
						const el = marker.getElement()
						el.style.opacity = "0"
						el.style.transition = "opacity 0.5s"

						if (isNull(mapRef.current)) {
							return
						}

						marker.setLngLat([lng, lat]).addTo(mapRef.current)
						setTimeout(() => el.style.opacity = "1", 50 + (index * 100))

						if (markersRef.current) {
							markersRef.current.push(marker)
						}
					}
				})

				mapRef.current.fitBounds(bounds, {
					padding: 50,
					maxZoom: 18,
					duration: 3000,
					essential: true,
					curve: 1.42
				})
			} else {
				mapRef.current.flyTo({
					center: [mainLng, mainLat],
					zoom: 18,
					duration: 3000,
					essential: true,
					curve: 1.42
				})
			}
		} catch (error) {
			console.error("Error updating map:", error)
		}
	}, [mapContext.coords, mapContext.relatedPropertiesToOwnerCoords, mapContext.isRelatedPropertiesLoading, mapContext])
}
