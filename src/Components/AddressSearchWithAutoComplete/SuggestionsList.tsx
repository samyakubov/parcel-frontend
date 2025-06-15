import React from "react"
import {MapPin} from "lucide-react"
import useHandleSuggestionClick from "../../Hooks/Mapbox/useHandleSuggestionClick"
import useDarkMode from "../../Hooks/useDarkMode"
import {searchStore} from "../../Stores/SearchStore"

interface SuggestionsListProps {
	suggestionsRef: React.RefObject<HTMLUListElement>
}

export default function SuggestionsList({ suggestionsRef }: SuggestionsListProps) {
	const handleSuggestionClick = useHandleSuggestionClick()
	const isDarkMode = useDarkMode()

	const getBackgroundClass = (isSelected: boolean) => {
		if (isSelected) {
			return isDarkMode ? "bg-indigo-800" : "bg-indigo-400"
		}
		return ""
	}

	const getHoverClass = () => {
		return isDarkMode ? "hover:bg-indigo-900" : "hover:bg-indigo-300"
	}

	const handleClick = async (suggestion:MapboxFeature)=>{
		searchStore.setIsSearchResultLoading(true)
		await handleSuggestionClick(suggestion)
		searchStore.setIsSearchResultLoading(false)
	}
	return (
		<ul
			ref={suggestionsRef}
			className={`
                absolute z-10 w-full mt-1 rounded-lg shadow-lg max-h-60 overflow-auto
                ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
                border
            `}
		>
			{searchStore.suggestions.map((suggestion, index) => (
				<li
					key={suggestion.id}
					onClick={() => handleClick(suggestion)}
					className={`
                        px-4 py-3 cursor-pointer transition-colors duration-150 
                        flex items-center gap-3
                        ${isDarkMode ? "text-gray-100" : "text-gray-900"}
                        ${getHoverClass()}
                        ${getBackgroundClass(index === searchStore.selectedSuggestionIndex)}
                    `}
				>

					<MapPin
						size={18}
						className={isDarkMode ? "text-gray-400" : "text-gray-500"}
					/>
					<div className="flex flex-col text-left">
						<span className={`
                            text-sm font-medium
                            ${isDarkMode ? "text-gray-100" : "text-gray-900"}
                        `}>
							{suggestion.place_name.split(",")[0]}
						</span>
						<span className={`
                            text-xs
                            ${isDarkMode ? "text-gray-400" : "text-gray-500"}
                        `}>
							{suggestion.place_name.split(",").slice(1).join(",")}
						</span>
					</div>
				</li>
			))}
		</ul>
	)
}
