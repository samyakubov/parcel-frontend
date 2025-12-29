"use client"

import { observer } from "mobx-react-lite"
import { routeStore } from "@/stores/route-store"
import RouteTooltip from "./route-tooltip"
import RouteErrorBoundary from "@/components/error-boundary/route-error-boundary"

const RouteControlsContainer = observer(() => {
  const {
    _hoveredRouteInfo: hoveredRouteInfo,
    _tooltipPosition: tooltipPosition,
    _hoveredRoute: hoveredRoute
  } = routeStore


  return (
    <RouteErrorBoundary fallback={null}>
      <RouteTooltip
        route={hoveredRouteInfo}
        position={tooltipPosition}
        visible={!!hoveredRoute && !!hoveredRouteInfo}
      />
    </RouteErrorBoundary>

  )
})

RouteControlsContainer.displayName = "RouteControlsContainer"

export default RouteControlsContainer
