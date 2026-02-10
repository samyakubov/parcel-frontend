"use client"
import { isEmpty } from "lodash-es"
import { AlertTriangle } from "lucide-react"
import ViolationsTable from "@/components/property-details-modal/violations/violations-table"


interface ViolationsProps {
	violations: Violation[]
}

export default function Violations({ violations }: ViolationsProps) {

	if (isEmpty(violations)) {
		return (
			<div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
				<AlertTriangle className="h-8 w-8 mb-2 opacity-50" />
				<p>No violations found</p>
			</div>
		)
	}

	return <ViolationsTable violations={violations} />

}
