"use client"
import React from "react"
import { DollarSign, Calendar, Building2, Landmark } from "lucide-react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { FORMAT_PRICE } from "@/utils/format-price"
import { FORMAT_DATE } from "@/utils/format-date"
import MortgageDetailItem from "@/components/property-details-modal/mortgage/mortgage-detail-item"

interface MortgageDetailsProps {
    borrower: PropertyRecord
    lender: PropertyRecord
}

export default function Mortgage({borrower, lender}: MortgageDetailsProps) {
	const { recordedfiled, amount } = borrower
	const lenderName = lender.party_name

	return (
		<Card className="w-full">
			<CardHeader>
				<div className="flex items-center gap-2">
					<div className="p-2 rounded-full bg-primary/10">
						<Building2 className="h-4 w-4 text-primary" />
					</div>
					<h3 className="text-lg font-semibold">
                        Mortgage Details
					</h3>
				</div>
			</CardHeader>

			<CardContent className="space-y-4">
				<MortgageDetailItem
					icon={<Landmark className="h-4 w-4 text-muted-foreground" />}
					label="Lender"
					value={lenderName}
				/>
				<MortgageDetailItem
					icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
					label="Amount"
					value={`${FORMAT_PRICE(amount)}`}
				/>
				<MortgageDetailItem
					icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
					label="Recorded On"
					value={FORMAT_DATE(recordedfiled)}
				/>
			</CardContent>
		</Card>
	)
}
