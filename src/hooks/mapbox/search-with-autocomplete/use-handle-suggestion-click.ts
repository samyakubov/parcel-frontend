import {useCallback} from "react"
import {searchStore} from "@/stores/search-store"
import {normalizeStreetNames} from "@/utils/normalize-street-names"
import {isEmpty} from "lodash-es"
import useSearchByAddress from "@/hooks/property-search/use-search-by-address"


export default function useHandleSuggestionClick() {
    const searchByAddress = useSearchByAddress()
	return useCallback(async (suggestion: MapboxFeature) => {
		if (isEmpty(suggestion.place_name)) {
			return
		}
		const selectedSuggestion = suggestion.place_name.split(",")[0].split(" ")
		searchStore.setAddressSearchQuery(
            selectedSuggestion[0] + " " +
            normalizeStreetNames(selectedSuggestion[1] + " " + selectedSuggestion[2])
        )
		searchStore.setSuggestions([])
		try {
            await searchByAddress()
			searchStore.setIsSuggestionsOpen(false)
		} catch {
			searchStore.setSuggestionsError("Error selecting address. Please try again.")
		}
	}, [searchByAddress])
}
