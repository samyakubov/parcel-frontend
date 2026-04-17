"use client"
import React, {useState} from "react"
import {StatusTag} from "@/components/property-details-modal/shared/status-tag"
import {ChevronDown} from "lucide-react"
import {cn} from "@/lib/utils"
import {DetailGrid} from "@/components/property-details-modal/shared/detail-grid"
import {FORMAT_DATE} from "@/utils/format-date"

export default function ComplaintCard({ complaint }: { complaint: Complaint }) {
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
