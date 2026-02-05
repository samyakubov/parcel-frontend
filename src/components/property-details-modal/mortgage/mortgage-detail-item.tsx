"use client"
import React from "react"

interface MortgageDetailItemProps {
	icon: React.ReactNode;
	label: string;
	value: string | React.ReactNode;
}

export default function MortgageDetailItem({ icon, label, value }: MortgageDetailItemProps) {
	return (
		<div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
			<div className="p-2 rounded-full bg-muted">
				{icon}
			</div>
			<div className="flex-1">
				<div className="text-sm font-medium text-muted-foreground">
					{label}
				</div>
				<div className="text-sm font-semibold">
					{value}
				</div>
			</div>
		</div>
	)
}
