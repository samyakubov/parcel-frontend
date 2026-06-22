"use client"
import React from "react"
import { isEmpty } from "lodash-es"
import { Calendar } from "lucide-react"

function StatusTag({ status, isPositive }: { status: string; isPositive: boolean }) {
	return (
		<span className={`text-[11px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap flex-none ${
			isPositive
				? "bg-green-500/10 text-green-600 dark:text-green-400"
				: "bg-red-500/10 text-red-600 dark:text-red-400"
		}`}>
			{status}
		</span>
	)
}

interface ViolationsProps {
	violations: Violation[]
}

export default function Violations({ violations }: ViolationsProps) {
	if (isEmpty(violations)) return null

	return (
		<div className="px-1">
			<div className="mb-6 pl-1">
				<h3 className="text-xl font-extrabold tracking-tight text-foreground">Violations</h3>
				<p className="text-[13px] font-medium text-primary mt-1">Outstanding and historical legal violations.</p>
			</div>
			{violations.map((v, i) => {
				const type = v.violation_type || "Violation"
				const status = v.violation_status || "Unknown"
				const desc = v.description || "—"
				const date = v.issue_date || ""
				const penaltyAmount = v.penalty_amount
				const amount = penaltyAmount ? `Fine: $${Number(penaltyAmount).toLocaleString()}` : null
				const isClosed = status.toLowerCase().includes("close") || status.toLowerCase().includes("resolve")
				return (
					<div key={i}>
						<div className="py-3.5">
							<div className="flex items-start justify-between gap-2">
								<span className="font-bold text-[15px] text-foreground leading-tight flex-1">{type}</span>
								<StatusTag status={status} isPositive={isClosed} />
							</div>
							<p className="text-[13px] text-muted-foreground mt-1 leading-snug">{desc}</p>
							{(date || amount) && (
								<div className="flex items-center gap-1 mt-2.5">
									{date && (
										<>
											<Calendar className="w-3 h-3 text-muted-foreground/50 flex-none" />
											<span className="text-[12px] text-muted-foreground/70 font-medium flex-1">{date}</span>
										</>
									)}
									{amount && (
										<span className="text-[12px] font-bold text-red-600 dark:text-red-400 ml-auto">
											{amount}
										</span>
									)}
								</div>
							)}
						</div>
						{i < violations.length - 1 && <div className="h-px bg-border" />}
					</div>
				)
			})}
		</div>
	)
}
