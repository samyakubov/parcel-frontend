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
				className="text-xl font-bold bg-primary bg-clip-text text-transparent"
				href={`http://a836-acris.nyc.gov/bblsearch/bblsearch.asp?
				borough=${bbl?.[0]}&block=${block}
				&lot=${lot}`}
			>
				<span>ACRIS Records</span>
			</a>
		</div>
	)
}
