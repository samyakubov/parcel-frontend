import { useCallback } from "react"
import { apiClient } from "@/api/api-client"
import {chatStore} from "@/stores/chat-store"
import {mapStore} from "@/stores/map-store"
import {v4 as uuidv4} from "uuid"
import {modalStore} from "@/stores/modal-store"
import {normalizeStreetNames} from "@/utils/normalize-street-names"
import isNull from "lodash-es/isNull"
import {getSchools} from "@/utils/get-schools"
import useFlyTo from "@/hooks/mapbox/map/fly-to"
import isUndefined from "lodash-es/isUndefined"

export default function useSendAiMessage() {
	const flyTo = useFlyTo()

	return useCallback(async (content: string) => {
		if (!content.trim()) return

		chatStore.pushMessage({
			id: crypto.randomUUID(),
			role: "user",
			content
		})
		chatStore.setIsLoading(true)
		try {
			const result = await apiClient.aiService.ask(content)

			chatStore.pushMessage({
				id: crypto.randomUUID(),
				role: "ai",
				content: result.response
			})

			const propertyData = result.property_data

			if (!isUndefined(propertyData)) {
				mapStore.setCoords(propertyData.coordinates)
				const firstRecord = propertyData.records[0]
				const modalId = uuidv4()

				modalStore.addPropertyModal({
					id: modalId,
					isOpen: true,
					isMinimized: false,
					isExpanded: false,
					title: `${firstRecord.prop_streetnumber} ${normalizeStreetNames(firstRecord.prop_streetname)}`,
					position: modalStore.calculateNewModalPosition(),
					propertyData: propertyData,
					schools: undefined,
					census: undefined,
					zIndex: modalStore.getNextZIndex()
				})

				if (!isNull(mapStore._map) && !isNull(mapStore._coords)) {
					mapStore.setMarker(mapStore._coords.longitude, mapStore._coords.latitude)
					flyTo()
				}

				const [schoolsResult, censusResult] = await Promise.allSettled([
					getSchools(firstRecord.school_dist),
					apiClient.censusService.getCensusData(
						`${firstRecord.prop_streetnumber} ${normalizeStreetNames(firstRecord.prop_streetname)}` + " " + firstRecord.zipcode
					)
				])

				modalStore.setModalState(modalId, {
					schools: schoolsResult.status === "fulfilled" ? schoolsResult.value : null,
					census: censusResult.status === "fulfilled" ? censusResult.value : null
				})
			}
		} catch (e) {
			console.error(e)
		} finally {
			chatStore.setIsLoading(false)
		}

	}, [flyTo])
}
