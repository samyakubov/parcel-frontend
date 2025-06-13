import React, { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Filter, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import SearchBar from "../SearchBar"
import StyledDropdown from "../StyledDropdown"
import {useLocation} from "react-router"

interface GridProps {
	data: PropertyRecord[];
}

const PAGE_SIZES = ["10", "25", "50", "100"]

const getDocumentTypeColor = (docType: string): string => {
	switch (docType.toLowerCase()) {
	case "mortgage":
		return "bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 border-l-4 border-emerald-400"
	case "assignment, mortgage":
		return "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border-l-4 border-blue-400"
	case "subordination of mortgage":
		return "bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/10 dark:to-violet-900/10 border-l-4 border-purple-400"
	case "satisfaction of mortgage":
		return "bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 border-l-4 border-orange-400"
	case "agreement":
		return "bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/10 dark:to-amber-900/10 border-l-4 border-yellow-400"
	case "deed":
		return "bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/10 dark:to-rose-900/10 border-l-4 border-pink-400"
	default:
		return "bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800/50 dark:to-slate-800/50 border-l-4 border-gray-300 dark:border-gray-600"
	}
}

const getDocumentTypeBadge = (docType: string): { bg: string; text: string; dot: string } => {
	switch (docType.toLowerCase()) {
	case "mortgage":
		return { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-300", dot: "bg-emerald-500" }
	case "assignment, mortgage":
		return { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-300", dot: "bg-blue-500" }
	case "subordination of mortgage":
		return { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-300", dot: "bg-purple-500" }
	case "satisfaction of mortgage":
		return { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-300", dot: "bg-orange-500" }
	case "agreement":
		return { bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-700 dark:text-yellow-300", dot: "bg-yellow-500" }
	case "deed":
		return { bg: "bg-pink-100 dark:bg-pink-900/30", text: "text-pink-700 dark:text-pink-300", dot: "bg-pink-500" }
	default:
		return { bg: "bg-gray-100 dark:bg-gray-700", text: "text-gray-700 dark:text-gray-300", dot: "bg-gray-500" }
	}
}

export default function Grid({ data }: GridProps) {
	const [currentPage, setCurrentPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)
	const [sortField, setSortField] = useState<keyof PropertyRecord>("documentid")
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
	const [searchTerm, setSearchTerm] = useState("")
	const [filteredData, setFilteredData] = useState<PropertyRecord[]>([])
	const location = useLocation()

	useEffect(() => {
		let result = [...data]

		if (searchTerm) {
			result = result.filter(record =>
				Object.values(record).some(value =>
					String(value).toLowerCase().includes(searchTerm.toLowerCase())
				)
			)
		}

		result.sort((a, b) => {
			const aValue = a[sortField]
			const bValue = b[sortField]

			if (typeof aValue === "string" && typeof bValue === "string") {
				return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
			}

			if (aValue === null) return sortDirection === "asc" ? -1 : 1
			if (bValue === null) return sortDirection === "asc" ? 1 : -1

			return sortDirection === "asc" ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue)
		})

		setFilteredData(result)
	}, [data, searchTerm, sortField, sortDirection])

	const totalPages = Math.ceil(filteredData.length / pageSize)
	const startIndex = (currentPage - 1) * pageSize
	const endIndex = startIndex + pageSize
	const currentData = filteredData.slice(startIndex, endIndex)

	const handleSort = (field: keyof PropertyRecord) => {
		if (field === sortField) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc")
		} else {
			setSortField(field)
			setSortDirection("asc")
		}
	}

	const getSortIcon = (field: keyof PropertyRecord) => {
		if (sortField === field) {
			return sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
		}
		return <ArrowUpDown className="h-4 w-4 opacity-40" />
	}

	const columns: Array<{field: keyof PropertyRecord, label: string}> = location.pathname === "/map"
		? [
			{ field: "amount", label: "Amount" },
			{ field: "party_name", label: "Party Name" },
			{ field: "partytype_desc", label: "Party" },
			{ field: "doc_type", label: "Document Type" },
			{ field: "recordedfiled", label: "Recorded Date" }
		]
		: [
			{ field: "prop_streetnumber", label: "House Number" },
			{ field: "prop_streetname", label: "Street" },
			{ field: "prop_unit", label: "Unit" },
			{ field: "bbl", label: "BBL" },
			{ field: "amount", label: "Amount" },
			{ field: "prop_type", label: "Property Type" },
			{ field: "party_name", label: "Party Name" },
			{ field: "partytype_desc", label: "Party" },
			{ field: "doc_type", label: "Document Type" },
			{ field: "recordedfiled", label: "Recorded Date" }
		]

	const legendItems = [
		{ type: "mortgage", label: "Mortgage" },
		{ type: "assignment, mortgage", label: "Assignment" },
		{ type: "subordination of mortgage", label: "Subordination" },
		{ type: "satisfaction of mortgage", label: "Satisfaction" },
		{ type: "agreement", label: "Agreement" },
		{ type: "deed", label: "Deed" }
	]

	return (
		<div className="w-full h-full flex flex-col bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl overflow-hidden">
			<div className="flex-shrink-0 bg-gradient-to-r from-gray-50/90 to-white/90 dark:from-gray-700/90 dark:to-gray-800/90 backdrop-blur-sm p-4 border-b border-gray-200/50 dark:border-gray-700/50">
				<div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
					<div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
						<div className="w-full sm:w-auto min-w-0">
							<SearchBar
								placeholder="Search records..."
								inputClassName="text-sm"
								onQueryChange={setSearchTerm}
								query={searchTerm}
							/>
						</div>
						<div className="flex items-center gap-2 text-xs">
							<Filter className="h-3 w-3 text-gray-400" />
							<span className="font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">Legend:</span>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<StyledDropdown
							options={PAGE_SIZES}
							value={pageSize}
							// onChange={setPageSize}
						/>
					</div>
				</div>

				<div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-200/30 dark:border-gray-700/30">
					{legendItems.map(({ type, label }) => {
						const badge = getDocumentTypeBadge(type)
						return (
							<div key={type} className={`flex items-center gap-1.5 px-2 py-1 rounded-lg ${badge.bg} ${badge.text} text-xs font-medium`}>
								<div className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></div>
								<span className="hidden sm:inline">{label}</span>
							</div>
						)
					})}
				</div>
			</div>

			<div className="flex-1 overflow-hidden">
				<div className="h-full overflow-auto">
					<table className="w-full">
						<thead className="sticky top-0 z-10">
							<tr className="bg-gradient-to-r from-gray-100/90 to-gray-50/90 dark:from-gray-600/90 dark:to-gray-700/90 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-600/50">
								{columns.map(({ field, label }) => (
									<th
										key={field}
										className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-200/50 dark:hover:bg-gray-500/50 transition-all duration-200 group whitespace-nowrap"
										onClick={() => handleSort(field)}
									>
										<div className="flex items-center justify-between min-w-0">
											<span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 truncate text-xs">
												{label}
											</span>
											<div className="ml-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
												{getSortIcon(field)}
											</div>
										</div>
									</th>
								))}
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
							{currentData.map((record, index) => (
								<tr
									key={record.documentid + index}
									className={`${getDocumentTypeColor(record.doc_type as string)} hover:shadow-md transition-all duration-200 group`}
								>
									{columns.map(({ field }) => (
										<td
											key={field}
											className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-200"
										>
											{/* eslint-disable-next-line no-nested-ternary */}
											{field === "amount" ? (
												<span className="font-semibold text-green-600 dark:text-green-400 text-xs">
													{new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(record[field] as number)}
												</span>
											// eslint-disable-next-line no-nested-ternary
											) : field === "doc_type" ? (
												<div className="flex items-center gap-2">
													{(() => {
														const badge = getDocumentTypeBadge(record[field] as string)
														return (
															<span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-medium ${badge.bg} ${badge.text}`}>
																<div className={`w-1 h-1 rounded-full ${badge.dot}`}></div>
																<span className="truncate max-w-24">{String(record[field] || "--")}</span>
															</span>
														)
													})()}
												</div>
											) : field === "recordedfiled" ? (
												<span className="text-gray-600 dark:text-gray-400 text-xs">
													{new Date(record[field] as string).toLocaleDateString()}
												</span>
											) : (
												<span className="truncate max-w-32 text-xs block" title={String(record[field] || "--")}>
													{String(record[field] || "--")}
												</span>
											)}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<div className="flex-shrink-0 bg-gradient-to-r from-gray-50/90 to-white/90 dark:from-gray-700/90 dark:to-gray-800/90 backdrop-blur-sm p-3 border-t border-gray-200/50 dark:border-gray-700/50">
				<div className="flex flex-col sm:flex-row items-center justify-between gap-3">
					<div className="text-xs font-medium text-gray-600 dark:text-gray-400">
						Showing <span className="text-gray-900 dark:text-gray-100 font-semibold">{startIndex + 1}</span> to{" "}
						<span className="text-gray-900 dark:text-gray-100 font-semibold">{Math.min(endIndex, filteredData.length)}</span> of{" "}
						<span className="text-gray-900 dark:text-gray-100 font-semibold">{filteredData.length}</span> records
					</div>
					<div className="flex items-center gap-1">
						<button
							className="p-1.5 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all duration-200"
							onClick={() => setCurrentPage(1)}
							disabled={currentPage === 1}
						>
							<ChevronsLeft className="h-3 w-3" />
						</button>
						<button
							className="p-1.5 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all duration-200"
							onClick={() => setCurrentPage(current => Math.max(1, current - 1))}
							disabled={currentPage === 1}
						>
							<ChevronLeft className="h-3 w-3" />
						</button>
						<div className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-medium text-xs border border-blue-200 dark:border-blue-800">
							{currentPage} / {totalPages}
						</div>
						<button
							className="p-1.5 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all duration-200"
							onClick={() => setCurrentPage(current => Math.min(totalPages, current + 1))}
							disabled={currentPage === totalPages}
						>
							<ChevronRight className="h-3 w-3" />
						</button>
						<button
							className="p-1.5 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-all duration-200"
							onClick={() => setCurrentPage(totalPages)}
							disabled={currentPage === totalPages}
						>
							<ChevronsRight className="h-3 w-3" />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
