import { useCallback, useMemo } from "react"
import type mapboxgl from "mapbox-gl"
import { routeStore } from "@/stores/route-store"

const ROUTE_LAYER_ID = "bus-routes"
const ROUTE_SOURCE_ID = "bus-routes-source"
const DEFAULT_OPACITY = 0.6
const HOVER_OPACITY = 0.9
const BASE_LINE_WIDTH = 2

// Performance optimization: Memoize layer configuration
const createLayerConfig = (routeData: GeoJSON.FeatureCollection): mapboxgl.LineLayer => ({
  id: ROUTE_LAYER_ID,
  type: "line" as const,
  source: ROUTE_SOURCE_ID,
  layout: {
    "line-join": "round" as const,
    "line-cap": "round" as const
  },
  paint: {
    "line-color": [
      "case",
      ["has", "routeColor"],
      ["get", "routeColor"],
      "#0066CC" // Default MTA blue if no color specified
    ],
    "line-width": [
      "interpolate",
      ["exponential", 2],
      ["zoom"],
      10, BASE_LINE_WIDTH,
      16, BASE_LINE_WIDTH * 4
    ],
    "line-opacity": DEFAULT_OPACITY
  }
})

// Performance optimization: Debounce hover updates
let hoverTimeout: NodeJS.Timeout | null = null

export default function useRouteVisualizer(map: mapboxgl.Map | null) {
  // Memoize event handlers to prevent unnecessary re-renders
  const eventHandlers = useMemo(() => {
    const handleRouteHover = (e: mapboxgl.MapMouseEvent) => {
      if (!e.features || e.features.length === 0) return

      const feature = e.features[0]
      const routeId = feature.properties?.routeId
      const properties = feature.properties

      if (routeId && properties) {
        // Debounce hover updates for performance
        if (hoverTimeout) {
          clearTimeout(hoverTimeout)
        }

        hoverTimeout = setTimeout(() => {
          // Update tooltip position
          routeStore.setTooltipPosition({ x: e.point.x, y: e.point.y })

          // Set hovered route info for tooltip
          const routeInfo: RouteInfo = {
            route_id: properties.routeId,
            route_short_name: properties.routeName,
            route_long_name: properties.routeLongName,
            route_color: properties.routeColor,
            route_type: 3 // Bus routes
          }

          routeStore.setHoveredRoute(routeId)
          routeStore.setHoveredRouteInfo(routeInfo)
        }, 16) // ~60fps debounce
      }
    }

    const handleRouteMouseMove = (e: mapboxgl.MapMouseEvent) => {
      // Throttle mouse move updates
      if (hoverTimeout) return

      hoverTimeout = setTimeout(() => {
        routeStore.setTooltipPosition({ x: e.point.x, y: e.point.y })
        hoverTimeout = null
      }, 16)
    }

    const handleRouteHoverExit = () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout)
        hoverTimeout = null
      }

      routeStore.setHoveredRoute(null)
      routeStore.setHoveredRouteInfo(null)
    }


    return {
      handleRouteHover,
      handleRouteMouseMove,
      handleRouteHoverExit,
    }
  }, [])

  const initializeRouteLayers = useCallback((routeData: GeoJSON.FeatureCollection) => {
    if (!map || !routeData) return

    try {
      // Performance: Check if we need to update
      const existingSource = map.getSource(ROUTE_SOURCE_ID) as mapboxgl.GeoJSONSource
      if (existingSource) {
        // Update existing source instead of recreating
        existingSource.setData(routeData)
        return
      }

      // Remove existing layers and sources if they exist
      if (map.getLayer(ROUTE_LAYER_ID)) {
        map.removeLayer(ROUTE_LAYER_ID)
      }
      if (map.getSource(ROUTE_SOURCE_ID)) {
        map.removeSource(ROUTE_SOURCE_ID)
      }

      // Add route data source with performance optimizations
      map.addSource(ROUTE_SOURCE_ID, {
        type: "geojson",
        data: routeData,
        // Performance optimizations
        buffer: 0, // Reduce buffer for better performance
        maxzoom: 18, // Limit max zoom for performance
        tolerance: 0.375 // Simplify geometries for performance
      })

      // Add route layer with optimized configuration
      const layerConfig = createLayerConfig(routeData)
      map.addLayer(layerConfig)

      // Add event handlers with error boundaries
      const addEventHandler = (event: string, handler: (e: mapboxgl.MapMouseEvent) => void) => {
        try {
          map.on(event as any, ROUTE_LAYER_ID, handler)
        } catch (error) {
          console.error(`Error adding ${event} handler:`, error)
        }
      }

      addEventHandler("mouseenter", eventHandlers.handleRouteHover)
      addEventHandler("mousemove", eventHandlers.handleRouteMouseMove)
      addEventHandler("mouseleave", eventHandlers.handleRouteHoverExit)

      // Change cursor on hover with error handling
      try {
        map.on("mouseenter", ROUTE_LAYER_ID, () => {
          if (map.getCanvas()) {
            map.getCanvas().style.cursor = "pointer"
          }
        })
        map.on("mouseleave", ROUTE_LAYER_ID, () => {
          if (map.getCanvas()) {
            map.getCanvas().style.cursor = ""
          }
        })
      } catch (error) {
        console.error("Error setting cursor handlers:", error)
      }

    } catch (error) {
      console.error("Error initializing route layers:", error)
      routeStore.setError("Failed to initialize route visualization")
    }
  }, [map, eventHandlers])


  const updateRouteHover = useCallback((routeId: string | null) => {
    if (!map || !map.getLayer(ROUTE_LAYER_ID)) return

    try {
      if (routeId) {
        // Highlight hovered route with performance optimization
        map.setPaintProperty(ROUTE_LAYER_ID, "line-opacity", [
          "case",
          ["==", ["get", "routeId"], routeId],
          HOVER_OPACITY,
          DEFAULT_OPACITY
        ])
      } else {
        // Reset all routes to default opacity
        map.setPaintProperty(ROUTE_LAYER_ID, "line-opacity", DEFAULT_OPACITY)
      }
    } catch (error) {
      console.error("Error updating route hover state:", error)
    }
  }, [map])

  const removeRouteLayers = useCallback(() => {
    if (!map) return

    try {
      // Clear any pending hover timeouts
      if (hoverTimeout) {
        clearTimeout(hoverTimeout)
        hoverTimeout = null
      }

      // Remove event handlers with error handling
      const removeEventHandler = (event: string, handler: (e: mapboxgl.MapMouseEvent) => void) => {
        try {
          map.off(event as any, ROUTE_LAYER_ID, handler)
        } catch (error) {
          console.error(`Error removing ${event} handler:`, error)
        }
      }

      removeEventHandler("mouseenter", eventHandlers.handleRouteHover)
      removeEventHandler("mousemove", eventHandlers.handleRouteMouseMove)
      removeEventHandler("mouseleave", eventHandlers.handleRouteHoverExit)

      // Remove layer and source
      if (map.getLayer(ROUTE_LAYER_ID)) {
        map.removeLayer(ROUTE_LAYER_ID)
      }
      if (map.getSource(ROUTE_SOURCE_ID)) {
        map.removeSource(ROUTE_SOURCE_ID)
      }

      // Reset cursor
      if (map.getCanvas()) {
        map.getCanvas().style.cursor = ""
      }
    } catch (error) {
      console.error("Error removing route layers:", error)
    }
  }, [map, eventHandlers])

  return {
    initializeRouteLayers,
    updateRouteHover,
    removeRouteLayers
  }
}
