"use client"
import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { JOBS_COLUMNS } from "@/constants/property"

interface JobsTableProps {
    jobs: JobFiled[];
}

export default function JobsTable({ jobs }: JobsTableProps) {
	return (
		<motion.div
			initial={{ height: 0, opacity: 0 }}
			animate={{ height: "auto", opacity: 1 }}
			exit={{ height: 0, opacity: 0 }}
			transition={{ duration: 0.3 }}
			className="overflow-hidden"
		>
			<Card className="mt-4 border-border">
				<ScrollArea className="h-96">
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								{JOBS_COLUMNS.map((column) => (
									<TableHead
										key={column}
										className="font-semibold text-foreground whitespace-nowrap"
									>
										{column}
									</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							<AnimatePresence>
								{jobs.map((job, index) => (
									<motion.tr
										key={job.job + " " + index.toString()}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: index * 0.05 }}
										className="border-b transition-colors hover:bg-muted/50"
									>
										<TableCell className="py-3 font-medium">
											{job.job}
										</TableCell>
										<TableCell className="py-3 text-muted-foreground">
											{job.job_description}
										</TableCell>
									</motion.tr>
								))}
							</AnimatePresence>
						</TableBody>
					</Table>
				</ScrollArea>
			</Card>
		</motion.div>
	)
}
