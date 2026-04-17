"use client"
import React, { useState, useMemo } from "react"
import { Search, X } from "lucide-react"
import { AppCard } from "@/components/property-details-modal/shared/app-card"
import { SectionHeader } from "@/components/property-details-modal/shared/section-header"
import OwnersEmpty from "@/components/property-details-modal/owners/owners-empty"
import { isEmpty } from "lodash-es"
import TimelineEntry from "@/components/property-details-modal/owners/timeline-entry"

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
