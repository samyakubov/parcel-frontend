"use client"
import React from "react"

interface PropertyRecordGridHeaderProps {
	bbl: string;
	block: number;
	lot: number;
}

export default function PropertyRecordGridHeader({ bbl, block, lot }: PropertyRecordGridHeaderProps) {
	return (
		<div className="flex items-center gap-3 w-full">
			<a
				target="_blank"
				rel="noopener noreferrer"
				className="text-xl font-bold text-foreground hover:text-primary transition-colors duration-300 group"
				href={`http://a836-acris.nyc.gov/bblsearch/bblsearch.asp?
				borough=${bbl?.[0]}&block=${block}
				&lot=${lot}`}
			>
				<span className="group-hover:underline underline-offset-4 decoration-primary/50">ACRIS Records</span>
			</a>
		</div>
	)
}
