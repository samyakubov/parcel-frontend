"use client"
import React from "react"
import { FileText, CalendarDays } from "lucide-react"
import { SectionHeader } from "@/components/property-details-modal/shared/section-header"
import { FORMAT_PRICE } from "@/utils/format-price"
import { FORMAT_DATE } from "@/utils/format-date"

interface GridProps {
	data: PropertyRecord[]
}

function RecordCard({ record }: { record: PropertyRecord }) {
	const hasAmount = record.amount > 0

	return (
		<div className="py-3 border-b border-border last:border-b-0">
			<div className="flex items-start justify-between gap-2">
				<span className="text-[15px] font-bold text-foreground leading-snug flex-1">
					{record.partytype_desc || "Record"}
				</span>
				{hasAmount && (
					<span className="text-[13px] font-bold text-primary flex-shrink-0">
						{FORMAT_PRICE(record.amount)}
					</span>
				)}
			</div>

			{record.party_name && (
				<p className="mt-1.5 text-[13px] text-muted-foreground leading-snug">
					{record.party_name}
				</p>
			)}

			{(record.doc_type || record.record_filed) && (
				<div className="mt-3 flex items-center gap-3">
					{record.doc_type && (
						<div className="flex items-center gap-1 flex-1 min-w-0">
							<FileText className="h-3 w-3 text-muted-foreground/50 flex-shrink-0" />
							<span className="text-[12px] text-muted-foreground/70 font-medium truncate">
								{record.doc_type}
							</span>
						</div>
					)}
					{record.record_filed && (
						<div className="flex items-center gap-1 flex-shrink-0">
							<CalendarDays className="h-3 w-3 text-muted-foreground/50" />
							<span className="text-[12px] text-muted-foreground/70 font-medium">
								{FORMAT_DATE(record.record_filed)}
							</span>
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default function PropertyRecordGrid({ data }: GridProps) {
	if (!data || data.length === 0) {
		return (
			<div className="px-1 pt-2">
				<SectionHeader title="Record Activity" subtitle="Historical property and ownership data records." />
				<div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
					<FileText className="h-10 w-10 mb-3 opacity-20" />
					<p className="text-sm">No activity records available.</p>
				</div>
			</div>
		)
	}

	const { bbl, prop_block, prop_lot } = data[0]

	return (
		<div className="px-1 pt-2">
			<SectionHeader title="Record Activity" subtitle="Historical property and ownership data records." />

			<a
				href={`http://a836-acris.nyc.gov/bblsearch/bblsearch.asp?borough=${bbl?.[0]}&block=${prop_block}&lot=${prop_lot}`}
				target="_blank"
				rel="noopener noreferrer"
				className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary hover:underline underline-offset-4 mb-6 pl-1"
			>
				View on ACRIS →
			</a>

			<div>
				{data.map((record, i) => (
					<RecordCard key={`${record.documentid}-${i}`} record={record} />
				))}
			</div>
		</div>
	)
}
