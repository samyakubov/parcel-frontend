import { useCallback } from "react"
import { mapStore } from "@/stores/map-store"
import isNull from "lodash-es/isNull"

export default function useFlyTo() {
    return useCallback((map: mapboxgl.Map) => {
        const coords = mapStore._coords

        if (isNull(coords)) {
            console.warn("No coordinates available for flyTo")
            return
        }

        map.flyTo({
            center: [coords.longitude, coords.latitude],
            zoom: 18,
            duration: 3000,
            essential: true,
            curve: 1.42,
        })
    }, [])
}
