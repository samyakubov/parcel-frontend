"use client"
import React, {useEffect, useRef} from "react"
import {searchStore} from "@/stores/search-store"
import SuggestionItem from "@/components/address-search-bar/suggestion-item"

export default function SuggestionsList() {
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
			className="absolute w-10/12 mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-60 overflow-auto"
		>
			{searchStore._suggestions.map((suggestion) => (
				<SuggestionItem key={suggestion.id} suggestion={suggestion} />
			))}
		</ul>
	)
}
