import { useCallback } from "react"
import { toast } from "react-toastify"
import isNull from "lodash-es/isNull"
import {searchStore} from "@/stores/search-store"
import {mapStore} from "@/stores/map-store"
import {normalizeStreetNames} from "@/utils/normalize-street-names"
import {apiClient} from "@/api/api-client"
import {modalStore} from "@/stores/modal-store"
import isHTTPError from "@/api/is-http-error"

export default function useSearchByFuzzyCoords() {

    return useCallback(async () => {
        try {
            if (isNull(mapStore._coords)) return

            mapStore.setIsPropertyDataLoading(true)
            const response = await apiClient.propertyService.searchByPropertyFuzzyCoords(
                { latitude: mapStore._coords.latitude, longitude: mapStore._coords.longitude }
            )
            mapStore.setIsPropertyDataLoading(false)

            if (isHTTPError(response)) {
                return toast.error(response.message)
            }

            const firstRecord = response.records[0]

            mapStore.setCoords(response.coordinates)

            modalStore.addPropertyModal(
                response.coordinates,
                `${firstRecord.prop_streetnumber} ${normalizeStreetNames(firstRecord.prop_streetname)}`,
                response
            )

        } catch (e) {
            console.error("error fetching records: " + e)
            toast.error("An error occurred. Please try again later.")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiClient.propertyService, mapStore, searchStore, mapStore._coords, modalStore])
}
