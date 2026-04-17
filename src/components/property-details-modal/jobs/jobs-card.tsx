"use client"
import React from "react"
import {StatusTag} from "@/components/property-details-modal/shared/status-tag"
import {CalendarDays} from "lucide-react"

interface JobsTableProps {
	jobs: JobFiled[]
}

export default function JobCard({ job }: { job: JobFiled }) {
	const isPositive = job.job_status?.toLowerCase().includes("permit") ||
		job.job_status?.toLowerCase().includes("complete")
	const applicant = [job.applicant_first_name, job.applicant_last_name].filter(Boolean).join(" ")

	return (
		<div className="py-3 border-b border-border last:border-b-0">
			<div className="flex items-start justify-between gap-2">
				<span className="text-[15px] font-bold text-foreground leading-snug flex-1">
					{job.job_type || "Job Filing"}
				</span>
				{job.job_status && (
					<StatusTag status={job.job_status} isPositive={isPositive} />
				)}
			</div>

			{job.job_description && (
				<p className="mt-1.5 text-[13px] text-muted-foreground leading-snug">
					{job.job_description}
				</p>
			)}

			{applicant && (
				<div className="mt-3 flex items-center gap-1">
					<CalendarDays className="h-3 w-3 text-muted-foreground/50 flex-shrink-0" />
					<span className="text-[12px] text-muted-foreground/70 font-medium">
						Applicant: {applicant}
					</span>
				</div>
			)}
		</div>
	)
}
