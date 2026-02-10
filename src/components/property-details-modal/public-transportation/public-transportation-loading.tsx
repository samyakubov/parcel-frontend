import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { BusFront } from "lucide-react"

export default function PublicTransportationLoading() {
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center gap-2">
					<div className="p-2 rounded-full bg-primary/10">
						<BusFront className="h-4 w-4 text-primary" />
					</div>
					<div className="flex flex-col gap-2">
						<h3 className="text-lg font-semibold">
							Public Transportation
						</h3>
					</div>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<Skeleton className="h-16 w-full" />
				<Skeleton className="h-16 w-full" />
				<Skeleton className="h-16 w-full" />
			</CardContent>
		</Card>
	)
}
