import { useCallback } from "react"
import {useApiClientContext} from "../../Contexts/ApiClientContext"
import isHTTPError from "../../Utils/HTTPError"
import {toast} from "react-toastify"
import {API_RESPONSE_LIMIT} from "../../Constants/Constants"
import {useSearchContext} from "../../Contexts/SearchContext"

export default function useAdvancedSearch(): () => Promise<void> {
	const apiClientContext = useApiClientContext()
	const searchContext = useSearchContext()

	return useCallback(async () => {
		try {
			const response = await apiClientContext.propertyService.searchAdvancedSearch(searchContext.advancedSearchQuery, API_RESPONSE_LIMIT)
			if (isHTTPError(response)) {
				toast.error(response.message)
				return
			}
			searchContext.setAdvancedSearchResults(response.records)
		} catch (e) {
			console.error("error fetching records: " + e)
			toast.error("An error occurred. Please try again later.")
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[apiClientContext.propertyService, searchContext.advancedSearchQuery])
}
