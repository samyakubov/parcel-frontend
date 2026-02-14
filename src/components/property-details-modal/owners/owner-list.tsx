"use client"
import React from "react"

interface OwnerListProps {
	owners: string[];
}

export default function OwnerList({ owners }: OwnerListProps) {
	return (
		<div className="space-y-1 overflow-y-auto max-h-80">
			{owners.map((owner, index) => (
				<div
					key={index}
					className="flex items-center justify-between p-2 rounded-lg border bg-card">
					<span className="text-sm font-medium">
						{owner}
					</span>
				</div>
			))}
		</div>
	)
}

