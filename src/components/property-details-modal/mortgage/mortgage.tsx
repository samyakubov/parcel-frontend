"use client"
import React from "react"
import { DollarSign, Building2, Landmark, User } from "lucide-react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { FORMAT_PRICE } from "@/utils/format-price"
import MortgageDetailItem from "@/components/property-details-modal/mortgage/mortgage-detail-item"

interface MortgageDetailsProps {
	borrower: string
	lender: string
	amount: number
}

export default function Mortgage({ borrower, lender, amount }: MortgageDetailsProps) {

	return (
		<Card className="w-full py-4 gap-4">
			<CardHeader className="p-4 py-0">
				<div className="flex items-center gap-2">
					<div className="p-2 rounded-full bg-primary/10">
						<Building2 className="h-4 w-4 text-primary" />
					</div>
					<h3 className="text-lg font-semibold">
						Mortgage Details
					</h3>
				</div>
			</CardHeader>

			<CardContent className="space-y-4 p-4 py-0">
				<MortgageDetailItem
					icon={<User className="h-4 w-4 text-muted-foreground" />}
					label="Borrower"
					value={borrower}
				/>
				<MortgageDetailItem
					icon={<Landmark className="h-4 w-4 text-muted-foreground" />}
					label="Lender"
					value={lender}
				/>
				<MortgageDetailItem
					icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
					label="Amount"
					value={`${FORMAT_PRICE(amount)}`}
				/>
			</CardContent>
		</Card>
	)
}
