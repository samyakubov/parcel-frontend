"use client"
import React, {useEffect, useRef} from "react"
import {MapPin} from "lucide-react"
import useHandleSuggestionClick from "@/hooks/mapbox/use-handle-suggestion-click"
import {searchStore} from "@/stores/search-store"


export default function SuggestionsList() {
	const handleSuggestionClick = useHandleSuggestionClick()
	const suggestionsRef = useRef<HTMLUListElement>(null)

	useEffect(() => {

		const handleClickOutside = (event: MouseEvent) => {
			if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
				searchStore.setIsSuggestionsOpen(false)
			}
		}

		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [searchStore])

	const handleClick = async (suggestion:MapboxFeature)=>{
		await handleSuggestionClick(suggestion)
	}

	return (
		<ul
			ref={suggestionsRef}
			className="absolute w-10/12 mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-60 overflow-auto"
		>
			{searchStore.suggestions.map((suggestion) => (
				<li
					key={suggestion.id}
					onClick={() => handleClick(suggestion)}
					className="px-4 py-3 cursor-pointer transition-colors duration-150
					    flex items-center gap-3 text-popover-foreground hover:bg-accent"
				>
					<MapPin
						size={18}
						className="text-muted-foreground"
					/>
					<div className="flex flex-col text-left">
						<span className="text-sm font-medium">
							{suggestion.place_name.split(",")[0]}
						</span>
						<span className="text-xs text-muted-foreground">
							{suggestion.place_name.split(",").slice(1).join(",")}
						</span>
					</div>
				</li>
			))}
		</ul>
	)
}
