import { useCallback, useRef } from "react"
import { debounce, DebouncedFunc } from "lodash-es"
import axios from "axios"
import { searchStore } from "@/stores/search-store"
import { NYC_BOUNDS, NYC_CENTER } from "@/constants/mapbox"

type FetchFn = (addressSearchQuery: string, token: string) => Promise<void>

export default function useAddressAutocomplete() {
	const accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string

	const debouncedFetchRef = useRef<DebouncedFunc<FetchFn> | null>(null)

	if (!debouncedFetchRef.current) {
		debouncedFetchRef.current = debounce(async (addressSearchQuery: string, token: string) => {
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
							access_token: token,
							types: "address",
							limit: 5,
							bbox: `${NYC_BOUNDS[0][0]},${NYC_BOUNDS[0][1]},${NYC_BOUNDS[1][0]},${NYC_BOUNDS[1][1]}`,
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
		}, 300)
	}

	const fetch = useCallback(() => {
		if (debouncedFetchRef.current) {
			debouncedFetchRef.current(searchStore._addressSearchQuery, accessToken)
		}
	}, [accessToken])

	return { fetch }
}
