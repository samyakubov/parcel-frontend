import { useCallback } from "react"
import {searchStore} from "@/stores/search-store"
import {normalizeStreetNames} from "@/utils/normalize-street-names"
import {isEmpty} from "lodash-es"

export default function useHandleSuggestionClick() {
	return useCallback((suggestion: MapboxFeature) => {
		if (isEmpty(suggestion.place_name)) {
			return
		}
		const selectedSuggestion = suggestion.place_name.split(",")[0].split(" ")
		searchStore.setAddressSearchQuery(selectedSuggestion[0] + " " +
            normalizeStreetNames(selectedSuggestion[1] + " " + selectedSuggestion[2]))
		searchStore.setSuggestions([])
		try {
			//TODO: add the api call here
			searchStore.setIsSuggestionsOpen(false)
		} catch (e) {
			searchStore.setSuggestionsError("Error selecting address. Please try again.")
		}
	}, [])
}
