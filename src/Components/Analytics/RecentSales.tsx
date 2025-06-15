import React, { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import useDarkMode from "../../Hooks/useDarkMode"
import {observer} from "mobx-react"
import isEmpty from "lodash-es/isEmpty"
import {analyticsStore} from "../../Stores/AnalyticsStore"


// eslint-disable-next-line complexity
function RecentSales() {
	const [currentPage, setCurrentPage] = useState(1)
	const [searchTerm, setSearchTerm] = useState("")
	const [sortBy, setSortBy] = useState("date")
	const isDarkMode = useDarkMode()
	const analyticsData = analyticsStore.analyticsData
	const filteredData = analyticsData.recent_sales
	const itemsPerPage = 10


	const noDataBg = isDarkMode ? "bg-gray-800" : "bg-gray-100"
	const noDataText = isDarkMode ? "text-gray-300" : "text-gray-600"
	const borderColor = isDarkMode ? "border-gray-700" : "border-gray-200"
	const displayData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

	const totalPages = Math.ceil(filteredData.length / itemsPerPage)

	if (isEmpty(filteredData)) {
		return (
			<div className={`flex items-center justify-center h-64 rounded-lg ${noDataBg} shadow-sm border ${borderColor}`}>
				<div className="text-center">
					<svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
					</svg>
					<p className={`font-medium ${noDataText}`}>Recent sales will appear here</p>
				</div>
			</div>
		)
	}

	return (
		<div className="space-y-4">
			<div className="flex flex-col sm:flex-row gap-4 justify-between">
				<div className="relative w-full sm:w-64">
					<input
						type="text"
						placeholder="Search by address or type..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className={`w-full px-3 py-2 border rounded-md ${
							isDarkMode
								? "bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-400"
								: "bg-white border-gray-300 text-gray-900"
						}`}
					/>
				</div>
				<div className="w-full sm:w-48">
					<select
						value={sortBy}
						onChange={(e) => setSortBy(e.target.value)}
						className={`w-full px-3 py-2 border rounded-md ${
							isDarkMode
								? "bg-gray-800 border-gray-700 text-gray-200"
								: "bg-white border-gray-300 text-gray-900"
						}`}
					>
						<option value="date">Most Recent</option>
						<option value="price-desc">Price (High to Low)</option>
						<option value="price-asc">Price (Low to High)</option>
						<option value="sqft">Square Footage</option>
					</select>
				</div>
			</div>


			<div className={`rounded-md border ${
				isDarkMode ? "border-gray-700" : "border-gray-200"
			}`}>
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className={isDarkMode ? "bg-gray-800" : "bg-gray-50"}>
							<tr>
								<th
									scope="col"
									className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
										isDarkMode ? "text-gray-400" : "text-gray-500"
									}`}
								>
                                Address
								</th>
								<th
									scope="col"
									className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
										isDarkMode ? "text-gray-400" : "text-gray-500"
									}`}
								>
                                Type
								</th>
								<th
									scope="col"
									className={`px-6 py-3 text-right text-xs font-medium uppercase tracking-wider ${
										isDarkMode ? "text-gray-400" : "text-gray-500"
									}`}
								>
                                Price
								</th>
								<th
									scope="col"
									className={`px-6 py-3 text-right text-xs font-medium uppercase tracking-wider ${
										isDarkMode ? "text-gray-400" : "text-gray-500"
									}`}
								>
                                Sale Date
								</th>
							</tr>
						</thead>
						<tbody className={`divide-y ${
							isDarkMode
								? "bg-gray-900 divide-gray-700"
								: "bg-white divide-gray-200"
						}`}>
							{displayData.map((sale) => (
								<tr key={sale.documentid} className={isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-50"}>
									<td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
										isDarkMode ? "text-gray-200" : "text-gray-900"
									}`}>{sale.prop_streetnumber} {sale.prop_streetname}</td>
									<td className={`px-6 py-4 whitespace-nowrap text-sm ${
										isDarkMode ? "text-gray-400" : "text-gray-500"
									}`}>
										<div className="flex items-center gap-2">
											{/*{getPropertyIcon(sale.propertyType)}*/}
											<span>{sale.prop_type}</span>
										</div>
									</td>

									<td className={`px-6 py-4 whitespace-nowrap text-sm text-right ${
										isDarkMode ? "text-gray-200" : "text-gray-900"
									}`}>
                                    ${sale.amount.toLocaleString()}
									</td>
									<td className={`px-6 py-4 whitespace-nowrap text-sm text-right ${
										isDarkMode ? "text-gray-400" : "text-gray-500"
									}`}>{sale.recordedfiled}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{totalPages > 1 && (
				<div className="flex items-center justify-end space-x-2">
					<button
						onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
						disabled={currentPage === 1}
						className={`inline-flex items-center px-3 py-2 border text-sm leading-4 font-medium rounded-md ${
							isDarkMode
								? "border-gray-700 text-gray-300 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
								: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
						}`}
					>
						<ChevronLeft className="h-4 w-4" />
						<span className="sr-only">Previous Page</span>
					</button>
					<div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Page {currentPage} of {totalPages}
					</div>
					<button
						onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
						disabled={currentPage === totalPages}
						className={`inline-flex items-center px-3 py-2 border text-sm leading-4 font-medium rounded-md ${
							isDarkMode
								? "border-gray-700 text-gray-300 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
								: "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
						}`}
					>
						<ChevronRight className="h-4 w-4" />
						<span className="sr-only">Next Page</span>
					</button>
				</div>
			)}
		</div>
	)
}

export default observer(RecentSales)
