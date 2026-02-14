"use client"
import React from "react"

interface MortgageDetailItemProps {
	icon: React.ReactNode;
	label: string;
	value: string | React.ReactNode;
	className?:string;
}

export default function MortgageDetailItem({ icon, label, value, className }: MortgageDetailItemProps) {
	return (
		<div className={`flex items-center gap-3 p-2 rounded-lg border bg-card ${className}`}>
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
