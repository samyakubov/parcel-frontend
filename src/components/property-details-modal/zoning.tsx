"use client"
import React from "react"
import { Hash, Map, Building2, Clock } from "lucide-react"
import isNull from "lodash-es/isNull"
import isUndefined from "lodash-es/isUndefined"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { FORMAT_DATE } from "@/utils/format-date"

interface ZoningSectionProps {
    zoning: Zoning
}

export default function Zoning({ zoning }: ZoningSectionProps) {

	const hasNoZoningData = isNull(zoning.zoning_districts) || isUndefined(zoning.zoning_districts) || (
		zoning.zoning_districts.length === 0 &&
        zoning.commercial_overlays.length === 0 &&
        zoning.special_districts.length === 0 &&
        !zoning.limited_height_district
	)

	if (hasNoZoningData) {
		return (
			<Card className="w-full">
				<CardHeader>
					<div className="flex items-center gap-2">
						<div className="p-2 rounded-full bg-destructive/10">
							<Map className="h-4 w-4 text-destructive" />
						</div>
						<h3 className="text-lg font-semibold text-destructive">
                            Zoning Information
						</h3>
					</div>
				</CardHeader>
				<CardContent>
					<Alert variant="destructive">
						<AlertDescription>
                            No zoning information available.
						</AlertDescription>
					</Alert>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card className="w-full">
			<CardHeader>
				<div className="flex items-center gap-2">
					<div className="p-2 rounded-full bg-primary/10">
						<Map className="h-4 w-4 text-primary" />
					</div>
					<h3 className="text-lg font-semibold">
                        Zoning Information
					</h3>
				</div>
			</CardHeader>

			<CardContent className="space-y-4">
				{zoning.zoning_districts.length > 0 && (
					<div className="flex items-start gap-3 p-3 rounded-lg border bg-card">
						<div className="p-2 rounded-full bg-muted mt-1">
							<Map className="h-4 w-4 text-muted-foreground" />
						</div>
						<div className="flex-1">
							<div className="text-sm font-medium text-muted-foreground mb-2">
                                Zoning Districts
							</div>
							<div className="flex flex-wrap gap-1">
								{zoning.zoning_districts.map((district, index) => (
									<Badge key={index} variant="default" className="text-xs">
										{district}
									</Badge>
								))}
							</div>
						</div>
					</div>
				)}

				{zoning.commercial_overlays.length > 0 && (
					<div className="flex items-start gap-3 p-3 rounded-lg border bg-card">
						<div className="p-2 rounded-full bg-muted mt-1">
							<Building2 className="h-4 w-4 text-muted-foreground" />
						</div>
						<div className="flex-1">
							<div className="text-sm font-medium text-muted-foreground mb-2">
                                Commercial Overlays
							</div>
							<div className="flex flex-wrap gap-1">
								{zoning.commercial_overlays.map((overlay, index) => (
									<Badge key={index} variant="secondary" className="text-xs">
										{overlay}
									</Badge>
								))}
							</div>
						</div>
					</div>
				)}

				{zoning.special_districts.length > 0 && (
					<div className="flex items-start gap-3 p-3 rounded-lg border bg-card">
						<div className="p-2 rounded-full bg-muted mt-1">
							<Hash className="h-4 w-4 text-muted-foreground" />
						</div>
						<div className="flex-1">
							<div className="text-sm font-medium text-muted-foreground mb-2">
                                Special Districts
							</div>
							<div className="flex flex-wrap gap-1">
								{zoning.special_districts.map((district, index) => (
									<Badge key={index} variant="outline" className="text-xs">
										{district}
									</Badge>
								))}
							</div>
						</div>
					</div>
				)}

				{zoning.limited_height_district && (
					<div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
						<div className="p-2 rounded-full bg-muted">
							<Building2 className="h-4 w-4 text-muted-foreground" />
						</div>
						<div className="flex-1">
							<div className="text-sm font-medium text-muted-foreground">
                                Limited Height District
							</div>
							<div className="text-sm font-semibold">
								{zoning.limited_height_district}
							</div>
						</div>
					</div>
				)}

				{zoning.last_updated && (
					<div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
						<div className="p-2 rounded-full bg-muted">
							<Clock className="h-4 w-4 text-muted-foreground" />
						</div>
						<div className="flex-1">
							<div className="text-sm font-medium text-muted-foreground">
                                Last Updated
							</div>
							<div className="text-sm font-semibold font-mono">
								{FORMAT_DATE(zoning.last_updated)}
							</div>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
