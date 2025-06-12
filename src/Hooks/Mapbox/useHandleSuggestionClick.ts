import { useCallback } from "react"
import useSearchByPropertyAddress from "../Search/useSearchByPropertyAddress"
import { useSearchContext } from "../../Contexts/SearchContext"
import { NormalizeStreetName } from "../../Utils/NormalizeStreetName"
import { useLocation } from "react-router"
import useTypedNavigate from "../useTypedNavigate"

export default function useHandleSuggestionClick() {
	const searchByPropertyAddress = useSearchByPropertyAddress()
	const searchContext = useSearchContext()
	const navigate = useTypedNavigate()
	const location = useLocation()
	return useCallback(async (suggestion: MapboxFeature) => {
		if (location.pathname === "/") {
			navigate("/map")
		}
		const selectedSuggestion = suggestion.place_name.split(",")[0].split(" ")
		searchContext.setAddressSearchQuery(selectedSuggestion[0] + " " + NormalizeStreetName(selectedSuggestion[1] + " " + selectedSuggestion[2]))
		searchContext.setSuggestions([])
		searchContext.setSelectedSuggestionIndex(-1)
		try {
			await searchByPropertyAddress()
			searchContext.setIsSuggestionsOpen(false)
		} catch (e) {
			searchContext.setSuggestionsError("Error selecting address. Please try again.")
		}
	}, [location.pathname, navigate, searchByPropertyAddress, searchContext])
}
