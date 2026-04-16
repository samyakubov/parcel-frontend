"use client"
import React, { useState } from "react"
import { ShieldCheck, ChevronDown } from "lucide-react"
import { SectionHeader } from "@/components/property-details-modal/shared/section-header"
import { DetailGrid } from "@/components/property-details-modal/shared/detail-grid"
import { StatusTag } from "@/components/property-details-modal/shared/status-tag"
import { cn } from "@/lib/utils"
import { FORMAT_DATE } from "@/utils/format-date"
import { isEmpty } from "lodash-es"

interface ComplaintsProps {
	complaints: Complaint[]
}

function ComplaintCard({ complaint }: { complaint: Complaint }) {
	const [open, setOpen] = useState(false)
	const isClosed = complaint.status?.toLowerCase().includes("closed")

	const details = [
		complaint.inspection_date && { label: "Inspection", value: FORMAT_DATE(complaint.inspection_date) },
		complaint.disposition_date && { label: "Disposition", value: FORMAT_DATE(complaint.disposition_date) },
		complaint.disposition_code && { label: "Code", value: complaint.disposition_code },
		complaint.bin && { label: "BIN", value: complaint.bin },
	].filter(Boolean) as { label: string; value: string }[]

	return (
		<div className="rounded-[16px] border border-border bg-card mb-3 overflow-hidden">
			<button
				onClick={() => setOpen(o => !o)}
				className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
			>
				<div className="flex-1 min-w-0">
					<div className="text-[15px] font-bold text-foreground leading-snug">
						{complaint.complaint_category || "Complaint"}
					</div>
					{complaint.complaint_number && (
						<div className="text-[12px] text-muted-foreground font-medium mt-0.5">
							#{complaint.complaint_number}
						</div>
					)}
				</div>

				<div className="flex items-center gap-2 flex-shrink-0">
					{complaint.status && (
						<StatusTag status={complaint.status} isPositive={isClosed} />
					)}
					<ChevronDown className={cn(
						"h-4 w-4 text-muted-foreground/50 transition-transform duration-200",
						open && "rotate-180"
					)} />
				</div>
			</button>

			{open && details.length > 0 && (
				<div className="px-4 pb-4 pt-1 bg-muted/30 border-t border-border">
					<DetailGrid items={details} />
				</div>
			)}
		</div>
	)
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
