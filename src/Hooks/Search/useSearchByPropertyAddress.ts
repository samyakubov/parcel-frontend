import { useCallback } from "react"
import { useApiClientContext } from "../../Contexts/ApiClientContext"
import isHTTPError from "../../Utils/HTTPError"
import { useSearchContext } from "../../Contexts/SearchContext"
import { toast } from "react-toastify"
import { API_RESPONSE_LIMIT } from "../../Constants/Constants"
import isEmpty from "lodash-es/isEmpty"
import { useMapContext } from "../../Contexts/MapContext"
import { useLocation } from "react-router"
import { useModalManagerContext } from "../../Contexts/ModalManagerContext"
import {NormalizeStreetName} from "../../Utils/NormalizeStreetName"

export default function useSearchByPropertyAddress() {
	const apiClientContext = useApiClientContext()
	const searchContext = useSearchContext()
	const mapContext = useMapContext()
	const modalManagerContext = useModalManagerContext()
	const location = useLocation()

	return useCallback(async () => {
		try {
			if (isEmpty(searchContext.searchAddressQuery)) return

			searchContext.setIsSearchResultLoading(true)
			const response = await apiClientContext.propertyService.searchByPropertyAddress(searchContext.searchAddressQuery, API_RESPONSE_LIMIT)
			searchContext.setIsSearchResultLoading(false)

			if (isHTTPError(response)) {
				return toast.error(response.message)
			}
			searchContext.setPropertyResults(response)
			mapContext.setCoords(response.coordinates)
			const firstRecord = response.records[0]
			searchContext.setSearchBblQuery(firstRecord.bbl)
			modalManagerContext.addPropertyModal(response.coordinates, `${firstRecord.prop_streetnumber} ${NormalizeStreetName(firstRecord.prop_streetname)}`, response)
		} catch (e) {
			console.error("Error fetching records:", e)
			toast.error("An error occurred. Please try again later.")
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [apiClientContext.propertyService, searchContext.searchAddressQuery, searchContext.setPropertyResults, mapContext, location.pathname, modalManagerContext])
}
