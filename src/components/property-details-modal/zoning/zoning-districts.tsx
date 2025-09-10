"use client"
import React from "react"
import { Map } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ZoningDistrictsProps {
    districts: string[];
}

export default function ZoningDistricts({ districts }: ZoningDistrictsProps) {
	if (districts.length === 0) return null

	return (
		<div className="flex items-start gap-3 p-3 rounded-lg border bg-card">
			<div className="p-2 rounded-full bg-muted mt-1">
				<Map className="h-4 w-4 text-muted-foreground" />
			</div>
			<div className="flex-1">
				<div className="text-sm font-medium text-muted-foreground mb-2">
					Zoning Districts
				</div>
				<div className="flex flex-wrap gap-1">
					{districts.map((district, index) => (
						<Badge key={index} variant="default" className="text-xs">
							{district}
						</Badge>
					))}
				</div>
			</div>
		</div>
	)
}
