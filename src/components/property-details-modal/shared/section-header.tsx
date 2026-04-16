import React from "react"

interface SectionHeaderProps {
	title: string
	subtitle?: string
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
	return (
		<div className="pl-1 pb-6">
			<h2 className="text-xl font-semibold text-foreground" style={{ letterSpacing: "-0.5px" }}>
				{title}
			</h2>
			{subtitle && (
				<p className="mt-1 text-[13px] font-medium text-primary">{subtitle}</p>
			)}
		</div>
	)
}
