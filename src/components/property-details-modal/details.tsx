import React from "react"
import { Building2, Home, Hash } from "lucide-react"
import isEmpty from "lodash-es/isEmpty"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import PropertyDetailItem from "@/components/property-details-modal/mortgage/property-detail-item"

interface PropertyDetailProps {
    firstRecord: PropertyRecord
}

export default function Details(props: PropertyDetailProps) {
	const record = props.firstRecord

	if (isEmpty(record)) {
		return (
			<Card className="w-full">
				<CardHeader>
					<div className="flex items-center gap-2">
						<div className="p-2 rounded-full bg-destructive/10">
							<Building2 className="h-4 w-4 text-destructive" />
						</div>
						<h3 className="text-lg font-semibold text-destructive">
                            Property Details
						</h3>
					</div>
				</CardHeader>
				<CardContent>
					<Alert variant="destructive">
						<AlertDescription>
                            No property details available.
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
						<Building2 className="h-4 w-4 text-primary" />
					</div>
					<h3 className="text-lg font-semibold">
                        Property Details
					</h3>
				</div>
			</CardHeader>

			<CardContent className="space-y-4">
				<PropertyDetailItem
					icon={<Home className="h-4 w-4 text-muted-foreground" />}
					label="Property Type"
					value={record.prop_type}
				/>
				<PropertyDetailItem
					icon={<Hash className="h-4 w-4 text-muted-foreground" />}
					label="BBL"
					value={record.bbl}
				/>
			</CardContent>
		</Card>
	)
}
