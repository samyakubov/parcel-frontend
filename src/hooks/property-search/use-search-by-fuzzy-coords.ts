import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import { searchStore } from "@/stores/search-store"
import { mapStore } from "@/stores/map-store"
import { normalizeStreetNames } from "@/utils/normalize-street-names"
import { apiClient } from "@/api/api-client"
import { modalStore } from "@/stores/modal-store"
import {v4 as uuidv4} from "uuid"
import {getSchools} from "@/utils/get-schools"

export default function useSearchByFuzzyCoords() {

    return useCallback(async () => {
        try {
            if (isNull(mapStore._coords)) return

            const response = await apiClient.propertyService.searchByPropertyFuzzyCoords(
                { latitude: mapStore._coords.latitude, longitude: mapStore._coords.longitude }
            )

            const propertyData = response as PropertyDetailsWithCoords

            const firstRecord = propertyData.records[0]

            mapStore.setCoords(propertyData.coordinates)
            const routesNearby = await apiClient.publicTransitService.findNearbyRoutes()
            const stopsNearby = await apiClient.publicTransitService.findNearbyStops()

            modalStore.addPropertyModal({
                id: uuidv4(),
                isOpen: true,
                isMinimized: false,
                isExpanded: false,
                title:`${firstRecord.prop_streetnumber} ${normalizeStreetNames(firstRecord.prop_streetname)}`,
                position: modalStore.calculateNewModalPosition(),
                propertyData: propertyData,
                routesNearBy: routesNearby,
                stopsNearBy: stopsNearby,
                schools: await getSchools(firstRecord.school_dist),
                zIndex: modalStore.getNextZIndex()
            })

        } catch (error) {
            console.error("Error in useSearchByFuzzyCoords:", error)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiClient.propertyService, mapStore, searchStore, mapStore._coords, modalStore])
}
