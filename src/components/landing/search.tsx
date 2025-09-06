"use client"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {useEffect} from "react"
import {searchStore} from "@/stores/search-store"
import useAddressAutocomplete from "@/hooks/mapbox/search-with-autocomplete/use-address-auto-complete"
import SuggestionsList from "@/components/address-search-bar/suggestions-list"
import {observer} from "mobx-react-lite"

function Search() {
	const addressAutocomplete = useAddressAutocomplete()

	useEffect(() => {
		if (searchStore.addressSearchQuery.length < 2) {
			return searchStore.setIsSuggestionsOpen(false)
		}
		void addressAutocomplete()
	}, [addressAutocomplete, searchStore.addressSearchQuery])

	return (
		<div className="mx-auto">
			<div className="bg-card rounded-2xl shadow-2xl p-8">
				<h2 className="text-3xl font-bold text-foreground mb-8">Find your home&apos;s history</h2>

				<div className="flex flex-col gap-4">
					<label className="block text-sm font-medium text-muted-foreground">
                        Enter a property address to see its full history
					</label>

					<div className="relative">
						<div className="flex gap-4">
							<Input
								placeholder="Enter property address"
								className="border-border flex-grow"
								value={searchStore.addressSearchQuery}
								onChange={(e)=> searchStore.setAddressSearchQuery(e.target.value)}
							/>
							<Button className="bg-primary hover:bg-primary/90 text-background px-8 py-3 rounded-full">
                                Search Address
							</Button>
						</div>

						{searchStore.isSuggestionsOpen && searchStore.suggestions.length > 0 && (
							<div className="absolute top-full left-0 right-0 mt-1">
								<SuggestionsList/>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default observer(Search)
