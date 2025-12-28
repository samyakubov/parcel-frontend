import { useCallback, useRef } from "react"
import isEmpty from "lodash-es/isEmpty"
import { searchStore } from "@/stores/search-store"
import { mapStore } from "@/stores/map-store"
import { apiClient } from "@/api/api-client"
import { normalizeStreetNames } from "@/utils/normalize-street-names"
import { modalStore } from "@/stores/modal-store"
import createMarker from "@/hooks/mapbox/map/create-marker"
import isNull from "lodash-es/isNull"
import useFlyTo from "@/hooks/mapbox/map/fly-to"
import isUndefined from "lodash-es/isUndefined"


export default function useSearchByBbl() {
    const markerRef = useRef<mapboxgl.Marker | null>(null)
    const flyTo = useFlyTo()

    return useCallback(async () => {
        try {
            if (isEmpty(searchStore._bblSearchQuery)) return

            const existingModal = modalStore._propertyModals.find(modal =>
                modal.propertyData.records[0]?.bbl === searchStore._bblSearchQuery
            )

            if (!isUndefined(existingModal)) {
                modalStore.restoreModal(existingModal.id)
                return
            }

            mapStore.setIsPropertyDataLoading(true)
            const response = await apiClient.propertyService.searchByPropertyBbl(searchStore._bblSearchQuery)
            mapStore.setIsPropertyDataLoading(false)

            const data = response as PropertyDetailsWithCoords

            mapStore.setCoords(data.coordinates)
            const firstRecord = data.records[0]
            modalStore.addPropertyModal(
                data.coordinates,
                `${firstRecord.prop_streetnumber} ${normalizeStreetNames(firstRecord.prop_streetname)}`,
                data
            )
            if (!isNull(mapStore._map) && !isNull(mapStore._coords)) {
                if (!isNull(markerRef.current)) {
                    markerRef.current.remove()
                }
                markerRef.current = createMarker(mapStore._coords.longitude, mapStore._coords.latitude)
                flyTo()
            }
        } catch {
            mapStore.setIsPropertyDataLoading(false)
        }
    }, [flyTo])
}
