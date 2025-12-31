"use client"
import { useState } from "react"
import { isEmpty } from "lodash-es"
import { Card, CardContent } from "@/components/ui/card"
import { FileWarning } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import JobsHeader from "@/components/property-details-modal/jobs/jobs-header"
import JobsTable from "@/components/property-details-modal/jobs/jobs-table"


interface JobsProps {
    jobsFiled: JobFiled[]
}

export default function Jobs({ jobsFiled }: JobsProps) {
	const [isExpanded, setIsExpanded] = useState(false)

	if (isEmpty(jobsFiled)) {
		return (
			<Card className="border-muted/50 bg-muted/30 backdrop-blur-sm mb-3">
				<CardContent className="p-2">
					<motion.div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/50 shadow-sm">
							<FileWarning className="h-5 w-5 text-muted-foreground" />
						</div>
						<h3 className="text-base font-semibold text-muted-foreground">
                            No Jobs found
						</h3>
					</motion.div>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card className="border-green-200/50 bg-green-50 dark:border-green-800/30 dark:bg-green-950/30 mb-3 shadow-lg shadow-green-500/5">
			<CardContent className="p-3">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<JobsHeader
						isExpanded={isExpanded}
						setIsExpanded={setIsExpanded}
						jobCount={jobsFiled.length}
					/>

					<AnimatePresence>
						{isExpanded && <JobsTable jobs={jobsFiled} />}
					</AnimatePresence>
				</motion.div>
			</CardContent>
		</Card>
	)
}
