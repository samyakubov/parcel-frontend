"use client"
import { cn } from "@/lib/utils"

interface StatusTagProps {
	status: string
	isPositive: boolean
}

export function StatusTag({ status, isPositive }: StatusTagProps) {
	return (
		<span className={cn(
			"inline-flex items-center px-2 py-1 rounded-md text-[9px] font-extrabold uppercase tracking-wide flex-shrink-0",
			isPositive
				? "bg-green-50 text-green-700 dark:bg-green-500/15 dark:text-green-300"
				: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
		)}>
			{status}
		</span>
	)
}
