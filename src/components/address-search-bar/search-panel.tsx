"use client"
import { Input } from "@/components/ui/input"
import { searchStore } from "@/stores/search-store"
import SuggestionsList from "@/components/address-search-bar/suggestions-list"
import useAddressAutocomplete from "@/hooks/mapbox/search-with-autocomplete/use-address-auto-complete"
import { useState } from "react"
import { observer } from "mobx-react"
import useSearchByBbl from "@/hooks/property-search/use-search-by-bbl"
import useSearchByAddress from "@/hooks/property-search/use-search-by-address"
import { MapPin, Hash } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CustomTooltip from "@/components/custom-tooltip"

type SearchMode = "address" | "bbl"

interface SearchModeConfig {
	id: SearchMode
	label: string
	placeholder: string
}

const SEARCH_MODES: Record<SearchMode, SearchModeConfig> = {
	address: {
		id: "address",
		label: "Address",
		placeholder: "Enter property address..."
	},
	bbl: {
		id: "bbl",
		label: "BBL",
		placeholder: "Enter BBL (e.g. 1000010001)"
	},
}

function SearchPanel() {
	const [searchMode, setSearchMode] = useState<SearchMode>("address")
	const { fetch: addressAutocomplete } = useAddressAutocomplete()
	const searchByBbl = useSearchByBbl()
	const searchByAddress = useSearchByAddress()

	const currentMode = SEARCH_MODES[searchMode]

	const handleSearch = () => {
		if (searchMode === "address") {
			void searchByAddress()
			return
		}
		void searchByBbl()
	}

	const inputValue = searchMode === "address"
		? searchStore._addressSearchQuery
		: searchStore._bblSearchQuery

	const showSuggestions = searchMode === "address"
		&& searchStore._isSuggestionsOpen
		&& searchStore._suggestions.length > 0

	const containerClasses = cn(
		"relative bg-background/95 dark:bg-background/90 backdrop-blur-2xl",
		"border border-border/50 dark:border-white/10 rounded-2xl",
		"shadow-2xl shadow-black/10 dark:shadow-black/30 overflow-hidden"
	)

	return (
		<div className="w-[420px]">
			<div className={containerClasses}>
				<div className="p-4">
					<div className="flex gap-2">
						<Input
							placeholder={currentMode.placeholder}
							className="h-11 bg-muted/30 border-border/50 rounded-xl
								focus:bg-background focus:border-primary/50 transition-all"
							value={inputValue}
							onChange={(e) => {
								if (searchMode === "address") {
									searchStore.setAddressSearchQuery(e.target.value)
									if (e.target.value.length >= 2) {
										addressAutocomplete()
									} else {
										searchStore.setIsSuggestionsOpen(false)
									}
								} else {
									searchStore.setBblSearchQuery(e.target.value)
								}
							}}
							onKeyDown={(e) => e.key === "Enter" && handleSearch()}
						/>
						<Tabs value={searchMode} onValueChange={(v) => setSearchMode(v as SearchMode)}>
							<TabsList className="h-11! rounded-xl">
								<CustomTooltip
									tooltipTrigger={
										<TabsTrigger value="address" className="h-9 w-9 p-0 cursor-pointer">
											<MapPin className="w-4 h-4" />
										</TabsTrigger>
									}
									tooltipContent="Search by Address"
								/>
								<CustomTooltip
									tooltipTrigger={
										<TabsTrigger value="bbl" className="h-9 w-9 p-0 cursor-pointer">
											<Hash className="w-4 h-4" />
										</TabsTrigger>
									}
									tooltipContent="Search by BBL"
								/>
							</TabsList>
						</Tabs>
					</div>
				</div>
			</div>

			{showSuggestions && (
				<div className="mt-2">
					<SuggestionsList />
				</div>
			)}
		</div>
	)
}

export default observer(SearchPanel)
