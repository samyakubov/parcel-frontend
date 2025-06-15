import React, { useState } from "react"
import Layout from "../Components/Layout/Layout"
import RenderSearch from "../Components/Search/RenderSearch"
import { SEO_CONFIG } from "../Constants/Constants"
import SEOHelmet from "../Components/SEOHelmet"
import { observer } from "mobx-react"
import Grid from "../Components/Search/Grid"
import isEmpty from "lodash-es/isEmpty"
import ExportToExcelButton from "../Components/ExportToExcelButton"
import {searchStore} from "../Stores/SearchStore"

type SearchTab = "Address" | "BBL" | "Owner(s) Name" | "Advanced"

function Search() {
	const [activeTab, setActiveTab] = useState<SearchTab>("Address")
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
	const tabs: SearchTab[] = ["Address", "BBL", "Owner(s) Name", "Advanced"]

	const currentSEO = SEO_CONFIG[activeTab]

	const handleTabChange = (tab: SearchTab) => {
		setActiveTab(tab)
	}

	const toggleSidebar = () => {
		setSidebarCollapsed(!sidebarCollapsed)
	}

	return (
		<Layout>
			<SEOHelmet
				description={currentSEO.description}
				keywords={currentSEO.keywords}
			/>
			<div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
				<aside className={`${sidebarCollapsed ? "w-0" : "w-72 xl:w-80"} transition-all duration-300 ease-in-out flex-shrink-0 overflow-hidden border-r border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl flex flex-col relative`}>
					<button
						onClick={toggleSidebar}
						className="absolute right-3 top-3 z-10 w-6 h-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
					>
						<svg className={`w-3 h-3 transition-transform duration-200 ${sidebarCollapsed ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
						</svg>
					</button>

					<div className={`${sidebarCollapsed ? "opacity-0" : "opacity-100"} transition-opacity duration-300 p-8 flex-1 overflow-y-auto`}>
						<nav className="mb-8">
							<div className="bg-gray-100/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/50 dark:border-gray-700/50">
								<div className="grid grid-cols-2 gap-1">
									{tabs.map((tab) => (
										<button
											key={tab}
											onClick={() => handleTabChange(tab)}
											className={`px-3 py-2.5 text-xs font-medium rounded-xl transition-all duration-200 ${
												activeTab === tab
													? "bg-white dark:bg-gray-700 text-blue-700 dark:text-blue-300 shadow-lg shadow-blue-500/10 border border-blue-200/50 dark:border-blue-700/50"
													: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-700/50"
											}`}
										>
											{tab}
										</button>
									))}
								</div>
							</div>
						</nav>

						<div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
							<RenderSearch activeTab={activeTab} />
						</div>
					</div>

					{(activeTab === "Address" || activeTab === "BBL") &&
						!isEmpty(searchStore.propertyResults.records) &&
						searchStore.propertyResults.records[0]?.bbl && (
						<div className={`${sidebarCollapsed ? "opacity-0" : "opacity-100"} transition-opacity duration-300 p-6 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-gray-800/50 dark:to-gray-700/50`}>
							<div className="space-y-3">
								<a
									target="_blank"
									rel="noopener noreferrer"
									href={`http://a836-acris.nyc.gov/bblsearch/bblsearch.asp?borough=${searchStore.propertyResults.records[0].bbl[0]}&block=${searchStore.propertyResults.records[0].prop_block}&lot=${searchStore.propertyResults.records[0].prop_lot}`}
									className="flex items-center justify-between p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:shadow-lg transition-all duration-200 group"
								>
									<span className="text-sm font-medium">View on ACRIS</span>
									<svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
									</svg>
								</a>
								<a
									target="_blank"
									rel="noopener noreferrer"
									href={`http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?boro=${searchStore.propertyResults.records[0].bbl[0]}&block=${searchStore.propertyResults.records[0].prop_block}&lot=${searchStore.propertyResults.records[0].prop_lot}`}
									className="flex items-center justify-between p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:shadow-lg transition-all duration-200 group"
								>
									<span className="text-sm font-medium">View DOB Profile</span>
									<svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
									</svg>
								</a>
							</div>
						</div>
					)}
				</aside>

				<main className="flex-1 overflow-hidden flex flex-col min-w-0 max-w-full">
					<header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 px-4 lg:px-6 py-4 shadow-sm flex-shrink-0">
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-4 min-w-0">
								{sidebarCollapsed && (
									<button
										onClick={toggleSidebar}
										className="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 flex-shrink-0"
									>
										<svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
										</svg>
									</button>
								)}
								<h1 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-gray-100 truncate">
									{activeTab} Search Results
								</h1>
							</div>
						</div>
					</header>

					<div className="flex-1 overflow-hidden bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm min-h-0">
						<Grid
							data={
								// eslint-disable-next-line no-nested-ternary
								activeTab === "Advanced"
									? searchStore.advancedSearchResults
									: ["Address", "BBL"].includes(activeTab)
										? searchStore.propertyResults.records
										: searchStore.partyResults.records
							}
						/>
					</div>
				</main>

				<div className="fixed bottom-6 right-6 z-50">
					<div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
						<ExportToExcelButton/>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default observer(Search)
