import Layout from "../Components/Layout/Layout"
import React from "react"
import PriceChart from "../Components/Analytics/PriceChart"
import RecentSales from "../Components/Analytics/RecentSales"
import AnalyticsSearchPanel from "../Components/Analytics/AnalyticsSearchPanel"
import {useAnalyticsContext} from "../Contexts/AnalyticsContext"
import {Loader2} from "lucide-react"
import {observer} from "mobx-react"

function Analytics() {
	const { isGettingAnalytics } = useAnalyticsContext()

	return (
		<Layout>
			<div className="h-full bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-200 px-4 py-6">
				<div className="max-w-7xl mx-auto">
					<AnalyticsSearchPanel/>

					{isGettingAnalytics ? (
						<div className="flex justify-center items-center h-64">
							<Loader2 className="h-10 w-10 text-gray-600 dark:text-gray-400 animate-spin" />
						</div>
					) : (
						<div className="flex flex-col gap-6 mt-8">
							<div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
								<h2 className="text-xl font-semibold mb-4">Price Trends</h2>
								<div className="h-80">
									<PriceChart />
								</div>
							</div>

							<div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
								<RecentSales />
							</div>
						</div>
					)}
				</div>
			</div>
		</Layout>
	)
}
export default observer(Analytics)
