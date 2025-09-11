"use client"
import React from "react"
import { MapPin } from "lucide-react"
import useHandleSuggestionClick from "@/hooks/mapbox/search-with-autocomplete/use-handle-suggestion-click"

interface SuggestionItemProps {
    suggestion: MapboxFeature;
}

export default function SuggestionItem ({ suggestion }: SuggestionItemProps) {
	const handleSuggestionClick = useHandleSuggestionClick()


	return (
		<li
			key={suggestion.id}
			onClick={ () => {
				handleSuggestionClick(suggestion)
			}}
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
	)
}
