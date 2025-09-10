"use client"
import React from "react"
import { Search } from "lucide-react"

interface OwnerListProps {
    owners: string[];
}

export default function OwnerList({ owners }: OwnerListProps) {
	if (owners.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-8 text-center">
				<div className="p-3 rounded-full bg-muted mb-3">
					<Search className="h-6 w-6 text-muted-foreground" />
				</div>
				<p className="text-sm text-muted-foreground">No matching current owners found.</p>
			</div>
		)
	}

	return (
		<div className="space-y-2">
			{owners.map((owner, index) => (
				<div
					key={index}
					className="flex items-center justify-between p-3 rounded-lg
					border bg-card hover:bg-accent/50 transition-colors"
				>
					<span className="text-sm font-medium">
						{owner}
					</span>
				</div>
			))}
		</div>
	)
}
