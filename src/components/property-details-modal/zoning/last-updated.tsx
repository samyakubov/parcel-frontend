"use client"
import React from "react"
import { Clock } from "lucide-react"
import { FORMAT_DATE } from "@/utils/format-date"

interface LastUpdatedProps {
	date: string;
}

export default function LastUpdated({ date }: LastUpdatedProps) {
	if (!date) return null

	return (
		<div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
			<div className="p-2 rounded-full bg-muted">
				<Clock className="h-4 w-4 text-muted-foreground" />
			</div>
			<div className="flex-1">
				<div className="text-sm font-medium text-muted-foreground">
					Last Updated
				</div>
				<div className="text-sm font-semibold font-mono">
					{FORMAT_DATE(date)}
				</div>
			</div>
		</div>
	)
}
