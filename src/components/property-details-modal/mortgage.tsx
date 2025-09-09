"use client"
import React from "react"
import { DollarSign, Calendar, Building2, Landmark } from "lucide-react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { FORMAT_PRICE } from "@/utils/format-price"
import { FORMAT_DATE } from "@/utils/format-date"

interface MortgageDetailsProps {
    borrower: PropertyRecord
    lender: PropertyRecord
}

export default function Mortgage(props: MortgageDetailsProps) {
	const { recordedfiled, amount } = props.borrower
	const lenderName = props.lender.party_name

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
				<div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
					<div className="p-2 rounded-full bg-muted">
						<Landmark className="h-4 w-4 text-muted-foreground" />
					</div>
					<div className="flex-1">
						<div className="text-sm font-medium text-muted-foreground">
                            Lender
						</div>
						<div className="text-sm font-semibold">
							{lenderName}
						</div>
					</div>
				</div>

				<div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
					<div className="p-2 rounded-full bg-muted">
						<DollarSign className="h-4 w-4 text-muted-foreground" />
					</div>
					<div className="flex-1">
						<div className="text-sm font-medium text-muted-foreground">
                            Amount
						</div>
						<div className="text-sm font-semibold text-green-600 dark:text-green-400">
                            ${FORMAT_PRICE(amount)}
						</div>
					</div>
				</div>

				<div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
					<div className="p-2 rounded-full bg-muted">
						<Calendar className="h-4 w-4 text-muted-foreground" />
					</div>
					<div className="flex-1">
						<div className="text-sm font-medium text-muted-foreground">
                            Recorded On
						</div>
						<div className="text-sm font-semibold font-mono">
							{FORMAT_DATE(recordedfiled)}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
