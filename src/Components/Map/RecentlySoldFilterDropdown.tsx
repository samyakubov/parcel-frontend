import React, { useState } from "react"
import { ListFilter, X, TrendingUp, Sparkles, DollarSign, Home, Search } from "lucide-react"
import { useSearchContext } from "../../Contexts/SearchContext"
import useAdvancedSearch from "../../Hooks/Search/useAdvancedSearch"
import {observer} from "mobx-react"

function RecentlySoldFilterDropdown() {
	const searchContext = useSearchContext()
	const getRecentlySold = useAdvancedSearch()
	const [isOpen, setIsOpen] = useState(false)

	const handleSearch = () => {
		setIsOpen(false)
	}

	const handleCancel = () => {
		setIsOpen(false)
	}

	return (
		<div className={"relative"}>
			{isOpen && (
				<div className="absolute bottom-full left-0 mb-4 z-30">
					<div className="w-[28rem] rounded-3xl shadow-2xl backdrop-blur-2xl bg-white/90 dark:bg-gray-900/90 border border-white/20 dark:border-gray-700/30 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
						<div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-emerald-500/5 animate-pulse"></div>

						<div className="relative bg-gradient-to-r from-blue-500/10 via-purple-500/8 to-emerald-500/10 px-8 py-6 border-b border-white/10 dark:border-gray-700/30">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="relative">
										<div className="p-2.5 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20">
											<TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
										</div>
										<div className="absolute -top-1 -right-1">
											<Sparkles className="h-3 w-3 text-emerald-500 animate-pulse" />
										</div>
									</div>
									<div>
										<h3 className="font-bold text-lg bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
											Recently Sold Properties
										</h3>
										<p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
											Discover market trends & pricing
										</p>
									</div>
								</div>
								<button
									onClick={handleCancel}
									className="group p-2 rounded-xl hover:bg-red-500/10 hover:border-red-500/20 border border-transparent transition-all duration-200 hover:scale-110"
								>
									<X className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-red-500 transition-colors duration-200" />
								</button>
							</div>
						</div>

						<div className="relative p-8 space-y-8">
							<div className="space-y-5">
								<div className="flex items-center gap-3">
									<div className="p-1.5 rounded-lg bg-gradient-to-br from-emerald-500/20 to-green-500/20">
										<DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
									</div>
									<div>
										<label className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
											Price Range
										</label>
										<p className="text-xs text-gray-500 dark:text-gray-400">
											Set your budget parameters
										</p>
									</div>
								</div>
								<div className="grid grid-cols-2 gap-6">
									<div className="relative group">
										<div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-all duration-300"></div>
										<div className="relative">
											<input
												type="number"
												id="min_price"
												name="min_price"
												placeholder="Min price"
												onChange={(e) => {
													searchContext.setAdvancedSearchQuery("from_amount", Number(e.target.value))
												}}
												className="w-full pl-10 pr-4 py-3.5 rounded-2xl border-2 border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 text-sm"
											/>
											<DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-emerald-500 transition-all duration-300 z-10" />
										</div>
									</div>
									<div className="relative group">
										<div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-all duration-300"></div>
										<div className="relative">
											<input
												type="number"
												id="max_price"
												name="max_price"
												placeholder="Max price"
												onChange={(e) => {
													searchContext.setAdvancedSearchQuery("to_amount", Number(e.target.value))
												}}
												className="w-full pl-10 pr-4 py-3.5 rounded-2xl border-2 border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-sm"
											/>
											<DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-all duration-300 z-10" />
										</div>
									</div>
								</div>
							</div>

							<div className="space-y-5">
								<div className="flex items-center gap-3">
									<div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
										<Home className="h-4 w-4 text-blue-600 dark:text-blue-400" />
									</div>
									<div>
										<label className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
											Property Type
										</label>
										<p className="text-xs text-gray-500 dark:text-gray-400">
											Filter by property category
										</p>
									</div>
								</div>
								<div className="relative group">
									<div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-all duration-300"></div>
									<div className="relative">
										<select
											onChange={(e) => {
												searchContext.setAdvancedSearchQuery("property_type", e.target.value)
											}}
											className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300 text-sm"
										>
											<option value="">Select Property Type</option>
											<option value="RESIDENTIAL">Residential</option>
											<option value="COMMERCIAL">Commercial</option>
											<option value="MIXED_USE">Mixed Use</option>
										</select>
									</div>
								</div>
							</div>
						</div>

						<div className="relative px-8 py-6 bg-gradient-to-r from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 border-t border-white/10 dark:border-gray-700/30 backdrop-blur-sm">
							<div className="flex gap-4">
								<button
									className="
										flex-1 px-6 py-3.5 rounded-2xl font-semibold text-sm
										bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
										text-gray-700 dark:text-gray-300
										border-2 border-gray-200/50 dark:border-gray-600/50
										hover:bg-gray-50 dark:hover:bg-gray-700/80
										hover:border-gray-300 dark:hover:border-gray-500
										hover:scale-105 active:scale-95
										transition-all duration-200
										focus:outline-none focus:ring-4 focus:ring-gray-500/20
										group
									"
									onClick={handleCancel}
								>
									<span className="group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-200">
										Cancel
									</span>
								</button>
								<button
									className="
										flex-1 px-6 py-3.5 rounded-2xl font-semibold text-sm
										bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500
										hover:from-blue-600 hover:via-purple-600 hover:to-emerald-600
										text-white shadow-xl hover:shadow-2xl
										hover:scale-105 active:scale-95
										transition-all duration-300 transform
										focus:outline-none focus:ring-4 focus:ring-blue-500/30
										relative overflow-hidden group
									"
									onClick={handleSearch}
								>
									<div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
									<div className="relative flex items-center justify-center gap-2">
										<Search className="h-4 w-4" />
										<span>Search Properties</span>
									</div>
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			<button
				onClick={() => setIsOpen(!isOpen)}
				className={`group relative flex justify-center items-center rounded-2xl p-3 shadow-xl border border-white/20 transition-all duration-500 ease-out hover:scale-105 active:scale-95 ${
					isOpen
						? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-blue-500/50 border-blue-300/30"
						: "bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl text-gray-700 dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800/20 hover:shadow-2xl"
				}`}
			>
				<div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${isOpen ? "from-blue-400/20 to-purple-500/20" : "from-white/5 to-transparent"} transition-all duration-500`}></div>
				<ListFilter className={`relative h-5 w-5 transition-all duration-500 ${isOpen ? "rotate-180 scale-110" : "group-hover:rotate-12 group-hover:scale-110"}`} />
			</button>
		</div>
	)
}

export default observer(RecentlySoldFilterDropdown)
