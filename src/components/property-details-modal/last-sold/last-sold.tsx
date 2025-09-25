"use client"
import React from "react"
import { TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import LastSoldDate from "@/components/property-details-modal/last-sold/last-sold-date"
import LastSoldPrice from "@/components/property-details-modal/last-sold/last-sold-price"

interface PropertyLastSaleProps {
    lastSoldFor: LastSold
}

export default function LastSold({lastSoldFor}: PropertyLastSaleProps) {
	const hasNoSaleData = !lastSoldFor.last_sold_price && !lastSoldFor.sale_date

	if (hasNoSaleData) {
		return (
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className="w-full"
			>
				<Card>
					<CardHeader>
						<div className="flex items-center gap-2">
							<div className="p-2 rounded-full bg-destructive/10">
								<TrendingUp className="h-4 w-4 text-destructive" />
							</div>
							<h3 className="text-lg font-semibold text-destructive">
                                Last Sale Information
							</h3>
						</div>
					</CardHeader>
					<CardContent>
						<Alert variant="destructive">
							<AlertDescription>
                                No sale history available
							</AlertDescription>
						</Alert>
					</CardContent>
				</Card>
			</motion.div>
		)
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			className="w-full"
		>
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2">
						<div className="p-2 rounded-full bg-primary/10">
							<TrendingUp className="h-4 w-4 text-primary" />
						</div>
						<h3 className="text-lg font-semibold">
                            Last Sale Information
						</h3>
					</div>
				</CardHeader>

				<CardContent className="space-y-4">
					<LastSoldPrice lastSoldPrice={lastSoldFor.last_sold_price} />
					<LastSoldDate saleDate={lastSoldFor.sale_date} />
				</CardContent>
			</Card>
		</motion.div>
	)
}
