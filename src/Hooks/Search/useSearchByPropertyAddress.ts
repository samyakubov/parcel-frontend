import { useCallback } from "react"
import isHTTPError from "../../Utils/HTTPError"
import { toast } from "react-toastify"
import { API_RESPONSE_LIMIT } from "../../Constants/Constants"
import isEmpty from "lodash-es/isEmpty"
import { useLocation } from "react-router"
import {NormalizeStreetName} from "../../Utils/NormalizeStreetName"
import {apiClientService} from "../../Services/ApiClientService"
import {mapStore} from "../../Stores/MapStore"
import {modalStore} from "../../Stores/ModalStore"
import {searchStore} from "../../Stores/SearchStore"

export default function useSearchByPropertyAddress() {
	const location = useLocation()

	return useCallback(async () => {
		try {
			if (isEmpty(searchStore.searchAddressQuery)) return

			searchStore.setIsSearchResultLoading(true)
			const response = await apiClientService.propertyService.searchByPropertyAddress(searchStore.searchAddressQuery, API_RESPONSE_LIMIT)
			searchStore.setIsSearchResultLoading(false)

			if (isHTTPError(response)) {
				return toast.error(response.message)
			}
			searchStore.setPropertyResults(response)
			mapStore.setCoords(response.coordinates)
			const firstRecord = response.records[0]
			searchStore.setSearchBblQuery(firstRecord.bbl)
			modalStore.addPropertyModal(response.coordinates, `${firstRecord.prop_streetnumber} ${NormalizeStreetName(firstRecord.prop_streetname)}`, response)
		} catch (e) {
			console.error("Error fetching records:", e)
			toast.error("An error occurred. Please try again later.")
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [apiClientService.propertyService, searchStore.searchAddressQuery, searchStore.setPropertyResults, mapStore, location.pathname, modalStore])
}
