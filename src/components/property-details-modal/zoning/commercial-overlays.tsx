"use client"
import React from "react"
import { Building2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {isEmpty} from "lodash-es"

interface CommercialOverlaysProps {
    overlays: string[];
}

export default function CommercialOverlays({ overlays }: CommercialOverlaysProps) {
	if (isEmpty(overlays)) return null

	return (
		<div className="flex items-start gap-3 p-3 rounded-lg border bg-card">
			<div className="p-2 rounded-full bg-muted mt-1">
				<Building2 className="h-4 w-4 text-muted-foreground" />
			</div>
			<div className="flex-1">
				<div className="text-sm font-medium text-muted-foreground mb-2">
					Commercial Overlays
				</div>
				<div className="flex flex-wrap gap-1">
					{overlays.map((overlay, index) => (
						<Badge key={index} variant="secondary" className="text-xs">
							{overlay}
						</Badge>
					))}
				</div>
			</div>
		</div>
	)
}
