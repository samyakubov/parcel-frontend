"use client"

import React from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import {Users} from "lucide-react"

export default function CensusEmpty() {
	return (
		<Card className="w-full mb-3">
			<div className="flex items-center gap-2">
				<div className="p-2 rounded-full bg-primary/10">
					<Users className="h-4 w-4 text-primary" />
				</div>
				<h3 className="text-lg font-semibold text-destructive">Census Details</h3>
			</div>
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
