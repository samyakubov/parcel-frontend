import { Input } from "@/components/ui/input"
import { searchStore } from "@/stores/search-store"
import { Button } from "@/components/ui/button"
import SuggestionsList from "@/components/address-search-bar/suggestions-list"
import useAddressAutocomplete from "@/hooks/mapbox/search-with-autocomplete/use-address-auto-complete"
import { observer } from "mobx-react"


function SearchBarWithAutocomplete() {
	const { fetch: addressAutocomplete } = useAddressAutocomplete()

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		searchStore.setAddressSearchQuery(value)

		if (value.length < 2) {
			searchStore.setIsSuggestionsOpen(false)
			return
		}

		addressAutocomplete()
	}

	return (
		<div className="relative shadow-xl rounded-full">
			<div className="flex gap-2 p-1.5 bg-background/80 dark:bg-background/60 backdrop-blur-xl
			border border-white/20 dark:border-white/10 rounded-full
			 transition-all duration-300 hover:shadow-2xl hover:bg-background/90 dark:hover:bg-background/70">
				<Input
					placeholder="Enter property address"
					className="flex-grow bg-transparent border-none shadow-none
					focus-visible:ring-0 px-4 h-11 text-base placeholder:text-muted-foreground/70"
					value={searchStore._addressSearchQuery}
					onChange={handleInputChange}
				/>
				<Button className="rounded-full px-6 h-11 text-base font-semibold shadow-lg
				shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">
					Search
				</Button>
			</div>

			{searchStore._isSuggestionsOpen && searchStore._suggestions.length > 0 && (
				<div className="absolute top-full left-0 right-0 mt-3 px-2 z-50">
					<SuggestionsList />
				</div>
			)}
		</div>
	)
}

export default observer(SearchBarWithAutocomplete)
