import { searchStore } from "@/stores/search-store"

const mockSuggestion = {
    id: "1",
    type: "Feature" as const,
    place_type: ["address"],
    relevance: 1,
    properties: {},
    text: "123 Main St",
    place_name: "123 Main St, New York, NY",
    bbox: [-74.0060, 40.7128, -74.0060, 40.7128] as [number, number, number, number],
    center: [-74.0059, 40.7128] as [number, number],
    geometry: {
        type: "Point" as const,
        coordinates: [-74.0060, 40.7128] as [number, number]
    },
    context: [],
}

describe("SearchStore", () => {
    beforeEach(() => {
        searchStore.setAddressSearchQuery("")
        searchStore.setSuggestions([])
        searchStore.setIsSuggestionsOpen(false)
        searchStore.setSuggestionsError(null)
    })

    it("should have a default initial state", () => {
        expect(searchStore.addressSearchQuery).toBe("")
        expect(searchStore.suggestions).toEqual([])
        expect(searchStore.isSuggestionsOpen).toBe(false)
        expect(searchStore.suggestionsError).toBeNull()
    })

    it("should update the address search query", () => {
        searchStore.setAddressSearchQuery("123 Main St")
        expect(searchStore.addressSearchQuery).toBe("123 Main St")
    })

    it("should update the suggestions array", () => {
        searchStore.setSuggestions([mockSuggestion])
        expect(searchStore.suggestions).toEqual([mockSuggestion])
    })

    it("should update the suggestions visibility", () => {
        searchStore.setIsSuggestionsOpen(true)
        expect(searchStore.isSuggestionsOpen).toBe(true)
    })

    it("should update the suggestions error message", () => {
        searchStore.setSuggestionsError("An error occurred")
        expect(searchStore.suggestionsError).toBe("An error occurred")
    })

    it("should clear suggestions error when set to null", () => {
        searchStore.setSuggestionsError("An error occurred")
        expect(searchStore.suggestionsError).toBe("An error occurred")

        searchStore.setSuggestionsError(null)
        expect(searchStore.suggestionsError).toBeNull()
    })

    it("should handle multiple suggestions", () => {
        const multipleSuggestions = [
            mockSuggestion,
            { ...mockSuggestion, id: "2", place_name: "456 Oak Ave, Boston, MA" }
        ]

        searchStore.setSuggestions(multipleSuggestions)
        expect(searchStore.suggestions).toHaveLength(2)
        expect(searchStore.suggestions).toEqual(multipleSuggestions)
    })
})