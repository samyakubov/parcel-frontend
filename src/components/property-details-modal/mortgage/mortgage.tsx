"use client"
import React from "react"
import { Building2, User } from "lucide-react"
import { AppCard } from "@/components/property-details-modal/shared/app-card"
import { SectionHeader } from "@/components/property-details-modal/shared/section-header"
import { FORMAT_PRICE } from "@/utils/format-price"

interface StandardRowProps {
	icon: React.ReactNode
	label: string
	value: string
}

function StandardRow({ icon, label, value }: StandardRowProps) {
	return (
		<div className="flex items-center gap-3">
			<div className="text-muted-foreground/50 flex-shrink-0">{icon}</div>
			<div className="flex-1 min-w-0">
				<div className="text-[11px] font-semibold text-muted-foreground">{label}</div>
				<div className="text-[15px] font-semibold text-foreground truncate">{value}</div>
			</div>
		</div>
	)
}

interface MortgageProps {
	borrower: string
	lender: string
	amount: number
}

export default function Mortgage({ borrower, lender, amount }: MortgageProps) {
	return (
		<div className="px-1 pt-2">
			<SectionHeader title="Loan Summary" subtitle="Current mortgage and financial lender data." />

			<AppCard>
				<div>
					<div className="text-[12px] font-bold text-muted-foreground uppercase tracking-wide">
						Principal Amount
					</div>
					<div className="mt-1 text-4xl font-semibold text-primary" style={{ letterSpacing: "-1px" }}>
						{amount ? FORMAT_PRICE(amount) : "N/A"}
					</div>
				</div>

				<div className="my-6 h-px bg-border" />

				<div className="space-y-4">
					<StandardRow
						icon={<Building2 className="h-[18px] w-[18px]" />}
						label="Lender"
						value={lender || "Unknown Lender"}
					/>
					<StandardRow
						icon={<User className="h-[18px] w-[18px]" />}
						label="Borrower"
						value={borrower || "Unknown Borrower"}
					/>
				</div>
			</AppCard>
		</div>
	)
}
