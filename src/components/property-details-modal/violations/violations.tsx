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
			<Card className="border-muted/50 bg-muted/30 backdrop-blur-sm mb-3">
				<CardContent className="p-3">
					<motion.div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/50 shadow-sm">
							<AlertTriangle className="h-5 w-5 text-muted-foreground" />
						</div>
						<h3 className="text-base font-semibold text-muted-foreground">
							No Violations found
						</h3>
					</motion.div>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card className="border-red-200/50 dark:border-red-800/30 bg-red-50/50 dark:bg-red-950/30 backdrop-blur-sm mb-3 shadow-lg shadow-red-500/5">
			<CardContent className="p-3">
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
