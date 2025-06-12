import {useCallback} from "react"
import { debounce } from "lodash-es"
import axios from "axios"
import {MAPBOX_API_URL, NYC_BOUNDS} from "../../Constants/Constants"
import {useSearchContext} from "../../Contexts/SearchContext"

const NYC_CENTER = {
	longitude: -73.935242,
	latitude: 40.730610
}

export default function useAddressAutocomplete() {
	const accessToken = process.env.REACT_APP_MAPBOX_API_KEY
	const searchContext = useSearchContext()
	const [southwest, northeast] = NYC_BOUNDS

	return useCallback(
		debounce(async () => {
			const { searchAddressQuery } = searchContext
			if (searchAddressQuery.length < 2) {
				return
			}
			searchContext.setSuggestionsError(null)
			try {
				const encodedQuery = encodeURIComponent(searchAddressQuery)
				const response = await axios.get(
					`${MAPBOX_API_URL}/${encodedQuery}.json`,
					{
						params: {
							access_token: accessToken,
							types: "address",
							limit: 5,
							bbox: `${southwest[0]},${southwest[1]},${northeast[0]},${northeast[1]}`,
							proximity: `${NYC_CENTER.longitude},${NYC_CENTER.latitude}`,
							country: "US",
							context: "region.8398",
						},
					}
				)

				searchContext.setSuggestions(response.data.features)
				searchContext.setIsSuggestionsOpen(true)
				searchContext.setSelectedSuggestionIndex(-1)
			} catch (error) {
				searchContext.setSuggestionsError(
					"Error fetching suggestions. Please try again."
				)
				searchContext.setSuggestions([])
			}
		}, 300),
		[searchContext, accessToken]
	)
}
