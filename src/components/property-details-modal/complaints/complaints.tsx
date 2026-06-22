"use client"
import React, { useState } from "react"
import { isEmpty } from "lodash-es"
import { ChevronDown } from "lucide-react"

function StatusTag({ status, isPositive }: { status: string; isPositive: boolean }) {
	return (
		<span className={`text-[11px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap flex-none ${
			isPositive
				? "bg-green-500/10 text-green-600 dark:text-green-400"
				: "bg-muted text-muted-foreground"
		}`}>
			{status}
		</span>
	)
}

function DetailItem({ label, value }: { label: string; value: string }) {
	return (
		<div>
			<p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{label}</p>
			<p className="text-[13px] font-medium text-foreground mt-0.5">{value}</p>
		</div>
	)
}

function ComplaintRow({ complaint }: { complaint: Complaint }) {
	const [open, setOpen] = useState(false)
	const number = complaint.complaint_number || "—"
	const category = complaint.complaint_category || "Complaint"
	const status = complaint.status || "—"
	const isClosed = status.toLowerCase().includes("closed")

	const details = [
		complaint.inspection_date ? { label: "Inspection", value: complaint.inspection_date } : null,
		complaint.disposition_date ? { label: "Disposition", value: complaint.disposition_date } : null,
		complaint.disposition_code ? { label: "Code", value: String(complaint.disposition_code) } : null,
		complaint.bin ? { label: "BIN", value: String(complaint.bin) } : null,
	].filter((d): d is { label: string; value: string } => d !== null)

	return (
		<div>
			<button
				className="w-full py-3.5 flex items-start gap-2 text-left"
				onClick={() => setOpen(o => !o)}
			>
				<div className="flex-1">
					<span className="font-bold text-[15px] text-foreground">{category}</span>
					<p className="text-[12px] text-muted-foreground font-medium mt-0.5">#{number}</p>
				</div>
				<div className="flex items-center gap-2 flex-none">
					<StatusTag status={status} isPositive={isClosed} />
					<ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform flex-none ${open ? "rotate-180" : ""}`} />
				</div>
			</button>
			{open && details.length > 0 && (
				<div className="grid grid-cols-2 gap-3 p-3 mb-2 bg-muted/30 rounded-lg">
					{details.map(d => <DetailItem key={d.label} label={d.label} value={d.value} />)}
				</div>
			)}
		</div>
	)
}

interface ComplaintsProps {
	complaints: Complaint[]
}

export default function Complaints({ complaints }: ComplaintsProps) {
	if (isEmpty(complaints)) return null

	return (
		<div className="px-1">
			<div className="mb-2 pl-1">
				<h3 className="text-xl font-extrabold tracking-tight text-foreground">Complaints</h3>
				<p className="text-[13px] font-medium text-primary mt-1">Formal complaints lodged against the property.</p>
			</div>
			{complaints.map((c, i) => (
				<React.Fragment key={`${c.bin}-${i}`}>
					<ComplaintRow complaint={c} />
					{i < complaints.length - 1 && <div className="h-px bg-border" />}
				</React.Fragment>
			))}
		</div>
	)
}
