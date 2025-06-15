import {useCallback} from "react"
import { debounce } from "lodash-es"
import axios from "axios"
import {MAPBOX_API_URL, NYC_BOUNDS} from "../../Constants/Constants"
import {searchStore} from "../../Stores/SearchStore"

const NYC_CENTER = {
	longitude: -73.935242,
	latitude: 40.730610
}

export default function useAddressAutocomplete() {
	const accessToken = process.env.REACT_APP_MAPBOX_API_KEY
	const [southwest, northeast] = NYC_BOUNDS

	return useCallback(
		debounce(async () => {
			const { searchAddressQuery } = searchStore
			if (searchAddressQuery.length < 2) {
				return
			}
			searchStore.setSuggestionsError(null)
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

				searchStore.setSuggestions(response.data.features)
				searchStore.setIsSuggestionsOpen(true)
				searchStore.setSelectedSuggestionIndex(-1)
			} catch (error) {
				searchStore.setSuggestionsError("Error fetching suggestions. Please try again.")
				searchStore.setSuggestions([])
			}
		}, 300),
		[searchStore, accessToken]
	)
}
