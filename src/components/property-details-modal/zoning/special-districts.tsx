"use client"
import React from "react"
import { Hash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {isEmpty} from "lodash-es"

interface SpecialDistrictsProps {
    districts: string[];
}

export default function SpecialDistricts({ districts }: SpecialDistrictsProps) {
	if (isEmpty(districts)) return null

	return (
		<div className="flex items-start gap-3 p-3 rounded-lg border bg-card">
			<div className="p-2 rounded-full bg-muted mt-1">
				<Hash className="h-4 w-4 text-muted-foreground" />
			</div>
			<div className="flex-1">
				<div className="text-sm font-medium text-muted-foreground mb-2">
					Special Districts
				</div>
				<div className="flex flex-wrap gap-1">
					{districts.map((district, index) => (
						<Badge key={index} variant="outline" className="text-xs">
							{district}
						</Badge>
					))}
				</div>
			</div>
		</div>
	)
}
