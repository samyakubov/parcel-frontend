"use client"
import { useState } from "react"
import { isEmpty } from "lodash-es"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import ViolationsHeader from "@/components/property-details-modal/violations/violations-header"
import ViolationsTable from "@/components/property-details-modal/violations/violations-table"


interface ViolationsProps {
    violations: Violation[]
}

export default function Violations({ violations }: ViolationsProps) {
	const [isExpanded, setIsExpanded] = useState(false)

	if (isEmpty(violations)) {
		return (
			<Card className="border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 mb-3">
				<CardContent className="p-2">
					<motion.div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-900">
							<AlertTriangle className="h-6 w-6 text-slate-600 dark:text-slate-400" />
						</div>
						<h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                            No Violations found
						</h3>
					</motion.div>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950 mb-3">
			<CardContent className="p-2">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<ViolationsHeader
						isExpanded={isExpanded}
						setIsExpanded={setIsExpanded}
						violationsCount={violations.length}
					/>

					<AnimatePresence>
						{isExpanded && <ViolationsTable violations={violations} />}
					</AnimatePresence>
				</motion.div>
			</CardContent>
		</Card>
	)
}
