"use client"
import React from "react"
import { Users } from "lucide-react"
import { CardHeader } from "@/components/ui/card"

export default function CensusHeader() {
	return (
		<CardHeader>
			<div className="flex items-center gap-2">
				<div className="p-2 rounded-full bg-primary/10">
					<Users className="h-4 w-4 text-primary" />
				</div>
				<h3 className="text-lg font-semibold">Census Details</h3>
			</div>
		</CardHeader>
	)
}
