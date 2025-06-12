import {toast} from "react-toastify"

const ABBREVIATIONS: Record<string, string> = {
	"\\bave\\b": "avenue",
	"\\bavn\\b": "avenue",
	"\\bavnue\\b": "avenue",
	"\\baven\\b": "avenue",

	"\\bst\\b": "street",
	"\\bstr\\b": "street",
	"\\bstrt\\b": "street",

	"\\bblvd\\b": "boulevard",
	"\\bblv\\b": "boulevard",
	"\\bboul\\b": "boulevard",

	"\\bdr\\b": "drive",
	"\\bdrv\\b": "drive",

	"\\bct\\b": "court",
	"\\bcour\\b": "court",

	"\\brd\\b": "road",
	"\\brod\\b": "road",

	"\\bapt\\b": "apartment",
	"\\bapmt\\b": "apartment",
	"\\baptmt\\b": "apartment",

	"\\bsuite\\b": "suite",
	"\\bste\\b": "suite",

	"\\bln\\b": "lane",
	"\\blane\\b": "lane",

	"\\bpl\\b": "place",
	"\\bplc\\b": "place",
}

const ABBREVIATIONS_COMPILED: [RegExp, string][] = Object.entries(ABBREVIATIONS).map(
	([pattern, replacement]) => [new RegExp(pattern, "gi"), replacement]
)

function addSuffix(num: number): string {
	const suffixes = ["th", "st", "nd", "rd"]
	const value = num % 100
	return num + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0])
}

export function NormalizeStreetName(streetName: string): string {
	if (typeof streetName !== "string") {
		toast.error("Street name must be a string.")
	}

	streetName = streetName.toLowerCase()

	for (const [pattern, replacement] of ABBREVIATIONS_COMPILED) {
		streetName = streetName.replace(pattern, replacement)
	}

	streetName = streetName.replace(/\b(\d+)\b/g, (_, num) => addSuffix(parseInt(num, 10)))

	return streetName
}
