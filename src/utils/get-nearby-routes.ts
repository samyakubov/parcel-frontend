import isNull from "lodash-es/isNull"
import {mapStore} from "@/stores/map-store"
import {apiClient} from "@/api/api-client"

export default async function getNearbyRoutes() {
    try {
        if (isNull(mapStore._coords)) {
            return
        }
        return await apiClient.publicTransitService.findPublicTransitNearby()
    } catch (error) {
        console.error("💥 Error fetching routes:", error)
        mapStore.setIsPropertyDataLoading(false)
    }
}
