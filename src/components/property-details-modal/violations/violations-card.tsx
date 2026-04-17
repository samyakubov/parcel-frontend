"use client"
import React from "react"
import {StatusTag} from "@/components/property-details-modal/shared/status-tag"
import {CalendarDays} from "lucide-react"
import {FORMAT_DATE} from "@/utils/format-date"
import {FORMAT_PRICE} from "@/utils/format-price"

export default function ViolationCard({ violation }: { violation: Violation }) {
	const isClosed = violation.violation_status?.toLowerCase().includes("close") ||
		violation.violation_status?.toLowerCase().includes("resolve")
	const hasFine = violation.penalty_amount > 0

	return (
		<div className="py-3 border-b border-border last:border-b-0">
			<div className="flex items-start justify-between gap-2">
				<span className="text-[15px] font-bold text-foreground leading-snug flex-1">
					{violation.violation_type || "Violation"}
				</span>
				{violation.violation_status && (
					<StatusTag status={violation.violation_status} isPositive={isClosed} />
				)}
			</div>

			{violation.description && (
				<p className="mt-1.5 text-[13px] text-muted-foreground leading-snug">
					{violation.description}
				</p>
			)}

			{(violation.issue_date || hasFine) && (
				<div className="mt-3 flex items-center gap-3">
					{violation.issue_date && (
						<div className="flex items-center gap-1 flex-1 min-w-0">
							<CalendarDays className="h-3 w-3 text-muted-foreground/50 flex-shrink-0" />
							<span className="text-[12px] text-muted-foreground/70 font-medium truncate">
								{FORMAT_DATE(violation.issue_date)}
							</span>
						</div>
					)}
					{hasFine && (
						<span className="text-[12px] font-bold text-destructive flex-shrink-0">
							Fine: {FORMAT_PRICE(violation.penalty_amount)}
						</span>
					)}
				</div>
			)}
		</div>
	)
}
