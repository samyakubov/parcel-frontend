"use client"
import React, { useState, useMemo } from "react"
import { Search, X } from "lucide-react"
import { AppCard } from "@/components/property-details-modal/shared/app-card"
import { SectionHeader } from "@/components/property-details-modal/shared/section-header"
import OwnersEmpty from "@/components/property-details-modal/owners/owners-empty"
import { isEmpty } from "lodash-es"
import { cn } from "@/lib/utils"

interface TimelineEntryProps {
	name: string
	isCurrent: boolean
	isFirst: boolean
	isLast: boolean
}

function TimelineEntry({ name, isCurrent, isFirst, isLast }: TimelineEntryProps) {
	// Strip phone numbers like (1234567890) from name
	const displayName = name.replace(/\s*\(.*?\)\s*/g, "").trim()
	const phoneMatch = name.match(/\((\d{10})\)/)
	const phone = phoneMatch ? phoneMatch[1] : null

	return (
		<div className="flex items-stretch gap-3">
			{/* Timeline spine */}
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

			{/* Card */}
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

interface OwnersProps {
	currentOwners: string[]
	previousOwners: string[]
}

export default function Owners({ currentOwners, previousOwners }: OwnersProps) {
	const [query, setQuery] = useState("")

	const filtered = useMemo(() => {
		const allOwners = [
			...currentOwners.map(name => ({ name, isCurrent: true })),
			...previousOwners.map(name => ({ name, isCurrent: false })),
		]
		if (!query.trim()) return allOwners
		const q = query.toLowerCase()
		return allOwners.filter(o => o.name.toLowerCase().includes(q))
	}, [currentOwners, previousOwners, query])

	if (isEmpty(currentOwners) && isEmpty(previousOwners)) {
		return <OwnersEmpty />
	}

	return (
		<div className="px-1 pt-2">
			<SectionHeader
				title="Ownership History"
				subtitle="Showing timeline from most recent to earliest."
			/>

			<div className="relative mb-6">
				<Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
				<input
					type="text"
					value={query}
					onChange={e => setQuery(e.target.value)}
					placeholder="Search through owners..."
					className="w-full rounded-full border border-border bg-muted/30 py-3 pl-10 pr-10 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50"
				/>
				{query && (
					<button
						onClick={() => setQuery("")}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
					>
						<X className="h-4 w-4" />
					</button>
				)}
			</div>

			{filtered.length === 0 ? (
				<AppCard className="text-center text-sm text-muted-foreground py-10">
					No owners match &ldquo;{query}&rdquo;
				</AppCard>
			) : (
				<div>
					{filtered.map((owner, i) => (
						<TimelineEntry
							key={i}
							name={owner.name}
							isCurrent={owner.isCurrent}
							isFirst={i === 0}
							isLast={i === filtered.length - 1}
						/>
					))}
				</div>
			)}
		</div>
	)
}
