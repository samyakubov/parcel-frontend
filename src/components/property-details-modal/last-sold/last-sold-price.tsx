"use client"
import React from "react"
import { DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { FORMAT_PRICE } from "@/utils/format-price"

interface LastSoldPriceProps {
	lastSoldPrice: number;
}

export default function LastSoldPrice({ lastSoldPrice }: LastSoldPriceProps) {
	return (
		<div className="flex items-start gap-3 p-3 rounded-lg border bg-card">
			<div className="p-2 rounded-full bg-muted mt-1">
				<DollarSign className="h-4 w-4 text-muted-foreground" />
			</div>
			<div className="flex-1">
				<div className="text-sm font-medium text-muted-foreground mb-1">
					Last Sold Price
				</div>
				{lastSoldPrice === 0 ? (
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
						{FORMAT_PRICE(lastSoldPrice)}
					</div>
				)}
			</div>
		</div>
	)
}
