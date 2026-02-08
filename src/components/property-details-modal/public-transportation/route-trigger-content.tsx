import React from "react"
import RouteAvatar from "@/components/property-details-modal/public-transportation/route-avatar"

interface RouteTriggerContentProps {
	route: Route
	stopsCount: number
	nearbyStopsCount: number
}

export default function RouteTriggerContent({
	route,
	stopsCount,
	nearbyStopsCount,
}: RouteTriggerContentProps) {
	return (
		<div className="flex items-center gap-4 flex-1 overflow-hidden mr-4">
			<RouteAvatar route={route} />

			<div className="flex-1 min-w-0 text-left">
				<div className="flex items-center justify-between gap-2">
					<p className="font-semibold truncate text-sm">
						{route.route_long_name}
					</p>
				</div>
				{route.route_desc && (
					<p className="text-xs text-muted-foreground truncate">
						{route.route_desc}
					</p>
				)}
				<div className="flex items-center gap-2 mt-0.5">
					<p className="text-xs text-muted-foreground">
						{stopsCount} stops
					</p>
					{nearbyStopsCount > 0 && (
						<>
							<span className="text-xs text-muted-foreground">•</span>
							<p className="text-xs font-medium text-primary">
								{nearbyStopsCount} nearby
							</p>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
