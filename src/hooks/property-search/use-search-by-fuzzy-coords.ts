import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import { searchStore } from "@/stores/search-store"
import { mapStore } from "@/stores/map-store"
import { normalizeStreetNames } from "@/utils/normalize-street-names"
import { apiClient } from "@/api/api-client"
import { modalStore } from "@/stores/modal-store"

export default function useSearchByFuzzyCoords() {

    return useCallback(async () => {
        try {
            if (isNull(mapStore._coords)) return

            mapStore.setIsPropertyDataLoading(true)
            console.log("Searching fuzzy coords:", mapStore._coords)
            const response = await apiClient.propertyService.searchByPropertyFuzzyCoords(
                { latitude: mapStore._coords.latitude, longitude: mapStore._coords.longitude }
            )
            mapStore.setIsPropertyDataLoading(false)

            const data = response as PropertyDetailsWithCoords

            const firstRecord = data.records[0]

            mapStore.setCoords(data.coordinates)

            modalStore.addPropertyModal(
                data.coordinates,
                `${firstRecord.prop_streetnumber} ${normalizeStreetNames(firstRecord.prop_streetname)}`,
                data
            )

        } catch {
            mapStore.setIsPropertyDataLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiClient.propertyService, mapStore, searchStore, mapStore._coords, modalStore])
}
