import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import { mapStore } from "@/stores/map-store"
import { apiClient } from "@/api/api-client"
import {publicTransitStore} from "@/stores/public-transit-store"

export default function useGetNearbyRoutes() {

    return useCallback(async () => {
        try {
            if (isNull(mapStore._coords)) return
            const response = await apiClient.publicTransitService.findPublicTransitNearby()
            publicTransitStore.setRoutesNearby(response)
        } catch {
            mapStore.setIsPropertyDataLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ mapStore._coords])
}
