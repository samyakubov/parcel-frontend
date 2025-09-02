import { renderHook } from "@testing-library/react"
import useHandleSuggestionClick from "@/hooks/mapbox/use-handle-suggestion-click"
import { searchStore } from "@/stores/search-store"
import { normalizeStreetNames } from "@/utils/normalize-street-names"

jest.mock("@/stores/search-store", () => ({
    searchStore: {
        setAddressSearchQuery: jest.fn(),
        setSuggestions: jest.fn(),
        setIsSuggestionsOpen: jest.fn(),
        setSuggestionsError: jest.fn(),
    },
}))

jest.mock("@/utils/normalize-street-names", () => ({
    normalizeStreetNames: jest.fn((name) => name.replace("St", "Street")),
}))

describe("useHandleSuggestionClick", () => {
    const mockSearchStore = searchStore;
    const mockNormalizeStreetNames = normalizeStreetNames;

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("should update search store correctly when a suggestion is clicked", () => {
        const { result } = renderHook(() => useHandleSuggestionClick())

        const mockSuggestion = {
            place_name: "123 Main St, New York, NY",
        } as MapboxFeature;

        result.current(mockSuggestion);

        expect(mockNormalizeStreetNames).toHaveBeenCalledWith("Main St");
        expect(mockSearchStore.setAddressSearchQuery).toHaveBeenCalledWith("123 Main Street");
        expect(mockSearchStore.setSuggestions).toHaveBeenCalledWith([]);
        expect(mockSearchStore.setIsSuggestionsOpen).toHaveBeenCalledWith(false);
        expect(mockSearchStore.setSuggestionsError).not.toHaveBeenCalled();
    })

    it("should handle place_name without a comma", () => {
        const { result } = renderHook(() => useHandleSuggestionClick())

        const mockSuggestion = {
            place_name: "456 Grand Avenue",
        } as MapboxFeature;

        result.current(mockSuggestion);

        expect(mockSearchStore.setAddressSearchQuery).toHaveBeenCalledWith("456 Grand Avenue");
        expect(mockSearchStore.setSuggestions).toHaveBeenCalledWith([]);
        expect(mockSearchStore.setIsSuggestionsOpen).toHaveBeenCalledWith(false);
    })

    it("should handle empty place_name", () => {
        const { result } = renderHook(() => useHandleSuggestionClick())

        const mockSuggestion = {
            place_name: "",
        } as MapboxFeature;

        result.current(mockSuggestion);

        expect(mockSearchStore.setAddressSearchQuery).toHaveBeenCalledWith("");
        expect(mockSearchStore.setSuggestions).toHaveBeenCalledWith([]);
        expect(mockSearchStore.setIsSuggestionsOpen).toHaveBeenCalledWith(false);
    })

    it("should handle place_name with multiple commas", () => {
        const { result } = renderHook(() => useHandleSuggestionClick())

        const mockSuggestion = {
            place_name: "123 Main St, Apt 4B, New York, NY",
        } as MapboxFeature

        result.current(mockSuggestion)

        expect(mockNormalizeStreetNames).toHaveBeenCalledWith("Main St")
        expect(mockSearchStore.setAddressSearchQuery).toHaveBeenCalledWith("123 Main Street")
        expect(mockSearchStore.setSuggestions).toHaveBeenCalledWith([])
        expect(mockSearchStore.setIsSuggestionsOpen).toHaveBeenCalledWith(false)
    })

    it("should handle special characters in place_name", () => {
        const { result } = renderHook(() => useHandleSuggestionClick())

        const mockSuggestion = {
            place_name: "789 O'Connor St, Boston, MA",
        } as MapboxFeature

        result.current(mockSuggestion)

        expect(mockNormalizeStreetNames).toHaveBeenCalledWith("O'Connor St")
        expect(mockSearchStore.setAddressSearchQuery).toHaveBeenCalledWith("789 O'Connor Street")
        expect(mockSearchStore.setSuggestions).toHaveBeenCalledWith([])
        expect(mockSearchStore.setIsSuggestionsOpen).toHaveBeenCalledWith(false)
    })

    it("should handle addresses with no street name to normalize", () => {
        const { result } = renderHook(() => useHandleSuggestionClick())

        const mockSuggestion = {
            place_name: "Central Park, New York, NY",
        } as MapboxFeature

        result.current(mockSuggestion)

        expect(mockNormalizeStreetNames).toHaveBeenCalledWith("Central Park")
        expect(mockSearchStore.setAddressSearchQuery).toHaveBeenCalledWith("Central Park")
        expect(mockSearchStore.setSuggestions).toHaveBeenCalledWith([])
        expect(mockSearchStore.setIsSuggestionsOpen).toHaveBeenCalledWith(false)
    })
})