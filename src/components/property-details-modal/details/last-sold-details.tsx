import React from "react"
import { Ruler, TreePine, CalendarDays } from "lucide-react"
import PropertyDetailItem from "@/components/property-details-modal/mortgage/property-detail-item"

interface LastSoldDetailsProps {
	lastSold: LastSoldWithSqft
}

export default function LastSoldDetails({ lastSold }: LastSoldDetailsProps) {
	return (
		<>
			<PropertyDetailItem
				icon={<Ruler className="h-4 w-4 text-muted-foreground" />}
				label="Home Square Feet"
				value={lastSold.gross_sqft}
			/>
			<PropertyDetailItem
				icon={<TreePine className="h-4 w-4 text-muted-foreground" />}
				label="Land Square Feet"
				value={lastSold.land_sqft}
			/>
			<PropertyDetailItem
				icon={<CalendarDays className="h-4 w-4 text-muted-foreground" />}
				label="Property Year Built"
				value={lastSold.year_built}
			/>
		</>
	)
}
