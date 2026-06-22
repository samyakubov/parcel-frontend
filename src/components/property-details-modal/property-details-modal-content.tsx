"use client"
import React from "react"
import isNull from "lodash-es/isNull"
import isNil from "lodash-es/isNil"
import isEmpty from "lodash-es/isEmpty"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Mortgage from "@/components/property-details-modal/mortgage/mortgage"
import Owners from "@/components/property-details-modal/owners/owners"
import Jobs from "@/components/property-details-modal/jobs/jobs"
import Violations from "@/components/property-details-modal/violations/violations"
import Complaints from "@/components/property-details-modal/complaints/complaints"
import PropertyRecordGrid from "@/components/property-details-modal/property-record-grid/property-records-grid"

function fmtPrice(price: number | null | undefined): string {
	if (!price || price === 0) return "N/A"
	if (price >= 1_000_000) return `$${(price / 1_000_000).toFixed(1)}M`
	if (price >= 1_000) return `$${Math.round(price / 1_000)}K`
	return `$${price}`
}

function fmtSqft(n: number | string | null | undefined): string {
	if (n === null || n === undefined || n === "") return "N/A"
	const num = typeof n === "string" ? parseInt(n, 10) : n
	if (!num || isNaN(num)) return "N/A"
	if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K sf`
	return `${num} sf`
}

function fmtDate(d: string | null | undefined): string {
	if (!d) return ""
	try {
		return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short" })
	} catch {
		return d
	}
}

function StatItem({ label, value, sub }: { label: string; value: string; sub?: string }) {
	return (
		<div className="flex flex-col gap-0.5 flex-none">
			<span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">{label}</span>
			<span className="text-sm font-bold text-foreground leading-tight whitespace-nowrap">{value}</span>
			{sub && <span className="text-[10px] font-medium text-muted-foreground/70 whitespace-nowrap">{sub}</span>}
		</div>
	)
}

function VDivider() {
	return <div className="w-px h-8 bg-border mx-4 flex-none self-center" />
}

interface PropertyDetailsModalContentProps {
	modal: PropertyModal;
}

// eslint-disable-next-line max-lines-per-function
export default function PropertyDetailsModalContent({ modal }: PropertyDetailsModalContentProps) {
	const records = modal.propertyData.records
	const firstRecord = records[0]

	const getCurrentOwner = () => {
		if (
			(isEmpty(modal.propertyData.owners.current_owners) || isNull(modal.propertyData.owners.current_owners))
			&& !isNil(firstRecord?.owner_name)
		) {
			return [firstRecord.owner_name]
		}
		return modal.propertyData.owners.current_owners
	}

	const coords = modal.propertyData.coordinates
	const imageUrl = coords
		? `https://maps.googleapis.com/maps/api/streetview?size=800x600&scale=2&fov=90&pitch=10&location=${coords.latitude},${coords.longitude}&key=${process.env.NEXT_PUBLIC_STREETVIEW_API_KEY}`
		: null

	const lastSold = modal.propertyData.last_sold
	const isWithSqft = (d: typeof lastSold): d is LastSoldWithSqft => !!d && "gross_sqft" in d

	const salePrice = fmtPrice(lastSold?.last_sold_price)
	const saleDate = fmtDate(lastSold?.last_sold_date)
	const yearBuilt = isWithSqft(lastSold)
		? lastSold.year_built
		: firstRecord?.year_built ? String(firstRecord.year_built) : "N/A"
	const grossSqft = isWithSqft(lastSold) ? fmtSqft(lastSold.gross_sqft) : fmtSqft(firstRecord?.bldg_area)
	const landSqft = isWithSqft(lastSold) ? fmtSqft(lastSold.land_sqft) : fmtSqft(firstRecord?.lot_area)

	const propType = firstRecord?.prop_type
	const floors = firstRecord?.num_floors
	const resUnits = firstRecord?.units_res
	const totalUnits = firstRecord?.units_total

	const zoning = modal.propertyData.zoning
	const zoningBadges: { code: string; color: string; bg: string }[] = []
	if (zoning?.zoning_districts?.length) {
		zoning.zoning_districts.forEach(c => zoningBadges.push({ code: c, color: "#3B82F6", bg: "rgba(59,130,246,0.12)" }))
	}
	if (zoning?.commercial_overlays?.length) {
		zoning.commercial_overlays.forEach(c => zoningBadges.push({ code: c, color: "#7C5CBF", bg: "rgba(124,92,191,0.12)" }))
	}
	if (zoning?.special_districts?.length) {
		zoning.special_districts.forEach(c => zoningBadges.push({ code: c, color: "#1A8A5A", bg: "rgba(26,138,90,0.12)" }))
	}
	if (zoning?.limited_height_district) {
		zoningBadges.push({ code: zoning.limited_height_district, color: "#D97706", bg: "rgba(217,119,6,0.12)" })
	}

	const infoItems: { label: string; value: string }[] = []
	if (propType) infoItems.push({ label: "Type", value: propType })
	if (floors) infoItems.push({ label: "Floors", value: String(floors) })
	if (resUnits) infoItems.push({ label: "Res Units", value: String(resUnits) })
	if (totalUnits) infoItems.push({ label: "Total Units", value: String(totalUnits) })

	const hasInfoStrip = infoItems.length > 0 || zoningBadges.length > 0

	return (
		<div className="flex flex-col h-full">
			{/* Street view image with overlaid gradients and drag handle */}
			<div className="relative flex-none h-40 w-full">
				{imageUrl ? (
					<img
						src={imageUrl}
						className="absolute inset-0 w-full h-full object-cover"
						alt="Street view"
					/>
				) : (
					<div className="absolute inset-0 bg-muted" />
				)}
				<div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/40 to-transparent flex justify-center pt-3">
					<div className="w-12 h-1.5 rounded-full bg-white/90 flex-none" />
				</div>
				<div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent" />
			</div>

			{/* Address + BBL */}
			<div className="px-5 pt-2 pb-2 flex-none">
				<h2 className="text-2xl font-black tracking-tight leading-tight">{modal.title}</h2>
				{firstRecord?.bbl && (
					<p className="text-xs font-semibold text-muted-foreground mt-0.5">{firstRecord.bbl}</p>
				)}
			</div>

			{/* Stats strip */}
			<div className="flex-none overflow-x-auto px-5 pb-3">
				<div className="flex items-center min-w-max">
					<StatItem label="Last Sale" value={salePrice} sub={saleDate || undefined} />
					<VDivider />
					<StatItem label="Year Built" value={yearBuilt} />
					<VDivider />
					<StatItem label="Gross Area" value={grossSqft} />
					<VDivider />
					<StatItem label="Land Area" value={landSqft} />
				</div>
			</div>

			{/* Info / zoning strip */}
			{hasInfoStrip && (
				<div className="flex-none overflow-x-auto px-5 pb-3">
					<div className="flex items-center min-w-max">
						{infoItems.map((item, i) => (
							<React.Fragment key={item.label}>
								<StatItem label={item.label} value={item.value} />
								{(i < infoItems.length - 1 || zoningBadges.length > 0) && <VDivider />}
							</React.Fragment>
						))}
						{zoningBadges.length > 0 && (
							<div className="flex flex-col gap-1 flex-none">
								<span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Zoning</span>
								<div className="flex items-center gap-1 flex-wrap">
									{zoningBadges.map((b, i) => (
										<span
											key={i}
											className="text-xs font-bold px-1.5 py-0.5 rounded-md"
											style={{ color: b.color, backgroundColor: b.bg, border: `1px solid ${b.color}40` }}
										>
											{b.code}
										</span>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			)}

			{/* Tab navigation + content */}
			<Tabs defaultValue="records" className="flex flex-col flex-1 min-h-0">
				<div className="px-4 pb-2 flex-none">
					<TabsList className="w-full">
						<TabsTrigger value="records" className="flex-1 text-xs">Records</TabsTrigger>
						<TabsTrigger value="owners" className="flex-1 text-xs">Owners</TabsTrigger>
						<TabsTrigger value="mortgage" className="flex-1 text-xs">Mortgage</TabsTrigger>
						<TabsTrigger value="permits" className="flex-1 text-xs">Permits</TabsTrigger>
						<TabsTrigger value="violations" className="flex-1 text-xs">Violations</TabsTrigger>
					</TabsList>
				</div>

				<TabsContent value="records" className="flex-1 m-0 overflow-y-auto px-3 pb-4">
					<PropertyRecordGrid data={records} />
				</TabsContent>

				<TabsContent value="owners" className="flex-1 m-0 overflow-y-auto px-3 pb-4">
					<Owners
						currentOwners={getCurrentOwner()}
						previousOwners={modal.propertyData.owners.previous_owners}
					/>
				</TabsContent>

				<TabsContent value="mortgage" className="flex-1 m-0 overflow-y-auto px-3 pb-4">
					{!isNull(modal.propertyData.mortgage) ? (
						<Mortgage
							borrower={modal.propertyData.mortgage.borrower}
							lender={modal.propertyData.mortgage.lender}
							amount={modal.propertyData.mortgage.amount}
						/>
					) : (
						<div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
							<p className="font-medium">No mortgage on record</p>
						</div>
					)}
				</TabsContent>

				<TabsContent value="permits" className="flex-1 m-0 overflow-y-auto px-3 pb-4">
					<Jobs jobsFiled={modal.propertyData.job_filings} />
				</TabsContent>

				<TabsContent value="violations" className="flex-1 m-0 overflow-y-auto px-3 pb-4 space-y-4">
					{isEmpty(modal.propertyData.violations) && isEmpty(modal.propertyData.complaints) ? (
						<div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
							<p className="text-sm font-medium">No issues recorded.</p>
						</div>
					) : (
						<>
							<Violations violations={modal.propertyData.violations} />
							<Complaints complaints={modal.propertyData.complaints} />
						</>
					)}
				</TabsContent>
			</Tabs>
		</div>
	)
}
