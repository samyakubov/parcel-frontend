import React from "react"
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import StopList from "@/components/property-details-modal/public-transportation/stop-list"
import RouteTriggerContent from "@/components/property-details-modal/public-transportation/route-trigger-content"

interface RouteItemProps {
	route: Route
	nearbyStopIds: Set<string>
}

const deduplicateStops = (stops: Stop[] | undefined) => {
	if (!stops) return []

	const seenNames = new Set<string>()
	return stops.filter((stop) => {
		if (seenNames.has(stop.stop_name)) {
			return false
		}
		seenNames.add(stop.stop_name)
		return true
	})
}

export default function RouteItem({ route, nearbyStopIds }: RouteItemProps) {
	const dedupedStops = deduplicateStops(route.stops)
	const nearbyStopsCount =
		dedupedStops.filter((stop) => nearbyStopIds.has(stop.stop_id)).length || 0

	return (
		<AccordionItem
			value={route.route_id}
			className="border rounded-md overflow-hidden hover:border-primary/50 transition-colors"
		>
			<AccordionTrigger className="px-4 py-2 hover:no-underline hover:bg-accent/50 [&[data-state=open]]:bg-accent/50">
				<RouteTriggerContent
					route={route}
					stopsCount={dedupedStops.length}
					nearbyStopsCount={nearbyStopsCount}
				/>
			</AccordionTrigger>

			<AccordionContent className="px-0 pb-0">
				<StopList stops={dedupedStops} nearbyStopIds={nearbyStopIds} />
			</AccordionContent>
		</AccordionItem>
	)
}
