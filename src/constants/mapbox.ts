export const NYC_BOUNDS = [
	[-74.25909, 40.477399] as [number, number],
	[-73.700181, 40.917577] as [number, number],
] as const


export const NYC_CENTER = {
	longitude: -73.935242,
	latitude: 40.730610
}

export type MapStyle = "light" | "dark" | "satellite"

export const MAP_STYLES: Record<MapStyle, string> = {
	light: "mapbox://styles/mapbox/light-v11",
	dark: "mapbox://styles/mapbox/dark-v11",
	satellite: "mapbox://styles/mapbox/satellite-streets-v12"
}


export const LEGEND_LAYERS = [
	{ color: "#800026", label: "> $2,000" },
	{ color: "#bd0026", label: "$1,500 - $2,000" },
	{ color: "#e31a1c", label: "$1,000 - $1,500" },
	{ color: "#fc4e2a", label: "$800 - $1,000" },
	{ color: "#fd8d3c", label: "$600 - $800" },
	{ color: "#feb24c", label: "$400 - $600" },
	{ color: "#fed976", label: "$200 - $400" },
	{ color: "#ffeda0", label: "$0 - $200" },
]


export const SEARCH_MODES: Record<SearchMode, SearchModeConfig> = {
	address: {
		id: "address",
		label: "Address",
		placeholder: "Enter property address..."
	},
	bbl: {
		id: "bbl",
		label: "BBL",
		placeholder: "Enter BBL (e.g. 1000010001)"
	},
}
