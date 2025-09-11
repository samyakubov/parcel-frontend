"use client"
import React from "react"
import { Building2 } from "lucide-react"

interface LimitedHeightDistrictProps {
    district: string;
}

export default function LimitedHeightDistrict({ district }: LimitedHeightDistrictProps) {
	if (!district) return null

	return (
		<div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
			<div className="p-2 rounded-full bg-muted">
				<Building2 className="h-4 w-4 text-muted-foreground" />
			</div>
			<div className="flex-1">
				<div className="text-sm font-medium text-muted-foreground">
					Limited Height District
				</div>
				<div className="text-sm font-semibold">
					{district}
				</div>
			</div>
		</div>
	)
}
