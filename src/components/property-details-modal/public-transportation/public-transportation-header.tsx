import React from "react"
import { CardHeader } from "@/components/ui/card"
import { BusFront } from "lucide-react"


export default function PublicTransportationHeader() {
	return (
		<CardHeader className="p-4 py-2">
			<div className="flex justify-between">
				<div className="flex items-center gap-2">
					<div className="p-2 rounded-full bg-primary/10">
						<BusFront className="h-4 w-4 text-primary" />
					</div>
					<div className="flex flex-col">
						<h3 className="text-lg font-semibold leading-none">
							Public Transportation
						</h3>
					</div>
				</div>
			</div>
		</CardHeader>
	)
}
