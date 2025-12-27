"use client"
import React from "react"
import { isEmpty } from "lodash-es"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface OwnerListProps {
	owners: string[];
}

export default function OwnerList({ owners }: OwnerListProps) {
	if (isEmpty(owners)) {
		return (
			<Alert variant="destructive">
				<AlertDescription>
					No owners on record
				</AlertDescription>
			</Alert>
		)
	}

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

