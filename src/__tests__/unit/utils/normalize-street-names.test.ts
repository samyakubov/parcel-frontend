import { normalizeStreetNames } from "@/utils/normalize-street-names"

describe("normalizeStreetNames", () => {
	it("should replace 'St' with 'Street'", () => {
		expect(normalizeStreetNames("123 Main St")).toBe("123rd main street")
	})

	it("should replace 'Ave' with 'Avenue'", () => {
		expect(normalizeStreetNames("456 Grand Ave")).toBe("456th grand avenue")
	})

	it("should replace 'Blvd' with 'Boulevard'", () => {
		expect(normalizeStreetNames("789 Sunset Blvd")).toBe("789th sunset boulevard")
	})

	it("should replace 'Rd' with 'Road'", () => {
		expect(normalizeStreetNames("101 River Rd")).toBe("101st river road")
	})

	it("should handle multiple replacements in one string", () => {
		expect(normalizeStreetNames("123 St Marks Ave")).toBe("123rd street marks avenue")
	})

	it("should not replace anything if no abbreviations are present", () => {
		expect(normalizeStreetNames("123 Main Street")).toBe("123rd main street")
	})

	it("should be case-insensitive", () => {
		expect(normalizeStreetNames("123 main st")).toBe("123rd main street")
	})

	it("should handle an empty string", () => {
		expect(normalizeStreetNames("")).toBe("")
	})
})
