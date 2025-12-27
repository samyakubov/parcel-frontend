"use client"
import React, { useEffect, useRef } from "react"
import { searchStore } from "@/stores/search-store"
import SuggestionItem from "@/components/address-search-bar/suggestion-item"
import { observer } from "mobx-react"

function SuggestionsList() {
	const suggestionsRef = useRef<HTMLUListElement>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
				searchStore.setIsSuggestionsOpen(false)
			}
		}

		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [])

	return (
		<ul
			ref={suggestionsRef}
			className="absolute w-full mt-2 bg-popover/90 dark:bg-popover/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-xl shadow-2xl max-h-60 overflow-auto p-1"
		>
			{searchStore._suggestions.map((suggestion) => (
				<SuggestionItem key={suggestion.id} suggestion={suggestion} />
			))}
		</ul>
	)
}

export default observer(SuggestionsList)
