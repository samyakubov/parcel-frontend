"use client"
import PropertyRecordGridTable from "@/components/property-details-modal/property-record-grid/property-record-grid-table"

interface GridProps {
	data: PropertyRecord[];
}

export default function PropertyRecordGrid({ data }: GridProps) {
	return (
		<div className="space-y-6">
			<div className="flex items-center gap-3 w-full">
				<a
					target="_blank"
					rel="noopener noreferrer"
					className="text-xl font-bold text-foreground hover:text-primary transition-colors duration-300 group"
					href={`http://a836-acris.nyc.gov/bblsearch/bblsearch.asp?
					borough=${data[0].bbl?.[0]}&block=${data[0].prop_block}
					&lot=${data[0].prop_lot}`}
				>
					<span className="group-hover:underline underline-offset-4 decoration-primary/50">ACRIS Records</span>
				</a>
			</div>
			<PropertyRecordGridTable data={data} />
		</div>
	)
}
