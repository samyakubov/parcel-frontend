import { useCallback } from "react"
import useSearchByPropertyAddress from "../Search/useSearchByPropertyAddress"
import { NormalizeStreetName } from "../../Utils/NormalizeStreetName"
import { useLocation } from "react-router"
import useTypedNavigate from "../useTypedNavigate"
import {searchStore} from "../../Stores/SearchStore"

export default function useHandleSuggestionClick() {
	const searchByPropertyAddress = useSearchByPropertyAddress()
	const navigate = useTypedNavigate()
	const location = useLocation()
	return useCallback(async (suggestion: MapboxFeature) => {
		if (location.pathname === "/") {
			navigate("/map")
		}
		const selectedSuggestion = suggestion.place_name.split(",")[0].split(" ")
		searchStore.setAddressSearchQuery(selectedSuggestion[0] + " " + NormalizeStreetName(selectedSuggestion[1] + " " + selectedSuggestion[2]))
		searchStore.setSuggestions([])
		searchStore.setSelectedSuggestionIndex(-1)
		try {
			await searchByPropertyAddress()
			searchStore.setIsSuggestionsOpen(false)
		} catch (e) {
			searchStore.setSuggestionsError("Error selecting address. Please try again.")
		}
	}, [location.pathname, navigate, searchByPropertyAddress, searchStore])
}
