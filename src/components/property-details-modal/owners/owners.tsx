"use client"
import React from "react"
import { Users } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import PreviousOwners from "@/components/property-details-modal/owners/previous-owners"
import OwnersEmpty from "@/components/property-details-modal/owners/owners-empty"
import CurrentOwners from "@/components/property-details-modal/owners/current-owners"
import { isEmpty } from "lodash-es"

interface OwnerProps {
	currentOwners: string[];
	previousOwners: string[];
}

export default function Owners({ currentOwners, previousOwners }: OwnerProps) {

	if (isEmpty(currentOwners)) {
		return <OwnersEmpty />
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			className="w-full"
		>
			<Card className="py-2 gap-2">
				<CardHeader className="p-2">
					<div className="flex items-center gap-2">
						<div className="p-2 rounded-full bg-primary/10">
							<Users className="h-4 w-4 text-primary" />
						</div>
						<h3 className="text-lg font-semibold">
							Owners
						</h3>
					</div>
				</CardHeader>

				<CardContent className="space-y-2 p-2 py-0">
					<CurrentOwners owners={currentOwners} />
				</CardContent>

				<CardContent className="p-2 py-0">
					<PreviousOwners previousOwners={previousOwners} />
				</CardContent>
			</Card>
		</motion.div>
	)
}
