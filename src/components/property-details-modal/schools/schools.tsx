import React from "react"
import { GraduationCap } from "lucide-react"
import { SectionHeader } from "@/components/property-details-modal/shared/section-header"
import { isEmpty, isNil, isUndefined } from "lodash-es"
import SchoolsLoading from "@/components/property-details-modal/schools/schools-loading"
import SchoolCard from "@/components/property-details-modal/schools/school-card"

interface SchoolsProps {
	schools: School[] | null | undefined
}

export default function Schools({ schools }: SchoolsProps) {
	if (isUndefined(schools)) {
		return <SchoolsLoading />
	}

	if (isNil(schools) || isEmpty(schools)) {
		return (
			<div className="px-1 pt-2">
				<SectionHeader title="Nearby Schools" subtitle="Public schools serving this property's district." />
				<div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
					<GraduationCap className="h-10 w-10 mb-3 opacity-20" />
					<p className="text-sm">No schools found nearby.</p>
				</div>
			</div>
		)
	}

	return (
		<div className="px-1 pt-2">
			<SectionHeader title="Nearby Schools" subtitle="Public schools serving this property's district." />
			<div>
				{schools.map((school, i) => (
					<SchoolCard key={i} school={school} />
				))}
			</div>
		</div>
	)
}
