"use client"
import React, { useState } from "react"
import {PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, PieSectorDataItem} from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import CensusHeader from "@/components/property-details-modal/census/census-header"
import PropertyDetailItem from "@/components/property-details-modal/mortgage/property-detail-item"
import { DollarSign, Home, Users } from "lucide-react"
import { isEmpty, isNull } from "lodash-es"
import CensusEmpty from "@/components/property-details-modal/census/census-empty"
import { FORMAT_PRICE } from "@/utils/format-price"
import isUndefined from "lodash-es/isUndefined"
import CensusLoading from "@/components/property-details-modal/census/census-loading"
import { toJS } from "mobx"
import {CustomTooltip} from "@/components/property-details-modal/census/custom-chart-tooltip"

interface CensusProps {
	census: CensusDemographicDataResponse | null | undefined
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF1919"]

export default function Census({ census }: CensusProps) {
	const [activeIndex, setActiveIndex] = useState<number | null>(null)

	if (isNull(census) || isEmpty(census)) {
		return <CensusEmpty />
	}
	if (isUndefined(census)) {
		return <CensusLoading />
	}

	const {
		population,
		medianIncome,
		medianHomeValue,
		medianRent,
		medianAge,
		raceDemographics,
	} = census

	const plainRaceDemographics = toJS(raceDemographics).map(item => ({
		...item,
		total: population || 0
	}))

	const onPieEnter = (_: PieSectorDataItem, index: number) => {
		setActiveIndex(index)
	}

	const onPieLeave = () => {
		setActiveIndex(null)
	}

	return (
		<Card className="w-full mb-3">
			<CensusHeader />
			<CardContent className="flex flex-col lg:flex-row gap-6 py-6">
				<div className="flex-1 space-y-4">
					<PropertyDetailItem
						icon={<Users className="h-4 w-4 text-muted-foreground" />}
						label="Population"
						value={population?.toLocaleString() ?? "N/A"}
					/>
					<PropertyDetailItem
						icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
						label="Median Income"
						value={medianIncome ? FORMAT_PRICE(medianIncome) : "N/A"}
					/>
					<PropertyDetailItem
						icon={<Home className="h-4 w-4 text-muted-foreground" />}
						label="Median Home Value"
						value={medianHomeValue ? FORMAT_PRICE(medianHomeValue) : "N/A"}
					/>
					<PropertyDetailItem
						icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
						label="Median Rent"
						value={medianRent ? FORMAT_PRICE(medianRent) : "N/A"}
					/>
					<PropertyDetailItem
						icon={<Users className="h-4 w-4 text-muted-foreground" />}
						label="Median Age"
						value={medianAge?.toString() ?? "N/A"}
					/>
				</div>

				<div className="flex-1 flex flex-col min-h-[400px]">
					<div className="text-center mb-2">
						<h3 className="text-lg font-semibold">Race & Ethnicity Demographics</h3>
						<p className="text-sm text-muted-foreground">Population breakdown by race</p>
					</div>
					<div className="flex-1 w-full">
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<defs>
									{COLORS.map((color, index) => (
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
									innerRadius={60}
									outerRadius={100}
									paddingAngle={2}
									labelLine={false}
									onMouseEnter={onPieEnter}
									onMouseLeave={onPieLeave}
									animationBegin={0}
									animationDuration={800}
									animationEasing="ease-out"
								>
									{plainRaceDemographics.map((entry, index) => (
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
									height={36}
									iconType="circle"
									wrapperStyle={{
										paddingTop: "20px",
										fontSize: "14px",
									}}
								/>
							</PieChart>
						</ResponsiveContainer>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
