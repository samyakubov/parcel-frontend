"use client"
import React from "react"
import isEmpty from "lodash-es/isEmpty"
import { CircleAlert } from "lucide-react"
import ComplaintsTable from "@/components/property-details-modal/complaints/complaints-table"


interface ComplaintsProps {
	complaints: Complaint[]
}

export default function Complaints({ complaints }: ComplaintsProps) {

	if (isEmpty(complaints)) {
		return (
			<div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
				<CircleAlert className="h-8 w-8 mb-2 opacity-50" />
				<p>No complaints found</p>
			</div>
		)
	}

	return <ComplaintsTable complaints={complaints} />

}
