"use client"

import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"

interface RouteTooltipProps {
  route: RouteInfo | null
  position: { x: number; y: number }
  visible: boolean
}

const RouteTooltip = observer(({ route, position, visible }: RouteTooltipProps) => {
  const [adjustedPosition, setAdjustedPosition] = useState(position)

  useEffect(() => {
    if (!visible || !route) return

    const tooltipWidth = 220 // Approximate tooltip width
    const tooltipHeight = 120 // Approximate tooltip height
    const padding = 10

    let adjustedX = position.x + padding
    let adjustedY = position.y - padding

    // Check right boundary
    if (adjustedX + tooltipWidth > window.innerWidth) {
      adjustedX = position.x - tooltipWidth - padding
    }

    // Check top boundary
    if (adjustedY - tooltipHeight < 0) {
      adjustedY = position.y + padding + 20 // Position below cursor
    }

    // Check left boundary
    if (adjustedX < 0) {
      adjustedX = padding
    }

    // Check bottom boundary
    if (adjustedY + tooltipHeight > window.innerHeight) {
      adjustedY = window.innerHeight - tooltipHeight - padding
    }

    setAdjustedPosition({ x: adjustedX, y: adjustedY })
  }, [position, visible, route])

  if (!visible || !route) return null

  return (
    <div
      className="fixed z-50 pointer-events-none transition-opacity duration-150"
      style={{
        left: adjustedPosition.x,
        top: adjustedPosition.y,
        transform: "translate(0, -100%)",
      }}
    >
      <div className="bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-lg shadow-lg p-3 min-w-[200px] max-w-[250px]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">
              Route {route.route_short_name}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-1">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
            Route Name
          </p>
          <p className="text-sm text-gray-900 font-medium break-words leading-snug">
            {route.route_long_name}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            NYC Bus Service
          </p>
        </div>
      </div>
    </div>
  )
})

RouteTooltip.displayName = "RouteTooltip"

export default RouteTooltip
