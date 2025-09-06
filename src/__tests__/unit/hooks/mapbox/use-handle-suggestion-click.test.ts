/**
 * @jest-environment jsdom
 */
import { renderHook } from "@testing-library/react"
import useHandleSuggestionClick from "@/hooks/mapbox/search-with-autocomplete/use-handle-suggestion-click"
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
    normalizeStreetNames: jest.fn((name) => {
        if (typeof name !== "string") return name;
        let streetName = name.toLowerCase();
        streetName = streetName.replace(/\bst\b/gi, "street");
        streetName = streetName.replace(/\bave\b/gi, "avenue");
        streetName = streetName.replace(/\bdr\b/gi, "drive");
        streetName = streetName.replace(/\brd\b/gi, "road");
        streetName = streetName.replace(/\bblvd\b/gi, "boulevard");
        streetName = streetName.replace(/\b(\d+)\b/g, (_, num) => {
            const n = parseInt(num, 10);
            const suffixes = ["th", "st", "nd", "rd"];
            const value = n % 100;
            return n + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]);
        });
        return streetName;
    }),
}))

jest.mock("lodash-es", () => ({
    isEmpty: jest.fn((value) => {
        if (value == null) return true;
        if (typeof value === 'string' || Array.isArray(value)) return value.length === 0;
        if (typeof value === 'object') return Object.keys(value).length === 0;
        return false;
    }),
}))

describe("useHandleSuggestionClick", () => {
    const mockSearchStore = searchStore
    const mockNormalizeStreetNames = normalizeStreetNames

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("should return early and not process when place_name is empty", () => {
        const { result } = renderHook(() => useHandleSuggestionClick())

        const mockSuggestion = {
            place_name: "",
        } as MapboxFeature

        result.current(mockSuggestion)

        expect(mockNormalizeStreetNames).not.toHaveBeenCalled()
        expect(mockSearchStore.setAddressSearchQuery).not.toHaveBeenCalled()
        expect(mockSearchStore.setSuggestions).not.toHaveBeenCalled()
        expect(mockSearchStore.setIsSuggestionsOpen).not.toHaveBeenCalled()
    })

    it("should return early and not process when place_name is null", () => {
        const { result } = renderHook(() => useHandleSuggestionClick())

        const mockSuggestion = {
            place_name: null,
        } as any

        result.current(mockSuggestion)

        expect(mockNormalizeStreetNames).not.toHaveBeenCalled()
        expect(mockSearchStore.setAddressSearchQuery).not.toHaveBeenCalled()
        expect(mockSearchStore.setSuggestions).not.toHaveBeenCalled()
        expect(mockSearchStore.setIsSuggestionsOpen).not.toHaveBeenCalled()
    })

    it("should process a standard address with street abbreviation", () => {
        const { result } = renderHook(() => useHandleSuggestionClick())

        const mockSuggestion = {
            place_name: "123 Main St, New York, NY",
        } as MapboxFeature

        result.current(mockSuggestion)

        expect(mockNormalizeStreetNames).toHaveBeenCalledWith("Main St")
        expect(mockSearchStore.setAddressSearchQuery).toHaveBeenCalledWith("123 main street")
        expect(mockSearchStore.setSuggestions).toHaveBeenCalledWith([])
        expect(mockSearchStore.setIsSuggestionsOpen).toHaveBeenCalledWith(false)
    })

    it("should handle address without comma", () => {
        const { result } = renderHook(() => useHandleSuggestionClick())

        const mockSuggestion = {
            place_name: "456 Grand Avenue",
        } as MapboxFeature

        result.current(mockSuggestion)

        expect(mockNormalizeStreetNames).toHaveBeenCalledWith("Grand Avenue")
        expect(mockSearchStore.setAddressSearchQuery).toHaveBeenCalledWith("456 grand avenue")
        expect(mockSearchStore.setSuggestions).toHaveBeenCalledWith([])
        expect(mockSearchStore.setIsSuggestionsOpen).toHaveBeenCalledWith(false)
    })

    it("should handle address with only house number", () => {
        const { result } = renderHook(() => useHandleSuggestionClick())

        const mockSuggestion = {
            place_name: "123",
        } as MapboxFeature

        result.current(mockSuggestion)

        expect(mockNormalizeStreetNames).toHaveBeenCalledWith("undefined undefined")
        expect(mockSearchStore.setAddressSearchQuery).toHaveBeenCalledWith("123 undefined undefined")
        expect(mockSearchStore.setSuggestions).toHaveBeenCalledWith([])
        expect(mockSearchStore.setIsSuggestionsOpen).toHaveBeenCalledWith(false)
    })

    it("should handle address with special characters", () => {
        const { result } = renderHook(() => useHandleSuggestionClick())

        const mockSuggestion = {
            place_name: "789 O'Connor St, Boston, MA",
        } as MapboxFeature

        result.current(mockSuggestion)

        expect(mockNormalizeStreetNames).toHaveBeenCalledWith("O'Connor St")
        expect(mockSearchStore.setAddressSearchQuery).toHaveBeenCalledWith("789 o'connor street")
        expect(mockSearchStore.setSuggestions).toHaveBeenCalledWith([])
        expect(mockSearchStore.setIsSuggestionsOpen).toHaveBeenCalledWith(false)
    })

    it("should handle multi-word street names", () => {
        const { result } = renderHook(() => useHandleSuggestionClick())

        const mockSuggestion = {
            place_name: "100 Fifth Avenue North, Minneapolis, MN",
        } as MapboxFeature

        result.current(mockSuggestion)

        expect(mockNormalizeStreetNames).toHaveBeenCalledWith("Fifth Avenue")
        expect(mockSearchStore.setAddressSearchQuery).toHaveBeenCalledWith("100 fifth avenue")
        expect(mockSearchStore.setSuggestions).toHaveBeenCalledWith([])
        expect(mockSearchStore.setIsSuggestionsOpen).toHaveBeenCalledWith(false)
    })

    it("should handle place names that are not traditional addresses", () => {
        const { result } = renderHook(() => useHandleSuggestionClick())

        const mockSuggestion = {
            place_name: "Central Park",
        } as MapboxFeature

        result.current(mockSuggestion)

        expect(mockNormalizeStreetNames).toHaveBeenCalledWith("Park undefined")
        expect(mockSearchStore.setAddressSearchQuery).toHaveBeenCalledWith("Central park undefined")
        expect(mockSearchStore.setSuggestions).toHaveBeenCalledWith([])
        expect(mockSearchStore.setIsSuggestionsOpen).toHaveBeenCalledWith(false)
    })
})