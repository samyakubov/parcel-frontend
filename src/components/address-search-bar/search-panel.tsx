"use client"
import { Input } from "@/components/ui/input"
import { searchStore } from "@/stores/search-store"
import SuggestionsList from "@/components/address-search-bar/suggestions-list"
import useAddressAutocomplete from "@/hooks/mapbox/search-with-autocomplete/use-address-auto-complete"
import { useState, useEffect, useRef } from "react"
import { observer } from "mobx-react"
import useSearchByBbl from "@/hooks/property-search/use-search-by-bbl"
import useSearchByAddress from "@/hooks/property-search/use-search-by-address"
import { MapPin, Hash } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CustomTooltip from "@/components/custom-tooltip"
import { uiStore } from "@/stores/ui-store"

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
	const [isMounted, setIsMounted] = useState(false)
	const { fetch: addressAutocomplete } = useAddressAutocomplete()
	const searchByBbl = useSearchByBbl()
	const searchByAddress = useSearchByAddress()
	const searchPanelRef = useRef<HTMLDivElement>(null)

	const currentMode = SEARCH_MODES[searchMode]
	const isMobile = isMounted ? uiStore.isMobileView : false
	const isSearchPanelActive = uiStore._activeMobilePanel === "search"


	useEffect(() => {
		setIsMounted(true)
	}, [])


	useEffect(() => {
		if (!isMobile || !isSearchPanelActive) return

		const handleClickOutside = (event: MouseEvent) => {
			if (searchPanelRef.current && !searchPanelRef.current.contains(event.target as Node)) {
				uiStore.setActiveMobilePanel(null)
				searchStore.setIsSuggestionsOpen(false)
			}
		}


		const timeoutId = setTimeout(() => {
			document.addEventListener("mousedown", handleClickOutside)
		}, 100)

		return () => {
			clearTimeout(timeoutId)
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [isMobile, isSearchPanelActive])

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
		"shadow-2xl shadow-black/10 dark:shadow-black/30 overflow-hidden",
		"fixed top-0 left-0 right-0 z-40 transition-transform duration-300",

		isMobile && isSearchPanelActive && "will-change-transform",
		isMobile && !isSearchPanelActive && "-translate-y-full",
		isMobile && isSearchPanelActive && "translate-y-0",
		"md:w-[420px] md:relative md:translate-y-0 md:z-10",
		"motion-reduce:transition-none"
	)

	const wrapperClasses = cn(
		"w-full relative",
		"md:w-[420px]"
	)

	const suggestionsWrapperClasses = cn(
		"fixed left-0 right-0 px-4 z-50",
		"md:relative md:px-0 md:mt-2"
	)

	return (
		<div className={wrapperClasses} ref={searchPanelRef}>
			<div className={containerClasses}>
				<div className="p-4">
					<div className="flex gap-2">
						<Input
							placeholder={currentMode.placeholder}
							className={cn(
								"bg-muted/30 border-border/50 rounded-xl",
								"focus:bg-background focus:border-primary/50 transition-all",
								"h-12",
								"md:h-11"
							)}
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
							<TabsList className={cn(
								"rounded-xl",
								"h-12",
								"md:h-11"
							)}>
								<CustomTooltip
									tooltipTrigger={
										<TabsTrigger value="address" className="h-11 w-11 md:h-9 md:w-9 p-0 cursor-pointer">
											<MapPin className="w-4 h-4" />
										</TabsTrigger>
									}
									tooltipContent="Search by Address"
								/>
								<CustomTooltip
									tooltipTrigger={
										<TabsTrigger value="bbl" className="h-11 w-11 md:h-9 md:w-9 p-0 cursor-pointer">
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
				<div
					className={suggestionsWrapperClasses}
					style={isMobile ? { top: "80px" } : undefined}
				>
					<SuggestionsList />
				</div>
			)}
		</div>
	)
}

export default observer(SearchPanel)
