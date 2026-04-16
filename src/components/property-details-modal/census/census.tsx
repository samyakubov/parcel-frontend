"use client"
import React, { useState } from "react"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, PieSectorDataItem } from "recharts"
import { SectionHeader } from "@/components/property-details-modal/shared/section-header"
import { AppCard } from "@/components/property-details-modal/shared/app-card"
import { DetailGrid } from "@/components/property-details-modal/shared/detail-grid"
import { Users } from "lucide-react"
import { isEmpty, isNull, isUndefined } from "lodash-es"
import { FORMAT_PRICE } from "@/utils/format-price"
import { toJS } from "mobx"
import { CustomTooltip } from "@/components/property-details-modal/census/custom-chart-tooltip"

interface CensusProps {
	census: CensusDemographicDataResponse | null | undefined
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF1919"]

export default function Census({ census }: CensusProps) {
	const [activeIndex, setActiveIndex] = useState<number | null>(null)

	if (isUndefined(census)) {
		return (
			<div className="px-1 pt-2">
				<SectionHeader title="Neighborhood Demographics" subtitle="Census data for the surrounding area." />
				<AppCard>
					<div className="space-y-3">
						{[...Array(4)].map((_, i) => (
							<div key={i} className="h-8 rounded-lg bg-muted animate-pulse" />
						))}
					</div>
				</AppCard>
			</div>
		)
	}

	if (isNull(census) || isEmpty(census)) {
		return (
			<div className="px-1 pt-2">
				<SectionHeader title="Neighborhood Demographics" subtitle="Census data for the surrounding area." />
				<div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
					<Users className="h-10 w-10 mb-3 opacity-20" />
					<p className="text-sm">No census data on record.</p>
				</div>
			</div>
		)
	}

	const { population, medianIncome, medianHomeValue, medianRent, medianAge, raceDemographics } = census

	const plainRaceDemographics = toJS(raceDemographics).map(item => ({
		...item,
		total: population || 0,
	}))

	const onPieEnter = (_: PieSectorDataItem, index: number) => setActiveIndex(index)
	const onPieLeave = () => setActiveIndex(null)

	return (
		<div className="px-1 pt-2">
			<SectionHeader title="Neighborhood Demographics" subtitle="Census data for the surrounding area." />

			<AppCard>
				<DetailGrid items={[
					{ label: "Population",        value: population?.toLocaleString() ?? "N/A" },
					{ label: "Median Income",      value: medianIncome ? FORMAT_PRICE(medianIncome) : "N/A" },
					{ label: "Median Home Value",  value: medianHomeValue ? FORMAT_PRICE(medianHomeValue) : "N/A" },
					{ label: "Median Rent",        value: medianRent ? FORMAT_PRICE(medianRent) : "N/A" },
					{ label: "Median Age",         value: medianAge?.toString() ?? "N/A" },
				]} />
			</AppCard>

			<p className="text-[13px] font-bold text-muted-foreground uppercase tracking-wide pl-1 mb-3">
				Race & Ethnicity
			</p>
			<AppCard className="mb-0">
				<div className="h-64 w-full">
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<defs>
								{COLORS.map((_, index) => (
									<filter key={`shadow-${index}`} id={`shadow-${index}`} height="200%">
										<feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
									</filter>
								))}
							</defs>
							<Pie
								data={plainRaceDemographics}
								dataKey="value"
								nameKey="label"
								cx="50%"
								cy="50%"
								innerRadius={45}
								outerRadius={75}
								paddingAngle={2}
								labelLine={false}
								onMouseEnter={onPieEnter}
								onMouseLeave={onPieLeave}
								isAnimationActive={false}
							>
								{plainRaceDemographics.map((_, index) => (
									<Cell
										key={`cell-${index}`}
										fill={COLORS[index % COLORS.length]}
										stroke={activeIndex === index ? "white" : "none"}
										strokeWidth={activeIndex === index ? 3 : 0}
										style={{
											filter: activeIndex === index ? `url(#shadow-${index})` : "none",
											transform: activeIndex === index ? "scale(1.05)" : "scale(1)",
											transformOrigin: "center",
											transition: "all 0.3s ease",
											cursor: "pointer",
										}}
									/>
								))}
							</Pie>
							<Tooltip content={<CustomTooltip />} />
							<Legend
								verticalAlign="bottom"
								iconType="circle"
								wrapperStyle={{ paddingTop: "16px", fontSize: "12px" }}
							/>
						</PieChart>
					</ResponsiveContainer>
				</div>
			</AppCard>
		</div>
	)
}
