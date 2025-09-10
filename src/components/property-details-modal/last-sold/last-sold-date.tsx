"use client"
import React from "react"
import { Calendar } from "lucide-react"
import { FORMAT_DATE } from "@/utils/format-date"

interface LastSoldDateProps {
    saleDate: string;
}

export default function LastSoldDate({ saleDate }: LastSoldDateProps) {
	if (!saleDate) return null

	return (
		<div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
			<div className="p-2 rounded-full bg-muted">
				<Calendar className="h-4 w-4 text-muted-foreground" />
			</div>
			<div className="flex-1">
				<div className="text-sm font-medium text-muted-foreground">
					Sold On
				</div>
				<div className="text-sm font-semibold font-mono">
					{FORMAT_DATE(saleDate)}
				</div>
			</div>
		</div>
	)
}
