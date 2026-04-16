import React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { SectionHeader } from "@/components/property-details-modal/shared/section-header"

export default function SchoolsLoading() {
	return (
		<div className="px-1 pt-2">
			<SectionHeader title="Nearby Schools" subtitle="Public schools serving this property's district." />
			<div>
				{[...Array(4)].map((_, i) => (
					<div key={i} className="py-3 border-b border-border last:border-b-0 space-y-2">
						<div className="flex items-start justify-between gap-2">
							<Skeleton className="h-4 w-2/3" />
							<Skeleton className="h-5 w-16 rounded-md" />
						</div>
						<Skeleton className="h-3 w-1/2" />
						<Skeleton className="h-3 w-3/4" />
					</div>
				))}
			</div>
		</div>
	)
}
