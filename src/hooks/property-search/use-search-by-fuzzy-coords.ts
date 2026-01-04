import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import { searchStore } from "@/stores/search-store"
import { mapStore } from "@/stores/map-store"
import { normalizeStreetNames } from "@/utils/normalize-street-names"
import { apiClient } from "@/api/api-client"
import { modalStore } from "@/stores/modal-store"
import { v4 as uuidv4 } from "uuid"
import { getSchools } from "@/utils/get-schools"

export default function useSearchByFuzzyCoords() {

    return useCallback(async () => {
        try {
            if (isNull(mapStore._coords)) return

            // Fetch property data first
            const response = await apiClient.propertyService.searchByPropertyFuzzyCoords(
                { latitude: mapStore._coords.latitude, longitude: mapStore._coords.longitude }
            )

            const propertyData = response as PropertyDetailsWithCoords

            const firstRecord = propertyData.records[0]

            mapStore.setCoords(propertyData.coordinates)

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
            console.error("Error in useSearchByFuzzyCoords:", error)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiClient.propertyService, mapStore, searchStore, mapStore._coords, modalStore])
}
