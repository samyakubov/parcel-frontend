import { useEffect } from "react"
import mapboxgl from "mapbox-gl"
import { observe } from "mobx"
import { heatmapStore } from "@/stores/heatmap-store"

const SOURCE_ID = "nyc-zip-codes-source"
const LAYER_ID = "nyc-zip-codes-heatmap-layer"

export default function useHeatmapLayer(mapRef: React.RefObject<mapboxgl.Map | null>) {
	useEffect(() => {
		const map = mapRef.current
		if (!map) return

		const updateLayer = () => {
			if (!map.isStyleLoaded()) return

			const { isHeatmapVisible, heatmapData } = heatmapStore

			if (isHeatmapVisible && heatmapData) {
				// 1. Add Source if it doesn't exist
				if (!map.getSource(SOURCE_ID)) {
					map.addSource(SOURCE_ID, {
						type: "geojson",
						data: "/nyc-zip-codes.geojson",
					})
				}

				// 2. Build the color expression based on median_price_per_sqft
				// fallback to median_price if sqft price is not available
				const matchExpression: (string | number | string[])[] = ["match", ["get", "modzcta"]]

				heatmapData.data.forEach((item) => {
					// Use a color scale based on price per sqft or just median price
					// For simplicity we will use a color range. Adjust these values as needed.
					let color = "rgba(0, 0, 0, 0.1)" // default transparent
					const val = item.median_price_per_sqft || (item.median_price / 1000)

					if (val > 2000) color = "#800026"
					else if (val > 1500) color = "#bd0026"
					else if (val > 1000) color = "#e31a1c"
					else if (val > 800) color = "#fc4e2a"
					else if (val > 600) color = "#fd8d3c"
					else if (val > 400) color = "#feb24c"
					else if (val > 200) color = "#fed976"
					else if (val > 0) color = "#ffeda0"

					matchExpression.push(item.zip_code, color)
				})

				// Default color if ZIP code is not in data
				matchExpression.push("rgba(0,0,0,0.1)")

				const fillColorExpression = matchExpression as mapboxgl.Expression

				// 3. Add or update Layer
				if (!map.getLayer(LAYER_ID)) {
					// Insert right below labels so text stays readable
					const layers = map.getStyle()?.layers || []
					const firstSymbolLayer = layers.find((layer) => layer.type === "symbol")
					const firstSymbolId = firstSymbolLayer ? firstSymbolLayer.id : undefined

					map.addLayer(
						{
							id: LAYER_ID,
							type: "fill",
							source: SOURCE_ID,
							paint: {
								"fill-color": fillColorExpression,
								"fill-opacity": 0.6,
							},
						},
						firstSymbolId
					)
				} else {
					map.setPaintProperty(LAYER_ID, "fill-color", fillColorExpression)
					map.setLayoutProperty(LAYER_ID, "visibility", "visible")
				}
			} else {
				// Hide layer
				if (map.getLayer(LAYER_ID)) {
					map.setLayoutProperty(LAYER_ID, "visibility", "none")
				}
			}
		}

		// Initial update when map initially loads
		map.on("load", updateLayer)
		map.on("styledata", updateLayer) // When style switches

		// Observe MobX store for changes
		const disposerVisible = observe(heatmapStore, "isHeatmapVisible", updateLayer)
		const disposerData = observe(heatmapStore, "heatmapData", updateLayer)

		// Wait for style load initially
		if (map.isStyleLoaded()) {
			updateLayer()
		}

		return () => {
			disposerVisible()
			disposerData()
			map.off("load", updateLayer)
			map.off("styledata", updateLayer)
		}
	}, [mapRef])
}
