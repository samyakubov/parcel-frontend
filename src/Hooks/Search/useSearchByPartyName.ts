import { useCallback } from "react"
import {useApiClientContext} from "../../Contexts/ApiClientContext"
import isHTTPError from "../../Utils/HTTPError"
import {useSearchContext} from "../../Contexts/SearchContext"
import {toast} from "react-toastify"
import {API_RESPONSE_LIMIT} from "../../Constants/Constants"
import isEmpty from "lodash-es/isEmpty"

export default function useSearchByPartyName(): () => Promise<void> {
	const apiClientContext = useApiClientContext()
	const searchContext = useSearchContext()

	return useCallback(async () => {
		try {
			if (isEmpty(searchContext.searchNameQuery)) {
				toast.error("Search query is empty. Please provide a valid name.")
				return
			}
			const response = await apiClientContext.partyService.searchByPartyName(searchContext.searchNameQuery, API_RESPONSE_LIMIT)
			if (isHTTPError(response)) {
				toast.error(response.message)
				return
			}
			searchContext.setPartyResults(response)
		} catch (e) {
			console.error("error fetching records: " + e)
			toast.error("An error occurred. Please try again later.")
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[apiClientContext.partyService, searchContext.searchNameQuery, searchContext])
}
