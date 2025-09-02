
import { renderHook } from "@testing-library/react"
import axios from "axios"
import useAddressAutocomplete from "@/hooks/mapbox/use-address-auto-complete"
import { searchStore } from "@/stores/search-store"

// Mock dependencies
jest.mock("axios")
jest.mock("lodash-es", () => ({
	debounce: (fn: any) => fn,
}))
jest.mock("@/stores/search-store", () => ({
	searchStore: {
		addressSearchQuery: "",
		setSuggestions: jest.fn(),
		setIsSuggestionsOpen: jest.fn(),
		setSuggestionsError: jest.fn(),
	},
}))

const mockedAxios = axios as jest.Mocked<typeof axios>

describe("useAddressAutocomplete", () => {
	beforeEach(() => {
		jest.clearAllMocks()
		searchStore.setSuggestionsError = jest.fn() // Reset mock function for error handling
	})

	it("should not fetch suggestions if query is less than 2 characters", async () => {
		searchStore.addressSearchQuery = "a"
		const { result } = renderHook(() => useAddressAutocomplete())

		await result.current()

		expect(axios.get).not.toHaveBeenCalled()
	})

	it("should fetch suggestions and update store on success", async () => {
		searchStore.addressSearchQuery = "123 Main St"
		const mockFeatures = [{ id: "1", place_name: "123 Main St, New York, NY" }]
		const mockResponse = { data: { features: mockFeatures } }
		mockedAxios.get.mockResolvedValue(mockResponse)

		const { result } = renderHook(() => useAddressAutocomplete())

		await result.current()

		expect(mockedAxios.get).toHaveBeenCalledWith(
			expect.stringContaining("/123%20Main%20St.json"),
			expect.any(Object)
		)
		expect(searchStore.setSuggestions).toHaveBeenCalledWith(mockFeatures)
		expect(searchStore.setIsSuggestionsOpen).toHaveBeenCalledWith(true)
		expect(searchStore.setSuggestionsError).toHaveBeenCalledWith(null)
	})

	it("should handle API error and update store", async () => {
		searchStore.addressSearchQuery = "An invalid address"
		mockedAxios.get.mockRejectedValue(new Error("API Error"))

		const { result } = renderHook(() => useAddressAutocomplete())

		await result.current()

		expect(mockedAxios.get).toHaveBeenCalled()
		expect(searchStore.setSuggestionsError).toHaveBeenCalledWith("Error fetching suggestions. Please try again.")
		expect(searchStore.setSuggestions).toHaveBeenCalledWith([])
	})
})
