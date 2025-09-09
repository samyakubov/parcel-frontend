import React from "react"
import { DollarSign, Calendar, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { FORMAT_PRICE } from "@/utils/format-price"
import { FORMAT_DATE } from "@/utils/format-date"

interface PropertyLastSaleProps {
    lastSoldFor: LastSoldFor
}

export default function LastSold(props: PropertyLastSaleProps) {
	const {lastSoldFor} = props
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
					<div className="flex items-start gap-3 p-3 rounded-lg border bg-card">
						<div className="p-2 rounded-full bg-muted mt-1">
							<DollarSign className="h-4 w-4 text-muted-foreground" />
						</div>
						<div className="flex-1">
							<div className="text-sm font-medium text-muted-foreground mb-1">
                                Last Sold Price
							</div>
							{lastSoldFor.last_sold_price === 0 ? (
								<div className="space-y-2">
									<Badge variant="secondary" className="mb-2">
                                        Price Not Disclosed
									</Badge>
									<p className="text-xs text-muted-foreground leading-relaxed">
                                        Price not disclosed: likely a transfer to trust, LLC, or sold pre-ACRIS.
									</p>
								</div>
							) : (
								<div className="text-lg font-bold text-green-600 dark:text-green-400">
									{FORMAT_PRICE(lastSoldFor.last_sold_price)}
								</div>
							)}
						</div>
					</div>

					{lastSoldFor.sale_date && (
						<div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
							<div className="p-2 rounded-full bg-muted">
								<Calendar className="h-4 w-4 text-muted-foreground" />
							</div>
							<div className="flex-1">
								<div className="text-sm font-medium text-muted-foreground">
                                    Sold On
								</div>
								<div className="text-sm font-semibold font-mono">
									{FORMAT_DATE(lastSoldFor.sale_date)}
								</div>
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</motion.div>
	)
}
