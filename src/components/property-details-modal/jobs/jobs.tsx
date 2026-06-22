"use client"
import React from "react"
import { isEmpty } from "lodash-es"
import { Calendar } from "lucide-react"

function StatusTag({ status, isPositive }: { status: string; isPositive: boolean }) {
	return (
		<span className={`text-[11px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap flex-none ${
			isPositive
				? "bg-green-500/10 text-green-600 dark:text-green-400"
				: "bg-muted text-muted-foreground"
		}`}>
			{status}
		</span>
	)
}

interface JobsProps {
	jobsFiled: JobFiled[]
}

export default function Jobs({ jobsFiled }: JobsProps) {
	if (isEmpty(jobsFiled)) {
		return (
			<div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
				<p className="text-sm font-medium">No job filings recorded.</p>
			</div>
		)
	}

	return (
		<div className="px-1">
			<div className="mb-6 pl-1">
				<h3 className="text-xl font-extrabold tracking-tight text-foreground">Permit Filings</h3>
				<p className="text-[13px] font-medium text-primary mt-1">New construction, alterations, and renovation filings.</p>
			</div>
			{jobsFiled.map((job, i) => {
				const type = job.job_type || "Job Filing"
				const status = job.job_status || "Unknown"
				const desc = job.job_description || "—"
				const applicant = [job.applicant_first_name, job.applicant_last_name].filter(Boolean).join(" ")
				const isPositive = status.toLowerCase().includes("permit") || status.toLowerCase().includes("complete")
				return (
					<div key={`${job.bin}-${i}`}>
						<div className="py-3.5">
							<div className="flex items-start justify-between gap-2">
								<span className="font-bold text-[15px] text-foreground leading-tight flex-1">{type}</span>
								<StatusTag status={status} isPositive={isPositive} />
							</div>
							<p className="text-[13px] text-muted-foreground mt-1 leading-snug">{desc}</p>
							{applicant && (
								<div className="flex items-center gap-1 mt-2.5">
									<Calendar className="w-3 h-3 text-muted-foreground/50 flex-none" />
									<span className="text-[12px] text-muted-foreground/70 font-medium">
										Applicant: {applicant}
									</span>
								</div>
							)}
						</div>
						{i < jobsFiled.length - 1 && <div className="h-px bg-border" />}
					</div>
				)
			})}
		</div>
	)
}
