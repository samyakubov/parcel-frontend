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
