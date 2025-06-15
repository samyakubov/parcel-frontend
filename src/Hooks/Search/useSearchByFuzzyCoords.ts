import { useCallback } from "react"
import isHTTPError from "../../Utils/HTTPError"
import { toast } from "react-toastify"
import { API_RESPONSE_LIMIT } from "../../Constants/Constants"
import isNull from "lodash-es/isNull"
import {NormalizeStreetName} from "../../Utils/NormalizeStreetName"
import {apiClientStore} from "../../Stores/ApiClientStore"
import {mapStore} from "../../Stores/MapStore"
import {modalStore} from "../../Stores/ModalStore"
import {searchStore} from "../../Stores/SearchStore"

export default function useSearchByFuzzyCoords() {

	return useCallback(async () => {
		try {
			if (isNull(mapStore.coords)) return

			searchStore.setIsSearchResultLoading(true)
			const response = await apiClientStore.propertyService.searchByPropertyFuzzyCoords(
				{ latitude: mapStore.coords.latitude, longitude: mapStore.coords.longitude },
				API_RESPONSE_LIMIT
			)
			searchStore.setIsSearchResultLoading(false)

			if (isHTTPError(response)) {
				return toast.error(response.message)
			}

			searchStore.setPropertyResults(response)
			const firstRecord = response.records[0]

			searchStore.setAddressSearchQuery(`${firstRecord.prop_streetnumber.toLowerCase()} ${NormalizeStreetName(firstRecord.prop_streetname.toLowerCase())}`)
			searchStore.setSearchBblQuery(firstRecord.bbl)

			mapStore.setCoords(response.coordinates)

			modalStore.addPropertyModal(response.coordinates, `${firstRecord.prop_streetnumber} ${NormalizeStreetName(firstRecord.prop_streetname)}`, response)
		} catch (e) {
			console.error("error fetching records: " + e)
			toast.error("An error occurred. Please try again later.")
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [apiClientStore.propertyService, mapStore, searchStore, mapStore.coords, modalStore])
}
