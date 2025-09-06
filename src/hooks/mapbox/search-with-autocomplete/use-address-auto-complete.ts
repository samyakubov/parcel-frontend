import {useCallback} from "react"
import { debounce } from "lodash-es"
import axios from "axios"
import {searchStore} from "@/stores/search-store"
import {NYC_BOUNDS, NYC_CENTER} from "@/constants/mapbox"

export default function useAddressAutocomplete() {
	const accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY
	const [southwest, northeast] = NYC_BOUNDS

	return useCallback(
		debounce(async () => {
			const { addressSearchQuery } = searchStore
			if (addressSearchQuery.length < 2) {
				return
			}
			searchStore.setSuggestionsError(null)
			try {
				const encodedQuery = encodeURIComponent(addressSearchQuery)
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_MAPBOX_API_URL}/${encodedQuery}.json`,
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
			} catch {
				searchStore.setSuggestionsError("Error fetching suggestions. Please try again.")
				searchStore.setSuggestions([])
			}
		}, 300),
		[searchStore.addressSearchQuery, accessToken]
	)
}
