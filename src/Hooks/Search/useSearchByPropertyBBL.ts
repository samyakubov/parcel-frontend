import { useCallback } from "react"
import {toast} from "react-toastify"
import {useApiClientContext} from "../../Contexts/ApiClientContext"
import isHTTPError from "../../Utils/HTTPError"
import {useSearchContext} from "../../Contexts/SearchContext"
import {API_RESPONSE_LIMIT} from "../../Constants/Constants"
import isEmpty from "lodash-es/isEmpty"
import {useLocation} from "react-router"
import {useMapContext} from "../../Contexts/MapContext"
import {useModalManagerContext} from "../../Contexts/ModalManagerContext"
import {NormalizeStreetName} from "../../Utils/NormalizeStreetName"

export default function useSearchByPropertyBBL() {
	const apiClientContext = useApiClientContext()
	const searchContext = useSearchContext()
	const mapContext = useMapContext()
	const modalManagerContext = useModalManagerContext()
	const location = useLocation()

	return useCallback(async () => {
		try {
			if (isEmpty(searchContext.searchBblQuery)) {
				toast.error("Search query is empty. Please provide a valid BBL.")
				return
			}
			searchContext.setIsSearchResultLoading(true)

			const response = await apiClientContext.propertyService.searchByPropertyBBL(searchContext.searchBblQuery, API_RESPONSE_LIMIT)
			searchContext.setIsSearchResultLoading(false)
			if (isHTTPError(response)) {
				toast.error(response.message)
				return
			}
			searchContext.setPropertyResults(response)
			mapContext.setCoords(response.coordinates)
			const firstRecord = response.records[0]
			searchContext.setAddressSearchQuery(`${firstRecord.prop_streetnumber} ${NormalizeStreetName(firstRecord.prop_streetname)}`)
			modalManagerContext.addPropertyModal(response.coordinates, `${firstRecord.prop_streetnumber} ${NormalizeStreetName(firstRecord.prop_streetname)}`, response)
		} catch (e) {
			toast.error("An error occurred. Please try again later")
			console.error("error fetching records: " + e)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [apiClientContext.propertyService, searchContext.searchBblQuery, searchContext.setPropertyResults, mapContext, location.pathname, modalManagerContext])
}

