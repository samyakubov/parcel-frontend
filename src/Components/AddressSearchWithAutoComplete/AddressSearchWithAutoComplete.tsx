import React, { useEffect, useRef } from "react"
import useAddressAutocomplete from "../../Hooks/Mapbox/useAddressAutocomplete"
import SuggestionsList from "./SuggestionsList"
import { observer } from "mobx-react"
import SearchBar from "../SearchBar"
import useSearchByPropertyAddress from "../../Hooks/Search/useSearchByPropertyAddress"
import {searchStore} from "../../Stores/SearchStore"

function AddressSearchWithAutocomplete() {
	const addressAutocomplete = useAddressAutocomplete()
	const inputRef = useRef<HTMLInputElement>(null)
	const suggestionsRef = useRef<HTMLUListElement>(null)
	const searchByAddress = useSearchByPropertyAddress()
	useEffect(() => {
		if (searchStore.searchAddressQuery.length < 2) {
			return searchStore.setIsSuggestionsOpen(false)
		}
		void addressAutocomplete()
	}, [addressAutocomplete, searchStore, searchStore.searchAddressQuery])

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				suggestionsRef.current &&
				!suggestionsRef.current.contains(event.target as Node) &&
				!inputRef.current?.contains(event.target as Node)
			) {
				searchStore.setIsSuggestionsOpen(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [searchStore])

	return (
		<div className="p-2">
			<div className="relative">
				<SearchBar
					ref={inputRef}
					handleSearch={searchByAddress}
					onKeyDown={searchByAddress}
					query={searchStore.searchAddressQuery}
					onQueryChange={searchStore.setAddressSearchQuery}
					placeholder="Enter an address..."
					inputClassName="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
				/>
				{searchStore.suggestionsError && (
					<div className="mt-2 text-red-500 text-sm">
						{searchStore.suggestionsError}
					</div>
				)}
				{searchStore.isSuggestionsOpen && searchStore.suggestions.length > 0 && (
					<SuggestionsList suggestionsRef={suggestionsRef} />
				)}
			</div>
		</div>
	)
}

export default observer(AddressSearchWithAutocomplete)
