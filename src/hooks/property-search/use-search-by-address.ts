import {useCallback, useRef} from "react"
import isEmpty from "lodash-es/isEmpty"
import {searchStore} from "@/stores/search-store"
import {mapStore} from "@/stores/map-store"
import {apiClient} from "@/api/api-client"
import {normalizeStreetNames} from "@/utils/normalize-street-names"
import {modalStore} from "@/stores/modal-store"
import createMarker from "@/hooks/mapbox/map/create-marker"
import isNull from "lodash-es/isNull"
import useFlyTo from "@/hooks/mapbox/map/fly-to"
import isUndefined from "lodash-es/isUndefined"


export default function useSearchByAddress() {
    const markerRef = useRef<mapboxgl.Marker | null>(null)
    const flyTo = useFlyTo()

    return useCallback(async () => {
        try {
            if (isEmpty(searchStore._addressSearchQuery)) return

            const existingModal = modalStore._propertyModals.find(modal => modal.title === searchStore._addressSearchQuery)

            if (!isUndefined(existingModal)) {
                modalStore.restoreModal(existingModal.id)
                return
            }

            mapStore.setIsPropertyDataLoading(true)
            const response = await apiClient.propertyService.searchByPropertyAddress(searchStore._addressSearchQuery)
            mapStore.setIsPropertyDataLoading(false)

            mapStore.setCoords(response.coordinates)
            const firstRecord = response.records[0]
            modalStore.addPropertyModal(
                response.coordinates,
                `${firstRecord.prop_streetnumber} ${normalizeStreetNames(firstRecord.prop_streetname)}`,
                response
            )
            if (!isNull(mapStore._map) && !isNull(mapStore._coords)) {
                if (!isNull(markerRef.current)) {
                    markerRef.current.remove()
                }
                markerRef.current = createMarker(mapStore._coords.longitude, mapStore._coords.latitude)
                flyTo()
            }
        } catch (e) {
            // Error is already handled by interceptors
            mapStore.setIsPropertyDataLoading(false)
        }
    }, [flyTo])
}
