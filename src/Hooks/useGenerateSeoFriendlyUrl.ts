import { useEffect } from "react"
import { useSearchContext } from "../Contexts/SearchContext"

export default function useGenerateSeoFriendlyUrl(prefix = "") {
	const searchContext = useSearchContext()

	useEffect(() => {
		if (searchContext.searchAddressQuery) {
			const seoFriendlyUrl = searchContext.searchAddressQuery
				.toLowerCase()
				.replace(/\s+/g, "-")
				.replace(/[^a-z0-9-]/g, "")

			const cleanPrefix = prefix.replace(/^\/+|\/+$/g, "")
			const finalUrl = cleanPrefix
				? `/${cleanPrefix}/${seoFriendlyUrl}`
				: `/${seoFriendlyUrl}`

			window.history.pushState({}, "", finalUrl)
		}
	}, [searchContext.searchAddressQuery, prefix])
}
