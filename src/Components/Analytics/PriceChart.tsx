import {
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts"
import React from "react"
import { useAnalyticsContext } from "../../Contexts/AnalyticsContext"
import { observer } from "mobx-react"
import useDarkMode from "../../Hooks/useDarkMode"
import isEmpty from "lodash-es/isEmpty"

function PriceChart() {
	const analyticsContext = useAnalyticsContext()
	const analyticsData = analyticsContext.analyticsData || { prices: [] }
	const isDarkMode = useDarkMode()

	const axisColor = isDarkMode ? "#cccccc" : "#888888"
	const tooltipBg = isDarkMode ? "#1f2937" : "white"
	const tooltipBorder = isDarkMode ? "#374151" : "#e2e8f0"
	const tooltipText = isDarkMode ? "#f9fafb" : "#1f2937"
	const lineColor = isDarkMode ? "#3b82f6" : "#2563eb"
	const noDataBg = isDarkMode ? "bg-gray-800" : "bg-gray-100"
	const noDataText = isDarkMode ? "text-gray-300" : "text-gray-600"

	if (isEmpty(analyticsData.prices)) {
		return (
			<div className={`flex items-center justify-center h-64 rounded-lg ${noDataBg}`}>
				<div className="text-center">
					<svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
					</svg>
					<p className={`font-medium ${noDataText}`}>No price data available</p>
				</div>
			</div>
		)
	}
	return (
		<ResponsiveContainer width="100%" height={300}>
			<LineChart
				data={analyticsData.prices}
				margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
			>
				<XAxis
					dataKey="year"
					stroke={axisColor}
					fontSize={12}
					tickLine={false}
					axisLine={false}
				/>
				<YAxis
					stroke={axisColor}
					fontSize={12}
					tickLine={false}
					axisLine={false}
					tickFormatter={(value) => `$${value.toLocaleString()}`}
				/>
				<Tooltip
					formatter={(value: number) => [`$${value.toLocaleString()}`, "Amount"]}
					labelFormatter={(label) => `Year: ${label}`}
					contentStyle={{
						backgroundColor: tooltipBg,
						borderRadius: "8px",
						border: `1px solid ${tooltipBorder}`,
						color: tooltipText,
					}}
				/>
				<Line
					type="monotone"
					dataKey={"amount"}
					stroke={lineColor}
					strokeWidth={2}
					dot={false}
					activeDot={{ r: 6 }}
				/>
			</LineChart>
		</ResponsiveContainer>

	)
}

export default observer(PriceChart)
