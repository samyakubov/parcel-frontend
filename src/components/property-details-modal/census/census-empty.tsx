"use client"

import React from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import CensusHeader from "@/components/property-details-modal/census/census-header"
import { Card, CardContent } from "@/components/ui/card"

export default function CensusEmpty() {
	return (
		<Card className="w-full mb-3">
			<CensusHeader />
			<CardContent>
				<Alert variant="destructive">
					<AlertDescription>
						No census data on record
					</AlertDescription>
				</Alert>
			</CardContent>
		</Card>
	)
}
