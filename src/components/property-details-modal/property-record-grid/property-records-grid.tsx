"use client"
import React from "react"
import { Building2 } from "lucide-react"

function formatCurrency(amount: number): string {
	if (!amount || amount === 0) return ""
	return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(amount)
}

function formatDate(date: string): string {
	try { return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) }
	catch { return date }
}

interface GridProps {
	data: PropertyRecord[]
}

export default function PropertyRecordGrid({ data }: GridProps) {
	if (!data.length) {
		return (
			<div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
				<Building2 className="h-8 w-8 mb-2 opacity-40" />
				<p className="text-sm font-medium">No property records found</p>
			</div>
		)
	}

	return (
		<div className="px-1">
			<div className="mb-6 pl-1">
				<h3 className="text-xl font-extrabold tracking-tight text-foreground">Property Records</h3>
				<p className="text-[13px] font-medium text-primary mt-1">Historical property and ownership data records.</p>
			</div>
			{data.map((record, i) => {
				const isLast = i === data.length - 1
				const amount = formatCurrency(record.amount)
				const date = formatDate(record.record_filed)
				return (
					<div key={`${record.documentid}-${i}`} className="flex gap-3">
						<div className="flex flex-col items-center w-5 flex-none">
							<div className="w-2.5 h-2.5 rounded-full bg-primary flex-none mt-1.5" />
							{!isLast && <div className="w-0.5 flex-1 bg-border mt-1" />}
						</div>
						<div className={`flex-1 ${!isLast ? "pb-5" : ""}`}>
							<div className="flex items-start justify-between gap-2">
								<span className="font-bold text-[14px] text-foreground leading-tight">
									{record.partytype_desc || "Record"}
								</span>
								{amount && (
									<span className="text-[13px] font-bold text-primary flex-none">{amount}</span>
								)}
							</div>
							<p className="text-[13px] text-muted-foreground mt-0.5 font-medium">
								{record.party_name || "—"}
							</p>
							{date && (
								<p className="text-[11px] text-muted-foreground/60 font-medium mt-1">{date}</p>
							)}
						</div>
					</div>
				)
			})}
		</div>
	)
}
