import React from "react"
import { CardHeader } from "@/components/ui/card"
import { BusFront } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { isNil } from "lodash-es"

interface PublicTransportationHeaderProps {
	count?: number
}

export default function PublicTransportationHeader({ count }: PublicTransportationHeaderProps) {
	return (
		<CardHeader>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="p-2 rounded-full bg-primary/10">
						<BusFront className="h-4 w-4 text-primary" />
					</div>
					<div className="flex flex-col gap-0.5">
						<h3 className="text-lg font-semibold leading-none">
							Public Transportation
						</h3>
						<p className="text-xs text-muted-foreground">
							Within a mile radius
						</p>
					</div>
				</div>
				{!isNil(count) && (
					<Badge variant="secondary" className="px-2">
						{count} routes
					</Badge>
				)}
			</div>
		</CardHeader>
	)
}
