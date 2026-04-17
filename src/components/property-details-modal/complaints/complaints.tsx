"use client"
import React from "react"
import { ShieldCheck } from "lucide-react"
import { SectionHeader } from "@/components/property-details-modal/shared/section-header"
import { isEmpty } from "lodash-es"
import ComplaintCard from "@/components/property-details-modal/complaints/complaints-card"

interface ComplaintsProps {
	complaints: Complaint[]
}

export default function Complaints({ complaints }: ComplaintsProps) {
	if (isEmpty(complaints)) {
		return (
			<div className="px-1 pt-2">
				<SectionHeader title="Property Complaints" subtitle="Formal complaints lodged against the property." />
				<div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
					<ShieldCheck className="h-10 w-10 mb-3 opacity-20" />
					<p className="text-sm">No complaints recorded.</p>
				</div>
			</div>
		)
	}

	return (
		<div className="px-1 pt-2">
			<SectionHeader title="Property Complaints" subtitle="Formal complaints lodged against the property." />
			{complaints.map((c, i) => (
				<ComplaintCard key={i} complaint={c} />
			))}
		</div>
	)
}
