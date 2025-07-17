import { useCallback } from "react"
import {toast} from "react-toastify"
import isHTTPError from "../../Utils/HTTPError"
import {API_RESPONSE_LIMIT} from "../../Constants/Constants"
import isEmpty from "lodash-es/isEmpty"
import {useLocation} from "react-router"
import {modalStore} from "../../Stores/ModalStore"
import {NormalizeStreetName} from "../../Utils/NormalizeStreetName"
import {apiClientService} from "../../Services/ApiClientService"
import {mapStore} from "../../Stores/MapStore"
import {searchStore} from "../../Stores/SearchStore"

export default function useSearchByPropertyBBL() {
	const location = useLocation()

	return useCallback(async () => {
		try {
			if (isEmpty(searchStore.searchBblQuery)) {
				toast.error("Search query is empty. Please provide a valid BBL.")
				return
			}
			searchStore.setIsSearchResultLoading(true)

			const response = await apiClientService.propertyService.searchByPropertyBBL(searchStore.searchBblQuery, API_RESPONSE_LIMIT)
			searchStore.setIsSearchResultLoading(false)
			if (isHTTPError(response)) {
				toast.error(response.message)
				return
			}
			searchStore.setPropertyResults(response)
			mapStore.setCoords(response.coordinates)
			const firstRecord = response.records[0]
			searchStore.setAddressSearchQuery(`${firstRecord.prop_streetnumber} ${NormalizeStreetName(firstRecord.prop_streetname)}`)
			modalStore.addPropertyModal(response.coordinates, `${firstRecord.prop_streetnumber} ${NormalizeStreetName(firstRecord.prop_streetname)}`, response)
		} catch (e) {
			toast.error("An error occurred. Please try again later")
			console.error("error fetching records: " + e)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [apiClientService.propertyService, searchStore.searchBblQuery, searchStore.setPropertyResults, mapStore, location.pathname, modalStore])
}

