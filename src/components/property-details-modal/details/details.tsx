"use client"
import React from "react"
import { AppCard } from "@/components/property-details-modal/shared/app-card"
import { SectionHeader } from "@/components/property-details-modal/shared/section-header"
import { DetailGrid } from "@/components/property-details-modal/shared/detail-grid"
import { FORMAT_PRICE } from "@/utils/format-price"
import { Badge } from "@/components/ui/badge"
import { FORMAT_DATE } from "@/utils/format-date"

interface DetailsProps {
	firstRecord: PropertyRecord
	lastSold: LastSoldWithSqft | LastSold
}

function isLastSoldWithSqft(data: LastSold | LastSoldWithSqft): data is LastSoldWithSqft {
	return data !== null && typeof data === "object" && "gross_sqft" in data && data.gross_sqft !== null
}

function formatSqft(val: string | number | null | undefined): string {
	if (!val) return "N/A"
	const num = Number(val)
	return isNaN(num) ? String(val) : `${num.toLocaleString()} sqft`
}

export default function Details({ firstRecord, lastSold }: DetailsProps) {
	const withSqft = isLastSoldWithSqft(lastSold)
	const yearBuilt = withSqft ? lastSold.year_built : firstRecord?.year_built?.toString()
	const landSqft = withSqft ? formatSqft(lastSold.land_sqft) : formatSqft(firstRecord?.lot_area)
	const grossSqft = withSqft ? formatSqft(lastSold.gross_sqft) : formatSqft(firstRecord?.bldg_area)

	return (
		<div className="px-1 pt-2">
			<SectionHeader title="Market Overview" subtitle="Key metrics and recent assessment data." />

			<AppCard>
				<div>
					<div className="text-[12px] font-bold text-muted-foreground uppercase tracking-wide">
						Last Sold Price
					</div>
					<div className="mt-1">
						{!lastSold || lastSold.last_sold_price === 0 ? (
							<div className="space-y-1">
								<Badge variant="secondary">Price Not Disclosed</Badge>
								<p className="text-xs text-muted-foreground leading-relaxed">
									Likely a transfer to trust, LLC, or sold pre-ACRIS.
								</p>
							</div>
						) : (
							<span className="text-4xl font-semibold text-primary" style={{ letterSpacing: "-1.5px" }}>
								{FORMAT_PRICE(lastSold.last_sold_price)}
							</span>
						)}
					</div>
				</div>

				<div className="my-6 h-px bg-border" />

				<DetailGrid items={[
					{ label: "Sold Date", value: lastSold?.last_sold_date ? FORMAT_DATE(lastSold.last_sold_date) : "N/A" },
					{ label: "Year Built", value: yearBuilt ? String(yearBuilt) : "N/A" },
					{ label: "Land Size", value: landSqft },
					{ label: "Gross Area", value: grossSqft },
				]} />
			</AppCard>

			{firstRecord && (
				<>
					<SectionHeader title="Property Info" subtitle="Building and lot characteristics." />
					<AppCard>
						<DetailGrid items={[
							{ label: "Property Type", value: firstRecord.prop_type || "N/A" },
							{ label: "BBL", value: firstRecord.bbl || "N/A" },
							{ label: "Floors", value: firstRecord.num_floors?.toString() || "N/A" },
							{ label: "Res Units", value: firstRecord.units_res?.toString() || "N/A" },
							{ label: "Total Units", value: firstRecord.units_total?.toString() || "N/A" },
							{ label: "Lot Dims", value: firstRecord.lot_front && firstRecord.lot_depth ? `${firstRecord.lot_front} × ${firstRecord.lot_depth}` : "N/A" },
							{ label: "Bldg Dims", value: firstRecord.bldg_front && firstRecord.bldg_depth ? `${firstRecord.bldg_front} × ${firstRecord.bldg_depth}` : "N/A" },
						]} />
					</AppCard>
				</>
			)}
		</div>
	)
}
