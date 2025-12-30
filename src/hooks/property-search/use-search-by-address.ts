import { useCallback } from "react"
import isEmpty from "lodash-es/isEmpty"
import { searchStore } from "@/stores/search-store"
import { mapStore } from "@/stores/map-store"
import { apiClient } from "@/api/api-client"
import { normalizeStreetNames } from "@/utils/normalize-street-names"
import { modalStore } from "@/stores/modal-store"
import isNull from "lodash-es/isNull"
import useFlyTo from "@/hooks/mapbox/map/fly-to"
import isUndefined from "lodash-es/isUndefined"
import getNearbyRoutes from "@/utils/get-nearby-routes"


export default function useSearchByAddress() {
    const flyTo = useFlyTo()

    return useCallback(async () => {
        try {
            if (isEmpty(searchStore._addressSearchQuery)) return
            const existingModal = modalStore._propertyModals.find(modal => modal.title === searchStore._addressSearchQuery)

            if (!isUndefined(existingModal)) {
                modalStore.restoreModal(existingModal.id)
                return
            }

            const response = await apiClient.propertyService.searchByPropertyAddress(searchStore._addressSearchQuery)

            const data = response as PropertyDetailsWithCoords

            mapStore.setCoords(data.coordinates)
            const firstRecord = data.records[0]
            const publicTransitNearby =  await getNearbyRoutes()
            modalStore.addPropertyModal(
                data.coordinates,
                `${firstRecord.prop_streetnumber} ${normalizeStreetNames(firstRecord.prop_streetname)}`,
                data,
                publicTransitNearby ?? { type: "FeatureCollection", features: [] }
            )
            if (!isNull(mapStore._map) && !isNull(mapStore._coords)) {
                mapStore.setMarker(mapStore._coords.longitude, mapStore._coords.latitude)
                flyTo()
            }
        } catch (error) {
            console.error("Error in useSearchByAddress:", error)
        }
    }, [flyTo])
}
