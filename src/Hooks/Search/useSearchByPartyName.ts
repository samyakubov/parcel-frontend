import { useCallback } from "react"
import isHTTPError from "../../Utils/HTTPError"
import {toast} from "react-toastify"
import {API_RESPONSE_LIMIT} from "../../Constants/Constants"
import isEmpty from "lodash-es/isEmpty"
import {apiClientStore} from "../../Stores/ApiClientStore"
import {searchStore} from "../../Stores/SearchStore"

export default function useSearchByPartyName(): () => Promise<void> {

	return useCallback(async () => {
		try {
			if (isEmpty(searchStore.searchNameQuery)) {
				toast.error("Search query is empty. Please provide a valid name.")
				return
			}
			const response = await apiClientStore.partyService.searchByPartyName(searchStore.searchNameQuery, API_RESPONSE_LIMIT)
			if (isHTTPError(response)) {
				toast.error(response.message)
				return
			}
			searchStore.setPartyResults(response)
		} catch (e) {
			console.error("error fetching records: " + e)
			toast.error("An error occurred. Please try again later.")
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[apiClientStore.partyService, searchStore.searchNameQuery, searchStore])
}
