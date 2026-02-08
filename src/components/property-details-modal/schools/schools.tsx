import React from "react"
import {Card, CardHeader} from "@/components/ui/card"
import { isEmpty, isNil, isUndefined } from "lodash-es"
import SchoolsLoading from "@/components/property-details-modal/schools/schools-loading"
import SchoolsEmpty from "@/components/property-details-modal/schools/schools-empty"
import SchoolCard from "@/components/property-details-modal/schools/school-card"
import {ScrollArea} from "@/components/ui/scroll-area"
import { School} from "lucide-react"
import {Badge} from "@/components/ui/badge"
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
		<Card className="w-full h-[600px]">
			<SchoolsHeader/>
			<ScrollArea className="h-[500px] p-6 w-full pr-4">
				<div className="space-y-3">
					{schools.map((school, index) => (
						<SchoolCard key={index} school={school} />
					))}
				</div>
			</ScrollArea>
		</Card>
	)
}
