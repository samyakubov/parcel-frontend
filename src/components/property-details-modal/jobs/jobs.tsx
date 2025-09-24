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
			<Card className="border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 mb-3">
				<CardContent className="p-2">
					<motion.div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-900">
							<FileWarning className="h-6 w-6 text-slate-600 dark:text-slate-400" />
						</div>
						<h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                            No Jobs found
						</h3>
					</motion.div>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950 mb-3">
			<CardContent className="p-2">
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
