import { searchStore } from "@/stores/search-store"

const mockSuggestion = {
	id: "1",
	type: "Feature",
	place_type: ["address"],
	relevance: 1,
	properties: {},
	text: "123 Main St",
	place_name: "123 Main St, New York, NY",
	bbox: [-74.0060, 40.7128, -74.0060, 40.7128],
	center: [-74.0060, 40.7128],
	geometry: { type: "Point", coordinates: [-74.0060, 40.7128] },
	context: [],
}

describe("SearchStore", () => {
	beforeEach(() => {
		// Reset the store before each test
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

	it("setAddressSearchQuery should update the address search query", () => {
		searchStore.setAddressSearchQuery("123 Main St")
		expect(searchStore.addressSearchQuery).toBe("123 Main St")
	})

	it("setSuggestions should update the suggestions array", () => {
		searchStore.setSuggestions([mockSuggestion])
		expect(searchStore.suggestions).toEqual([mockSuggestion])
	})

	it("setIsSuggestionsOpen should update the suggestions visibility", () => {
		searchStore.setIsSuggestionsOpen(true)
		expect(searchStore.isSuggestionsOpen).toBe(true)
	})

	it("setSuggestionsError should update the suggestions error message", () => {
		searchStore.setSuggestionsError("An error occurred")
		expect(searchStore.suggestionsError).toBe("An error occurred")
	})
})

