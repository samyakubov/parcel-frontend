import React from "react"
import { cn } from "@/lib/utils"

export function AppCard({ children, className }: { children: React.ReactNode; className?: string }) {
	return (
		<div className={cn(
			"rounded-[20px] border border-primary/35 bg-card shadow-sm p-6 mb-6",
			className
		)}>
			{children}
		</div>
	)
}
