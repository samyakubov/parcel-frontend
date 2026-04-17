"use client"
import React from "react"
import { Gavel } from "lucide-react"
import { SectionHeader } from "@/components/property-details-modal/shared/section-header"
import { isEmpty } from "lodash-es"
import ViolationCard from "@/components/property-details-modal/violations/violations-card"

interface ViolationsProps {
	violations: Violation[]
}


export default function Violations({ violations }: ViolationsProps) {
	if (isEmpty(violations)) {
		return (
			<div className="px-1 pt-2">
				<SectionHeader title="Property Violations" subtitle="Outstanding and historical legal violations." />
				<div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
					<Gavel className="h-10 w-10 mb-3 opacity-20" />
					<p className="text-sm">No violations recorded.</p>
				</div>
			</div>
		)
	}

	return (
		<div className="px-1 pt-2">
			<SectionHeader title="Property Violations" subtitle="Outstanding and historical legal violations." />
			{violations.map((v, i) => (
				<ViolationCard key={i} violation={v} />
			))}
		</div>
	)
}
