"use client"
import { Input } from "@/components/ui/input"
import { searchStore } from "@/stores/search-store"
import { Button } from "@/components/ui/button"
import SuggestionsList from "@/components/address-search-bar/suggestions-list"
import useAddressAutocomplete from "@/hooks/mapbox/search-with-autocomplete/use-address-auto-complete"
import { useState } from "react"
import { observer } from "mobx-react"
import useSearchByBbl from "@/hooks/property-search/use-search-by-bbl"
import useSearchByAddress from "@/hooks/property-search/use-search-by-address"
import { Search, MapPin, Hash, ChevronDown, LucideIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type SearchMode = "address" | "bbl"

interface SearchModeConfig {
	id: SearchMode
	label: string
	icon: LucideIcon
	placeholder: string
}

const SEARCH_MODES: SearchModeConfig[] = [
	{
		id: "address",
		label: "Address",
		icon: MapPin,
		placeholder: "Enter property address..."
	},
	{
		id: "bbl",
		label: "BBL",
		icon: Hash,
		placeholder: "Enter BBL (e.g. 1000010001)"
	},
]

interface ModeDropdownProps {
	currentMode: SearchModeConfig
	isOpen: boolean
	onToggle: () => void
	onSelect: (mode: SearchMode) => void
	activeMode: SearchMode
}

function ModeDropdown({ currentMode, isOpen, onToggle, onSelect, activeMode }: ModeDropdownProps) {
	const CurrentIcon = currentMode.icon
	const chevronClasses = [
		"w-3.5 h-3.5 text-muted-foreground transition-transform",
		isOpen ? "rotate-180" : ""
	].join(" ")

	const containerClasses = [
		"absolute top-full left-0 mt-1.5 bg-popover",
		"border border-border/50 rounded-lg shadow-xl z-50 overflow-hidden"
	].join(" ")

	return (
		<div className="relative">
			<button
				onClick={onToggle}
				className="flex items-center gap-2 px-3 py-1.5 rounded-lg
					bg-muted/50 hover:bg-muted transition-colors text-sm font-medium"
			>
				<CurrentIcon className="w-3.5 h-3.5 text-muted-foreground" />
				<span>Search by {currentMode.label}</span>
				<ChevronDown className={chevronClasses} />
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, y: -8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						transition={{ duration: 0.15 }}
						className={containerClasses}
					>
						{SEARCH_MODES.map((mode) => {
							const isActive = activeMode === mode.id
							const activeClasses = isActive
								? "bg-primary/10 text-primary"
								: "text-foreground"
							const itemClasses = [
								"flex items-center gap-2.5 w-full px-3 py-2",
								"text-sm hover:bg-muted/50 transition-colors",
								activeClasses
							].join(" ")

							return (
								<button
									key={mode.id}
									onClick={() => onSelect(mode.id)}
									className={itemClasses}
								>
									<mode.icon className="w-4 h-4" />
									<span>{mode.label}</span>
								</button>
							)
						})}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

function SearchPanel() {
	const [searchMode, setSearchMode] = useState<SearchMode>("address")
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	const { fetch: addressAutocomplete } = useAddressAutocomplete()
	const searchByBbl = useSearchByBbl()
	const searchByAddress = useSearchByAddress()

	const currentMode = SEARCH_MODES.find(m => m.id === searchMode) ?? SEARCH_MODES[0]
	const CurrentIcon = currentMode.icon

	const handleSearch = () => {
		if (searchMode === "address") {
			void searchByAddress()
		} else {
			void searchByBbl()
		}
	}

	const handleModeSelect = (mode: SearchMode) => {
		setSearchMode(mode)
		setIsDropdownOpen(false)
	}

	const inputValue = searchMode === "address"
		? searchStore._addressSearchQuery
		: searchStore._bblSearchQuery

	const showSuggestions = searchMode === "address"
        && searchStore._isSuggestionsOpen
        && searchStore._suggestions.length > 0

	const containerClasses = [
		"relative bg-background/95 dark:bg-background/90 backdrop-blur-2xl",
		"border border-border/50 dark:border-white/10 rounded-2xl",
		"shadow-2xl shadow-black/10 dark:shadow-black/30 overflow-hidden"
	].join(" ")

	return (
		<div className="w-[420px]">
			<div className={containerClasses}>
				<div className="px-4 pt-3 pb-2">
					<ModeDropdown
						currentMode={currentMode}
						isOpen={isDropdownOpen}
						onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
						onSelect={handleModeSelect}
						activeMode={searchMode}
					/>
				</div>

				<div className="px-4 pb-4">
					<div className="flex gap-2">
						<div className="relative flex-1">
							<CurrentIcon
								className="absolute left-3 top-1/2 -translate-y-1/2
									w-4 h-4 text-muted-foreground"
							/>
							<Input
								placeholder={currentMode.placeholder}
								className="pl-10 h-11 bg-muted/30 border-border/50 rounded-xl
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
						</div>
						<Button
							onClick={handleSearch}
							className="h-11 px-5 rounded-xl font-semibold shadow-lg
								shadow-primary/20 hover:shadow-primary/30 transition-all"
						>
							<Search className="w-4 h-4 mr-2" />
							Search
						</Button>
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
