"use client"
import React, { useState } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { isEmpty } from "lodash-es"

function TimelineEntry({
	name, label, isCurrent, isLast,
}: {
	name: string; label: string; isCurrent: boolean; isLast: boolean
}) {
	return (
		<div className="flex gap-3">
			<div className="flex flex-col items-center w-5 flex-none">
				<div className={`w-2.5 h-2.5 rounded-full flex-none mt-1.5 ${isCurrent ? "bg-primary" : "bg-border border-2 border-muted-foreground/30"}`} />
				{!isLast && <div className="w-0.5 flex-1 bg-border mt-1" />}
			</div>
			<div className={`flex-1 ${!isLast ? "pb-4" : ""}`}>
				<span className="font-bold text-[14px] text-foreground">{name}</span>
				<p className="text-[12px] font-medium text-muted-foreground mt-0.5">{label}</p>
			</div>
		</div>
	)
}

interface OwnerProps {
	currentOwners: string[]
	previousOwners: string[]
}

export default function Owners({ currentOwners, previousOwners }: OwnerProps) {
	const [search, setSearch] = useState("")

	if (isEmpty(currentOwners) && isEmpty(previousOwners)) {
		return (
			<div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
				<p className="text-sm font-medium">No ownership records found.</p>
			</div>
		)
	}

	const filter = (list: string[]) => {
		if (!search.trim()) return list
		return list.filter(o => o.toLowerCase().includes(search.toLowerCase()))
	}

	const filteredCurrent = filter(currentOwners ?? [])
	const filteredPrevious = filter(previousOwners ?? [])
	const hasNoResults = !!search.trim() && !filteredCurrent.length && !filteredPrevious.length

	const allEntries = [
		...filteredCurrent.map(name => ({ name, label: "Current Owner", isCurrent: true })),
		...filteredPrevious.map(name => ({ name, label: "Previous Owner", isCurrent: false })),
	]

	return (
		<div className="px-1">
			<div className="mb-6 pl-1">
				<h3 className="text-xl font-extrabold tracking-tight text-foreground">Ownership History</h3>
				<p className="text-[13px] font-medium text-primary mt-1">Showing timeline from most recent to earliest.</p>
			</div>

			<div className="relative mb-6">
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
				<Input
					className="pl-10 pr-10 rounded-full bg-muted/30 border-border/50"
					placeholder="Search through owners..."
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
				{search && (
					<button className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setSearch("")}>
						<X className="h-4 w-4 text-muted-foreground" />
					</button>
				)}
			</div>

			{hasNoResults ? (
				<div className="py-10 text-center text-muted-foreground/60">
					<p className="text-sm">No owners match &ldquo;{search}&rdquo;</p>
				</div>
			) : (
				<div>
					{allEntries.map((entry, i) => (
						<TimelineEntry
							key={`${entry.name}-${i}`}
							name={entry.name}
							label={entry.label}
							isCurrent={entry.isCurrent}
							isLast={i === allEntries.length - 1}
						/>
					))}
				</div>
			)}
		</div>
	)
}
