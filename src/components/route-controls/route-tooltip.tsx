"use client"

import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { RouteInfo, StopInfo } from "@/utils/gtfs-parser"

interface RouteTooltipProps {
  route: RouteInfo | null
  stop: StopInfo | null
  position: { x: number; y: number }
  visible: boolean
}

const RouteTooltip = observer(({ route, stop, position, visible }: RouteTooltipProps) => {
  const [adjustedPosition, setAdjustedPosition] = useState(position)

  useEffect(() => {
    if (!visible || !route) return

    const tooltipWidth = 220
    const tooltipHeight = 150
    const padding = 10

    let adjustedX = position.x + padding
    let adjustedY = position.y - padding

    if (adjustedX + tooltipWidth > window.innerWidth) {
      adjustedX = position.x - tooltipWidth - padding
    }

    if (adjustedY - tooltipHeight < 0) {
      adjustedY = position.y + padding + 20
    }

    if (adjustedX < 0) {
      adjustedX = padding
    }

    if (adjustedY + tooltipHeight > window.innerHeight) {
      adjustedY = window.innerHeight - tooltipHeight - padding
    }

    setAdjustedPosition({ x: adjustedX, y: adjustedY })
  }, [position, visible, route, stop])

  if (!visible || (!route && !stop)) return null

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
        {stop ? (
          <>
            <div className="flex items-center gap-3 mb-2">
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  {stop.stop_name}
                </h3>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                Bus Stop
              </p>
              <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
                <span>ID: {stop.stop_id}</span>
              </div>
              {route && (
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <p className="text-xs text-blue-600">On Route {route.route_short_name}</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-2">
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  {route!.route_short_name}
                </h3>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-gray-400 mt-2">
                NYC Bus Service
              </p>
            </div>
          </>
        )}

      </div>
    </div>
  )
})

RouteTooltip.displayName = "RouteTooltip"

export default RouteTooltip
