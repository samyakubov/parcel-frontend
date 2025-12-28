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
			<div className="p-2.5 bg-primary/10 dark:bg-primary/20 rounded-xl shadow-sm">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="text-primary"
				>
					<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
					<path d="M14 2v4a2 2 0 0 0 2 2h4" />
					<path d="M10 9H8" />
					<path d="M16 13H8" />
					<path d="M16 17H8" />
				</svg>
			</div>
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
