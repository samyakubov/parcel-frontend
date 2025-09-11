import { useCallback } from "react"
import { toast } from "react-toastify"
import isEmpty from "lodash-es/isEmpty"
import {searchStore} from "@/stores/search-store"
import {mapStore} from "@/stores/map-store"
import {apiClient} from "@/api/api-client"
import {normalizeStreetNames} from "@/utils/normalize-street-names"
import {modalStore} from "@/stores/modal-store"

export default function useSearchByAddress() {
    // const location = useLocation()

    return useCallback(async () => {
        try {
            if (isEmpty(searchStore._addressSearchQuery)) return

            // searchStore.setIsSearchResultLoading(true)
            const response = await apiClient.propertyService.searchByPropertyAddress(searchStore._addressSearchQuery)
            // searchStore.setIsSearchResultLoading(false)

            // if (isHTTPError(response)) {
            //     return toast.error(response.message)
            // }
            mapStore.setCoords(response.coordinates)
            const firstRecord = response.records[0]
            modalStore.addPropertyModal(
                response.coordinates,
                `${firstRecord.prop_streetnumber} ${normalizeStreetNames(firstRecord.prop_streetname)}`,
                response
            )
        } catch (e) {
            console.error("Error fetching records:", e)
            toast.error("An error occurred. Please try again later.")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiClient.propertyService, searchStore._addressSearchQuery, mapStore, location.pathname, modalStore])
}
