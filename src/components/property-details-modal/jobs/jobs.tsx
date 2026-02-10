"use client"
import { isEmpty } from "lodash-es"
import { FileWarning } from "lucide-react"
import JobsTable from "@/components/property-details-modal/jobs/jobs-table"


interface JobsProps {
	jobsFiled: JobFiled[]
}

export default function Jobs({ jobsFiled }: JobsProps) {

	if (isEmpty(jobsFiled)) {
		return (
			<div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
				<FileWarning className="h-8 w-8 mb-2 opacity-50" />
				<p>No jobs found</p>
			</div>
		)

	}

	return <JobsTable jobs={jobsFiled} />
}
