import { normalizeStreetNames } from "@/utils/normalize-street-names"

describe("normalizeStreetNames", () => {
	it("should replace 'St' with 'Street'", () => {
		expect(normalizeStreetNames("123 Main St")).toBe("123 Main Street")
	})

	it("should replace 'Ave' with 'Avenue'", () => {
		expect(normalizeStreetNames("456 Grand Ave")).toBe("456 Grand Avenue")
	})

	it("should replace 'Blvd' with 'Boulevard'", () => {
		expect(normalizeStreetNames("789 Sunset Blvd")).toBe("789 Sunset Boulevard")
	})

	it("should replace 'Rd' with 'Road'", () => {
		expect(normalizeStreetNames("101 River Rd")).toBe("101 River Road")
	})

	it("should handle multiple replacements in one string", () => {
		expect(normalizeStreetNames("123 St Marks Ave")).toBe("123 Street Marks Avenue")
	})

	it("should not replace anything if no abbreviations are present", () => {
		expect(normalizeStreetNames("123 Main Street")).toBe("123 Main Street")
	})

	it("should be case-insensitive", () => {
		expect(normalizeStreetNames("123 main st")).toBe("123 main street")
	})

	it("should handle an empty string", () => {
		expect(normalizeStreetNames("")).toBe("")
	})
})
