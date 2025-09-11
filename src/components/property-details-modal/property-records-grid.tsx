"use client"
import React from "react"
import PropertyRecordGridHeader from "@/components/property-details-modal/property-record-grid-header"
import PropertyRecordGridTable from "@/components/property-details-modal/property-record-grid-table"

interface GridProps {
    data: PropertyRecord[];
}

export default function PropertyRecordGrid({ data }: GridProps) {
	return (
		<div className="space-y-6">
			<PropertyRecordGridHeader bbl={data[0].bbl} block={data[0].prop_block} lot={data[0].prop_lot} />
			<PropertyRecordGridTable data={data} />
		</div>
	)
}
