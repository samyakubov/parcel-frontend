"use client"
import React from "react"

interface OwnerListProps {
	owners: string[];
}

export default function OwnerList({ owners }: OwnerListProps) {
	return (
		<div className="space-y-2 overflow-y-auto max-h-80">
			{owners.map((owner, index) => (
				<div
					key={index}
					className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
					<span className="text-sm font-medium">
						{owner}
					</span>
				</div>
			))}
		</div>
	)
}

