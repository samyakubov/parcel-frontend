"use client"
import React from "react"
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
	jobs: JobFiled[]
}

export default function JobsTable({ jobs }: JobsTableProps) {
	return (
		<div className="overflow-hidden">
			<div className="mt-2 border-t border-border/50">
				<ScrollArea className="h-60">
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								{JOBS_COLUMNS.map((column) => (
									<TableHead
										key={column}
										className="font-semibold text-foreground whitespace-nowrap text-xs h-8"
									>
										{column}
									</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{jobs.map((job, index) => (
								<tr
									key={job.bin + " " + index.toString()}
									className="border-b transition-colors hover:bg-muted/50"
								>
									<TableCell className="py-2 text-muted-foreground text-xs">
										{job.job_description}
									</TableCell>
									<TableCell className="py-2 text-muted-foreground text-xs">
										{job.applicant_first_name} {job.applicant_last_name}
									</TableCell>
									<TableCell className="py-2 text-muted-foreground text-xs">
										{job.applicant_professional_title}
									</TableCell>
									<TableCell className="py-2 text-muted-foreground text-xs">
										{job.job_status}
									</TableCell>
									<TableCell className="py-2 text-muted-foreground text-xs">
										{job.job_type}
									</TableCell>
								</tr>
							))}
						</TableBody>
					</Table>
				</ScrollArea>
			</div>
		</div>
	)
}
