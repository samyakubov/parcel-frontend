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
			<Card className="border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950">
				<CardContent className="p-6">
					<motion.div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
							<CircleAlert className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
						</div>
						<h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200">
                            No Complaints found
						</h3>
					</motion.div>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950 mb-3">
			<CardContent className="p-2">
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
