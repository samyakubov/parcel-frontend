"use client"
import React from "react"
import { Construction, CalendarDays } from "lucide-react"
import { SectionHeader } from "@/components/property-details-modal/shared/section-header"
import { cn } from "@/lib/utils"
import { isEmpty } from "lodash-es"

interface JobsProps {
	jobsFiled: JobFiled[]
}

function StatusTag({ status, isPositive }: { status: string; isPositive: boolean }) {
	return (
		<span className={cn(
			"inline-flex items-center px-2 py-1 rounded-md text-[9px] font-extrabold uppercase tracking-wide flex-shrink-0",
			isPositive
				? "bg-green-50 text-green-700 dark:bg-green-500/15 dark:text-green-300"
				: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
		)}>
			{status}
		</span>
	)
}

function JobCard({ job }: { job: JobFiled }) {
	const isPositive = job.job_status?.toLowerCase().includes("permit") ||
		job.job_status?.toLowerCase().includes("complete")
	const applicant = [job.applicant_first_name, job.applicant_last_name].filter(Boolean).join(" ")

	return (
		<div className="py-3 border-b border-border last:border-b-0">
			{/* Title + status */}
			<div className="flex items-start justify-between gap-2">
				<span className="text-[15px] font-bold text-foreground leading-snug flex-1">
					{job.job_type || "Job Filing"}
				</span>
				{job.job_status && (
					<StatusTag status={job.job_status} isPositive={isPositive} />
				)}
			</div>

			{/* Description */}
			{job.job_description && (
				<p className="mt-1.5 text-[13px] text-muted-foreground leading-snug">
					{job.job_description}
				</p>
			)}

			{/* Applicant */}
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

export default function Jobs({ jobsFiled }: JobsProps) {
	if (isEmpty(jobsFiled)) {
		return (
			<div className="px-1 pt-2">
				<SectionHeader title="Job Filings" subtitle="New construction, alterations, and renovation filings." />
				<div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
					<Construction className="h-10 w-10 mb-3 opacity-20" />
					<p className="text-sm">No job filings recorded.</p>
				</div>
			</div>
		)
	}

	return (
		<div className="px-1 pt-2">
			<SectionHeader title="Job Filings" subtitle="New construction, alterations, and renovation filings." />
			<div>
				{jobsFiled.map((job, i) => (
					<JobCard key={i} job={job} />
				))}
			</div>
		</div>
	)
}
