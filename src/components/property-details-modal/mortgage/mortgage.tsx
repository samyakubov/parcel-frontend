"use client"
import React from "react"
import { Building2, User } from "lucide-react"
import { FORMAT_PRICE } from "@/utils/format-price"

function StandardRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
	return (
		<div className="flex items-center gap-3 py-1">
			<div className="text-muted-foreground/60 flex-none">{icon}</div>
			<div className="flex-1">
				<p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
				<p className="text-[14px] font-semibold text-foreground">{value}</p>
			</div>
		</div>
	)
}

interface MortgageDetailsProps {
	borrower: string
	lender: string
	amount: number
}

export default function Mortgage({ borrower, lender, amount }: MortgageDetailsProps) {
	return (
		<div className="px-1">
			<div className="mb-6 pl-1">
				<h3 className="text-xl font-extrabold tracking-tight text-foreground">Loan Summary</h3>
				<p className="text-[13px] font-medium text-primary mt-1">Current mortgage and financial lender data.</p>
			</div>

			<div className="mb-6 pl-1">
				<p className="text-[12px] font-bold uppercase tracking-wide text-muted-foreground">Principal Amount</p>
				<p className="text-[32px] font-black text-primary tracking-tighter leading-none mt-1">
					{amount ? FORMAT_PRICE(amount) : "N/A"}
				</p>
			</div>

			<div className="h-px bg-border mb-6" />

			<div className="space-y-3 pl-1">
				<StandardRow
					icon={<Building2 className="w-4 h-4" />}
					label="Lender"
					value={lender || "Unknown Lender"}
				/>
				<StandardRow
					icon={<User className="w-4 h-4" />}
					label="Borrower"
					value={borrower || "Unknown Borrower"}
				/>
			</div>
		</div>
	)
}
