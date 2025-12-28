import { useCallback } from "react"
import { searchStore } from "@/stores/search-store"
import { normalizeStreetNames } from "@/utils/normalize-street-names"
import { isEmpty } from "lodash-es"
import useSearchByAddress from "@/hooks/property-search/use-search-by-address"
import useAddressAutocomplete from "@/hooks/mapbox/search-with-autocomplete/use-address-auto-complete"


export default function useHandleSuggestionClick() {
	const searchByAddress = useSearchByAddress()
	const { cancel: cancelAutocomplete } = useAddressAutocomplete()

	return useCallback(async (suggestion: MapboxFeature) => {
		if (isEmpty(suggestion.place_name)) {
			return
		}

		// Cancel any pending autocomplete requests to prevent suggestions from reappearing
		cancelAutocomplete()

		const selectedSuggestion = suggestion.place_name.split(",")[0].split(" ")
		searchStore.setAddressSearchQuery(
			selectedSuggestion[0] + " " +
			normalizeStreetNames(selectedSuggestion[1] + " " + selectedSuggestion[2])
		)
		searchStore.setSuggestions([])
		searchStore.setIsSuggestionsOpen(false)
		try {
			await searchByAddress()
		} catch {
			searchStore.setSuggestionsError("Error selecting address. Please try again.")
		}
	}, [searchByAddress, cancelAutocomplete])
}
