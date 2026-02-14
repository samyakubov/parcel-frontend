import React from "react"
import { CardHeader } from "@/components/ui/card"
import { School } from "lucide-react"



export default function SchoolsHeader() {
	return (
		<CardHeader className="p-4 py-0">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="p-1.5 rounded-full bg-primary/10">
						<School className="h-4 w-4 text-primary" />
					</div>
					<div className="flex flex-col">
						<h3 className="text-lg font-semibold leading-none">
							Schools
						</h3>
					</div>
				</div>
			</div>
		</CardHeader>
	)
}
