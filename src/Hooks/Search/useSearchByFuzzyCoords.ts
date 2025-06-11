import { useCallback } from "react"
import { useApiClientContext } from "../../Contexts/ApiClientContext"
import isHTTPError from "../../Utils/HTTPError"
import { toast } from "react-toastify"
import { API_RESPONSE_LIMIT } from "../../Constants/Constants"
import isNull from "lodash-es/isNull"
import { useMapContext } from "../../Contexts/MapContext"
import { useSearchContext } from "../../Contexts/SearchContext"
import { useModalManagerContext } from "../../Contexts/ModalManagerContext"
import {NormalizeStreetName} from "../../Utils/NormalizeStreetName"

export default function useSearchByFuzzyCoords() {
	const apiClientContext = useApiClientContext()
	const mapContext = useMapContext()
	const searchContext = useSearchContext()
	const modalManager = useModalManagerContext()

	return useCallback(async () => {
		try {
			if (isNull(mapContext.coords)) return

			searchContext.setIsSearchResultLoading(true)
			const response = await apiClientContext.propertyService.searchByPropertyFuzzyCoords(
				{ latitude: mapContext.coords.latitude, longitude: mapContext.coords.longitude },
				API_RESPONSE_LIMIT
			)
			searchContext.setIsSearchResultLoading(false)

			if (isHTTPError(response)) {
				return toast.error(response.message)
			}

			searchContext.setPropertyResults(response)
			const firstRecord = response.records[0]

			searchContext.setAddressSearchQuery(`${firstRecord.prop_streetnumber.toLowerCase()} ${NormalizeStreetName(firstRecord.prop_streetname.toLowerCase())}`)
			searchContext.setSearchBblQuery(firstRecord.bbl)

			mapContext.setCoords(response.coordinates)

			modalManager.addPropertyModal(response.coordinates, `${firstRecord.prop_streetnumber} ${NormalizeStreetName(firstRecord.prop_streetname)}`, response)
		} catch (e) {
			console.error("error fetching records: " + e)
			toast.error("An error occurred. Please try again later.")
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [apiClientContext.propertyService, mapContext, searchContext, mapContext.coords, modalManager])
}
