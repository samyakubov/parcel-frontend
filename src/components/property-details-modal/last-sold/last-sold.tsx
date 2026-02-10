"use client"
import React from "react"
import { TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import LastSoldDate from "@/components/property-details-modal/last-sold/last-sold-date"
import LastSoldPrice from "@/components/property-details-modal/last-sold/last-sold-price"
import isNull from "lodash-es/isNull"
import LastSoldEmpty from "@/components/property-details-modal/last-sold/last-sold-empty"

interface PropertyLastSaleProps {
	lastSoldFor: LastSold
}

export default function LastSold({ lastSoldFor }: PropertyLastSaleProps) {
	if (isNull(lastSoldFor)) {
		return <LastSoldEmpty />
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			className="w-full"
		>
			<Card className="py-4 gap-4">
				<CardHeader className="p-4 py-0">
					<div className="flex items-center gap-2">
						<div className="p-2 rounded-full bg-primary/10">
							<TrendingUp className="h-4 w-4 text-primary" />
						</div>
						<h3 className="text-lg font-semibold">
							Last Sale Information
						</h3>
					</div>
				</CardHeader>

				<CardContent className="space-y-4 p-4 py-0">
					<LastSoldPrice lastSoldPrice={lastSoldFor.last_sold_price} />
					<LastSoldDate saleDate={lastSoldFor.last_sold_date} />
				</CardContent>
			</Card>
		</motion.div>
	)
}
