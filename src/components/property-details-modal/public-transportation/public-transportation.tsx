"use client"
import React from "react"
import { isEmpty, isNil, isUndefined } from "lodash-es"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion } from "@/components/ui/accordion"
import PublicTransportationHeader from "@/components/property-details-modal/public-transportation/public-transportation-header"
import RouteItem from "@/components/property-details-modal/public-transportation/route-item"
import PublicTransportationLoading from "@/components/property-details-modal/public-transportation/public-transportation-loading"
import PublicTransportationEmpty from "@/components/property-details-modal/public-transportation/public-transportation-empty"

interface PublicTransportationCardProps {
	routesNearBy: Route[] | null | undefined
	stopsNearBy: Stop[] | null | undefined
}

export default function PublicTransportation({ routesNearBy, stopsNearBy }: PublicTransportationCardProps) {
	const nearbyStopIds = React.useMemo(() => {
		if (!stopsNearBy) return new Set<string>()
		return new Set(stopsNearBy.map(stop => stop.stop_id))
	}, [stopsNearBy])

	if (isUndefined(routesNearBy) || isUndefined(stopsNearBy)) {
		return <PublicTransportationLoading />
	}

	if (isNil(routesNearBy) || isEmpty(routesNearBy)) {
		return <PublicTransportationEmpty />
	}

	return (
		<Card className="overflow-hidden">
			<PublicTransportationHeader />
			<CardContent className="p-2">
				<div className="max-h-64 overflow-y-auto pr-2">
					<Accordion type="single" collapsible className="space-y-1">
						{routesNearBy.map((route) => (
							<RouteItem
								key={route.route_id}
								route={route}
								nearbyStopIds={nearbyStopIds}
							/>
						))}
					</Accordion>
				</div>
			</CardContent>
		</Card>
	)
}
