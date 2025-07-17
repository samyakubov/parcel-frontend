import { useCallback } from "react"
import isHTTPError from "../../Utils/HTTPError"
import {toast} from "react-toastify"
import {API_RESPONSE_LIMIT} from "../../Constants/Constants"
import {apiClientService} from "../../Services/ApiClientService"
import {searchStore} from "../../Stores/SearchStore"

export default function useAdvancedSearch(): () => Promise<void> {

	return useCallback(async () => {
		try {
			const response = await apiClientService.propertyService.searchAdvancedSearch(searchStore.advancedSearchQuery, API_RESPONSE_LIMIT)
			if (isHTTPError(response)) {
				toast.error(response.message)
				return
			}
			searchStore.setAdvancedSearchResults(response.records)
		} catch (e) {
			console.error("error fetching records: " + e)
			toast.error("An error occurred. Please try again later.")
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[apiClientService.propertyService, searchStore.advancedSearchQuery])
}
