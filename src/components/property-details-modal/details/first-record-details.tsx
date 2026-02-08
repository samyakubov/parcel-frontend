import React from "react"
import {Square, CalendarDays, Layers, Ruler} from "lucide-react"
import PropertyDetailItem from "@/components/property-details-modal/mortgage/property-detail-item"

interface FirstRecordDetailsProps {
	firstRecord: PropertyRecord
}

export default function FirstRecordDetails({ firstRecord }: FirstRecordDetailsProps) {
	return (
		<>
			<PropertyDetailItem
				icon={<Layers className="h-4 w-4 text-muted-foreground" />}
				label="# of floors"
				value={firstRecord.num_floors.toString()}
			/>
			<PropertyDetailItem
				icon={<Ruler className="h-4 w-4 text-muted-foreground" />}
				label="Home Square Feet"
				value={`${firstRecord.bldg_area.toString()} (${firstRecord.bldg_front} X ${firstRecord.bldg_depth})`}
			/>
			<PropertyDetailItem
				icon={<Square className="h-4 w-4 text-muted-foreground" />}
				label="Land Square Feet"
				value={`${firstRecord.lot_area.toString()} (${firstRecord.lot_front} X ${firstRecord.lot_depth})`}
			/>
			<PropertyDetailItem
				icon={<CalendarDays className="h-4 w-4 text-muted-foreground" />}
				label="Property Year Built"
				value={firstRecord.year_built.toString()}
			/>
		</>
	)
}
