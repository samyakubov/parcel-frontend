import React from "react"
import { CardHeader } from "@/components/ui/card"
import { School } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { isNil } from "lodash-es"

interface SchoolsHeaderProps {
	count?: number
}

export default function SchoolsHeader({ count }: SchoolsHeaderProps) {
	return (
		<CardHeader className="pb-0">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="p-2 rounded-full bg-primary/10">
						<School className="h-4 w-4 text-primary" />
					</div>
					<div className="flex flex-col gap-0.5">
						<h3 className="text-lg font-semibold leading-none">
							Schools
						</h3>
					</div>
				</div>
				{!isNil(count) && (
					<Badge variant="secondary" className="px-2">
						{count} schools
					</Badge>
				)}
			</div>
		</CardHeader>
	)
}
