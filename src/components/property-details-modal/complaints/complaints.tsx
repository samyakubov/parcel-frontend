"use client"
import React, { useState } from "react"
import isEmpty from "lodash-es/isEmpty"
import { CircleAlert } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import ComplaintsHeader from "@/components/property-details-modal/complaints/complaints-header"
import ComplaintsTable from "@/components/property-details-modal/complaints/complaints-table"


interface ComplaintsProps {
	complaints: Complaint[];
}

export default function Complaints({ complaints }: ComplaintsProps) {
	const [isExpanded, setIsExpanded] = useState(false)

	if (isEmpty(complaints)) {
		return (
			<Card className="border-muted/50 bg-muted/30 backdrop-blur-sm mb-3">
				<CardContent className="p-3">
					<motion.div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/50 shadow-sm">
							<CircleAlert className="h-5 w-5 text-muted-foreground" />
						</div>
						<h3 className="text-base font-semibold text-muted-foreground">
							No Complaints found
						</h3>
					</motion.div>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card className="border-amber-200/50 dark:border-amber-800/30 bg-amber-50/50 dark:bg-amber-950/30 backdrop-blur-sm mb-3 shadow-lg shadow-amber-500/5">
			<CardContent className="p-3">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<ComplaintsHeader
						isExpanded={isExpanded}
						setIsExpanded={setIsExpanded}
						complaintsCount={complaints.length}
					/>

					<AnimatePresence>
						{isExpanded && <ComplaintsTable complaints={complaints} />}
					</AnimatePresence>
				</motion.div>
			</CardContent>
		</Card>
	)
}
