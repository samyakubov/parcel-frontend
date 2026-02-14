import React from "react"
import { Card } from "@/components/ui/card"
import { isEmpty, isNil, isUndefined } from "lodash-es"
import SchoolsLoading from "@/components/property-details-modal/schools/schools-loading"
import SchoolsEmpty from "@/components/property-details-modal/schools/schools-empty"
import SchoolCard from "@/components/property-details-modal/schools/school-card"
import { ScrollArea } from "@/components/ui/scroll-area"
import SchoolsHeader from "@/components/property-details-modal/schools/schools-header"

interface SchoolsProps {
	schools: School[] | null | undefined
}

export default function Schools({ schools }: SchoolsProps) {
	if (isUndefined(schools)) {
		return <SchoolsLoading />
	}

	if (isNil(schools) || isEmpty(schools)) {
		return <SchoolsEmpty />
	}

	return (
		<Card className="w-full h-[450px] overflow-hidden flex flex-col">
			<SchoolsHeader />
			<ScrollArea className="flex-1 p-2 pr-2 overflow-y-auto">
				<div className="space-y-2">
					{schools.map((school, index) => (
						<SchoolCard key={index} school={school} />
					))}
				</div>
			</ScrollArea>
		</Card>

	)
}
