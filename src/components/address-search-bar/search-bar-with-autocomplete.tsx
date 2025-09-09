import {Input} from "@/components/ui/input"
import {searchStore} from "@/stores/search-store"
import {Button} from "@/components/ui/button"
import SuggestionsList from "@/components/address-search-bar/suggestions-list"
import useAddressAutocomplete from "@/hooks/mapbox/search-with-autocomplete/use-address-auto-complete"
import {useEffect} from "react"
import {observer} from "mobx-react"


function SearchBarWithAutocomplete() {
	const addressAutocomplete = useAddressAutocomplete()

	useEffect(() => {
		if (searchStore._addressSearchQuery.length < 2) {
			return searchStore.setIsSuggestionsOpen(false)
		}
		void addressAutocomplete()
	}, [addressAutocomplete, searchStore._addressSearchQuery])

	return (
		<div className="relative">
			<div className="flex gap-4">
				<Input
					placeholder="Enter property address"
					className="border-border flex-grow bg-white"
					value={searchStore._addressSearchQuery}
					onChange={(e)=> searchStore.setAddressSearchQuery(e.target.value)}
				/>
				<Button className="bg-primary hover:bg-primary/90 text-background px-8 py-3 rounded-full">
                    Search
				</Button>
			</div>

			{searchStore._isSuggestionsOpen && searchStore._suggestions.length > 0 && (
				<div className="absolute top-full left-0 right-0 mt-1">
					<SuggestionsList/>
				</div>
			)}
		</div>
	)
}

export default observer(SearchBarWithAutocomplete)
