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

			const propertyData = await apiClient.propertyService.searchByPropertyFuzzyCoords(
				{ latitude: mapStore._coords.latitude, longitude: mapStore._coords.longitude }
			)

			const firstRecord = propertyData.records[0]

			mapStore.setCoords(propertyData.coordinates)

			const modalId = uuidv4()

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
				census: undefined,
				zIndex: modalStore.getNextZIndex()
			})


			const [routesResult, stopsResult, schoolsResult, censusResult] = await Promise.allSettled([
				apiClient.publicTransitService.findNearbyRoutes(),
				apiClient.publicTransitService.findNearbyStops(),
				getSchools(firstRecord.school_dist),
				apiClient.censusService.getCensusData(
					`${firstRecord.prop_streetnumber} ${normalizeStreetNames(firstRecord.prop_streetname)}` + " " + firstRecord.zipcode
				)
			])

			modalStore.setModalState(modalId, {
				routesNearBy: routesResult.status === "fulfilled" ? routesResult.value : null,
				stopsNearBy: stopsResult.status === "fulfilled" ? stopsResult.value : null,
				schools: schoolsResult.status === "fulfilled" ? schoolsResult.value : null,
				census: censusResult.status === "fulfilled" ? censusResult.value : null
			})

		} catch (error) {
			console.error("Error in useSearchByFuzzyCoords:", error)
		}
	}, [apiClient.propertyService, mapStore, searchStore, mapStore._coords, modalStore])
}
