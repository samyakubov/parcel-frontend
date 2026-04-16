import React from "react"

interface DetailItem {
	label: string
	value: string
}

export function DetailGrid({ items }: { items: DetailItem[] }) {
	return (
		<div className="flex flex-wrap gap-x-5 gap-y-4">
			{items.map(({ label, value }) => (
				<div key={label} className="w-[130px]">
					<div className="text-[10px] font-bold text-primary uppercase tracking-wide">{label}</div>
					<div className="text-[13px] font-semibold text-foreground mt-0.5">{value}</div>
				</div>
			))}
		</div>
	)
}
