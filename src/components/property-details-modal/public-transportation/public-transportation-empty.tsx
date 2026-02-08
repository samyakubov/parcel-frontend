import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BusFront } from "lucide-react"

export default function PublicTransportationEmpty() {
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<div className="p-2 rounded-full bg-muted">
						<BusFront className="h-4 w-4 text-muted-foreground" />
					</div>
					<h3 className="text-lg font-semibold text-muted-foreground">
						Public Transportation
					</h3>
				</div>
			</CardHeader>
			<CardContent>
				<Alert variant="default" className="bg-muted/50 border-0">
					<AlertDescription className="text-muted-foreground flex items-center gap-2">
						<BusFront className="h-4 w-4" />
						No public transit information available.
					</AlertDescription>
				</Alert>
			</CardContent>
		</Card>
	)
}
