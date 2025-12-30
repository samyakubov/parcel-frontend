import { useCallback } from "react"
import isNull from "lodash-es/isNull"
import { mapStore } from "@/stores/map-store"
import { apiClient } from "@/api/api-client"
import {publicTransitStore} from "@/stores/public-transit-store"

export default function useGetNearbyRoutes() {
    return useCallback(async () => {
        console.log("🚀 useGetNearbyRoutes called")
        console.log("📍 Current coords:", mapStore._coords)

        try {
            if (isNull(mapStore._coords)) {
                return
            }

            console.log("🔄 Fetching nearby routes...")
            const response = await apiClient.publicTransitService.findPublicTransitNearby()
            console.log("✅ API Response:", response)
            console.log("📊 Features count:", response?.features?.length)

            publicTransitStore.setRoutesNearby(response)
            console.log("💾 Stored in MobX:", publicTransitStore._routesNearBy)
        } catch (error) {
            console.error("💥 Error fetching routes:", error)
            mapStore.setIsPropertyDataLoading(false)
        }
    }, [])
}
