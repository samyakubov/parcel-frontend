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
import { v4 as uuidv4 } from "uuid"
import { getSchools } from "@/utils/get-schools"


export default function useSearchByBbl() {
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

            // Fetch property data first
            const response = await apiClient.propertyService.searchByPropertyBbl(searchStore._bblSearchQuery)

            const propertyData = response as PropertyDetailsWithCoords

            mapStore.setCoords(propertyData.coordinates)
            const firstRecord = propertyData.records[0]

            // Create modal ID
            const modalId = uuidv4()

            // Open modal immediately with property data, async data set to undefined (loading state)
            modalStore.addPropertyModal({
                id: modalId,
                isOpen: true,
                isMinimized: false,
                isExpanded: false,
                title: `${firstRecord.prop_streetnumber} ${normalizeStreetNames(firstRecord.prop_streetname)}`,
                position: modalStore.calculateNewModalPosition(),
                propertyData: propertyData,
                routesNearBy: undefined,
                stopsNearBy: undefined,
                schools: undefined,
                zIndex: modalStore.getNextZIndex()
            })

            if (!isNull(mapStore._map) && !isNull(mapStore._coords)) {
                mapStore.setMarker(mapStore._coords.longitude, mapStore._coords.latitude)
                flyTo()
            }

            // Fetch async data in parallel
            const [routesResult, stopsResult, schoolsResult] = await Promise.allSettled([
                apiClient.publicTransitService.findNearbyRoutes(),
                apiClient.publicTransitService.findNearbyStops(),
                getSchools(firstRecord.school_dist)
            ])

            // Update modal with async data (null if failed)
            modalStore.updateModalData(modalId, {
                routesNearBy: routesResult.status === 'fulfilled' ? routesResult.value : null,
                stopsNearBy: stopsResult.status === 'fulfilled' ? stopsResult.value : null,
                schools: schoolsResult.status === 'fulfilled' ? schoolsResult.value : null
            })
        } catch (error) {
            console.error("Error in useSearchByBbl:", error)
        }
    }, [flyTo])
}
