"use client"
import React from "react"
import PropertyRecordGridHeader from "@/components/property-details-modal/property-record-grid/property-record-grid-header"
import PropertyRecordGridTable from "@/components/property-details-modal/property-record-grid/property-record-grid-table"
import {Card} from "@/components/ui/card"

interface GridProps {
	data: PropertyRecord[];
}

export default function PropertyRecordGrid({ data }: GridProps) {
	return (
		<Card className="space-y-4">
			<PropertyRecordGridHeader bbl={data[0].bbl} block={data[0].prop_block} lot={data[0].prop_lot} />
			<PropertyRecordGridTable data={data} />
		</Card>
	)
}
