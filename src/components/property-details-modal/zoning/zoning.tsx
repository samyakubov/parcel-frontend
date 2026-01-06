"use client"
import React from "react"
import { Map } from "lucide-react"
import isNull from "lodash-es/isNull"
import isUndefined from "lodash-es/isUndefined"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import SpecialDistricts from "@/components/property-details-modal/zoning/special-districts"
import CommercialOverlays from "@/components/property-details-modal/zoning/commercial-overlays"
import LimitedHeightDistrict from "@/components/property-details-modal/zoning/limited-height-district"
import LastUpdated from "@/components/property-details-modal/zoning/last-updated"
import ZoningDistricts from "@/components/property-details-modal/zoning/zoning-districts"
import { isEmpty } from "lodash-es"
import ZoningEmpty from "@/components/property-details-modal/zoning/zoning-empty"

interface ZoningSectionProps {
	zoning: Zoning
}

export default function Zoning({ zoning }: ZoningSectionProps) {
	const hasNoZoningData = isNull(zoning) || isUndefined(zoning) ||
		isNull(zoning.zoning_districts) || isUndefined(zoning.zoning_districts) || (
			isEmpty(zoning.zoning_districts) &&
			isEmpty(zoning.commercial_overlays) &&
			isEmpty(zoning.special_districts) &&
			!zoning.limited_height_district
		)

	if (hasNoZoningData) {
		return <ZoningEmpty />
	}

	return (
		<Card className="w-full">
			<CardHeader>
				<div className="flex items-center gap-2">
					<div className="p-2 rounded-full bg-primary/10">
						<Map className="h-4 w-4 text-primary" />
					</div>
					<h3 className="text-lg font-semibold">
						Zoning Information
					</h3>
				</div>
			</CardHeader>

			<CardContent className="space-y-4">
				<ZoningDistricts districts={zoning.zoning_districts} />
				<CommercialOverlays overlays={zoning.commercial_overlays} />
				<SpecialDistricts districts={zoning.special_districts} />
				<LimitedHeightDistrict district={zoning.limited_height_district} />
				<LastUpdated date={zoning.last_updated} />
			</CardContent>
		</Card>
	)
}
