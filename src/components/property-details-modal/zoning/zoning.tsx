"use client"
import React from "react"
import { isNull, isUndefined, isEmpty } from "lodash-es"
import { SectionHeader } from "@/components/property-details-modal/shared/section-header"
import { AppCard } from "@/components/property-details-modal/shared/app-card"

interface ZoningSectionProps {
	zoning: Zoning
}

function ZoningCategory({ label, codes }: { label: string; codes: string[] }) {
	if (isEmpty(codes)) return null
	return (
		<div className="mb-4">
			<p className="text-[13px] font-bold text-muted-foreground tracking-wide uppercase pl-1 mb-3">
				{label}
			</p>
			<AppCard className="mb-0">
				<div className="flex flex-wrap gap-2">
					{codes.map((code) => (
						<span
							key={code}
							className="px-3.5 py-2 rounded-xl border border-border bg-muted/40 text-sm font-bold text-foreground tracking-wide"
						>
							{code}
						</span>
					))}
				</div>
			</AppCard>
		</div>
	)
}

export default function Zoning({ zoning }: ZoningSectionProps) {
	const hasNoData = isNull(zoning) || isUndefined(zoning) || (
		isEmpty(zoning.zoning_districts) &&
		isEmpty(zoning.commercial_overlays) &&
		isEmpty(zoning.special_districts) &&
		!zoning.limited_height_district
	)

	if (hasNoData) return null

	return (
		<div className="px-1 pt-2">
			<SectionHeader title="Zoning & Land Use" subtitle="Zoning districts and classification data." />

			<ZoningCategory label="Zoning Districts" codes={zoning.zoning_districts} />
			<ZoningCategory label="Commercial Overlays" codes={zoning.commercial_overlays} />
			<ZoningCategory label="Special Districts" codes={zoning.special_districts} />
			{zoning.limited_height_district && (
				<ZoningCategory label="Limited Height District" codes={[zoning.limited_height_district]} />
			)}

			{zoning.last_updated && (
				<p className="text-center text-[12px] text-muted-foreground/50 font-medium mt-2">
					Zoning last updated: {zoning.last_updated}
				</p>
			)}
		</div>
	)
}
