import { useEffect, useState } from "react"
import { reaction } from "mobx"
import { routeStore } from "@/stores/route-store"
import { mapStore } from "@/stores/map-store"
import useRouteVisualizer from "./use-route-visualizer"

/**
 * Hook that integrates route visualization with the route store state
 * Handles route visibility updates, connects the visualizer to the store,
 * and manages automatic data loading with error handling
 */
export default function useRouteIntegration() {
  const [map, setMap] = useState(mapStore._map)

  // Track map updates from store
  useEffect(() => {
    const disposer = reaction(
      () => mapStore._map,
      (newMap) => setMap(newMap)
    )
    return disposer
  }, [])
  // Remove updateRouteVisibility destructuring
  const { updateRouteHover, initializeRouteLayers } = useRouteVisualizer(map)

  // Set up MobX reactions to watch for store changes
  useEffect(() => {
    if (!map) return

    // React to route data changes
    const dataDisposer = reaction(
      () => routeStore._routeData,
      (routeData) => {
        if (routeData) {
          initializeRouteLayers(routeData)
        }
      }
    )

    // React to hovered route changes
    const hoverDisposer = reaction(
      () => routeStore._hoveredRoute,
      (hoveredRoute) => {
        updateRouteHover(hoveredRoute)
      }
    )

    return () => {
      dataDisposer()
      hoverDisposer()
    }
  }, [map, initializeRouteLayers, updateRouteHover])

  // Auto-load route data when map is ready
  useEffect(() => {
    if (!map || routeStore._routeData || routeStore.isLoading) return

    // Load route data automatically with error handling
    const loadData = async () => {
      try {
        await routeStore.loadRouteData({
          useCache: true,
          chunkSize: 1000 // Optimize for performance
        })
      } catch (error) {
        console.error('Failed to load route data:', error)
        // Error is already handled in the store
      }
    }

    // Small delay to ensure map is fully initialized
    const timeoutId = setTimeout(loadData, 100)

    return () => clearTimeout(timeoutId)
  }, [map])

  return {
    isLoading: routeStore.isLoading,
    error: routeStore.error,
    loadingProgress: routeStore.loadingProgress,
    loadingMessage: routeStore.loadingMessage,
    retryLoading: routeStore.retryLoading,
    refreshData: routeStore.refreshData,
    cancelLoading: routeStore.cancelLoading
  }
}
