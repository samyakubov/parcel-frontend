"use client"
import React from "react"
import { cn } from "@/lib/utils"


interface TimelineEntryProps {
	name: string
	isCurrent: boolean
	isFirst: boolean
	isLast: boolean
}
export default function TimelineEntry({ name, isCurrent, isFirst, isLast }: TimelineEntryProps) {
	const displayName = name.replace(/\s*\(.*?\)\s*/g, "").trim()
	const phoneMatch = name.match(/\((\d{10})\)/)
	const phone = phoneMatch ? phoneMatch[1] : null

	return (
		<div className="flex items-stretch gap-3">
			<div className="flex flex-col items-center w-8 flex-shrink-0">
				{!isFirst && <div className="w-0.5 h-3 bg-border" />}
				<div className={cn(
					"w-3 h-3 rounded-full border-2 flex-shrink-0",
					isCurrent
						? "bg-primary border-primary/50 shadow-[0_0_6px_2px_hsl(var(--primary)/0.2)]"
						: "bg-card border-muted-foreground/30"
				)} />
				{!isLast && <div className="w-0.5 flex-1 bg-border" />}
			</div>

			<div className={cn(
				"flex-1 rounded-[16px] border p-4 mb-5",
				isCurrent ? "border-primary/30 bg-card" : "border-border bg-card"
			)}>
				<div className={cn(
					"inline-flex items-center px-2 py-1 rounded-md mb-2.5",
					isCurrent ? "bg-primary/12" : "bg-muted"
				)}>
					<span className={cn(
						"text-[9px] font-extrabold uppercase tracking-wide",
						isCurrent ? "text-primary" : "text-muted-foreground"
					)}>
						{isCurrent ? "Current Owner" : "Previous Owner"}
					</span>
				</div>

				<div className={cn(
					"text-base font-bold",
					isCurrent ? "text-primary" : "text-foreground"
				)}>
					{displayName}
				</div>

				{phone && (
					<div className="mt-1.5 text-[13px] text-muted-foreground font-medium">
						({phone.slice(0, 3)}) {phone.slice(3, 6)}-{phone.slice(6)}
					</div>
				)}
			</div>
		</div>
	)
}

