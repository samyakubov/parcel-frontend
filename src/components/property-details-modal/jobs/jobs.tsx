"use client"
import React from "react"
import { Construction } from "lucide-react"
import { SectionHeader } from "@/components/property-details-modal/shared/section-header"
import { isEmpty } from "lodash-es"
import JobCard from "@/components/property-details-modal/jobs/jobs-card"

interface JobsProps {
	jobsFiled: JobFiled[]
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
