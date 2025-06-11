import React from "react"
import { DollarSign, Users, ClipboardList, AlertTriangle, Building, CircleAlert, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"
import isEmpty from "lodash-es/isEmpty"
import { FORMAT_PRICE } from "../../../Constants/Constants"

interface OverviewProps {
	propertyData: PropertyDetails;
}

export default function Overview({ propertyData }: OverviewProps) {
	const { last_sold_for, current_owner, records, violations, complaints, zoning } = propertyData

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			className="bg-white/80 backdrop-blur-sm border border-cyan-200/60 dark:bg-gray-900/80 dark:border-cyan-800/60 rounded-2xl p-6 mb-6 shadow-xl shadow-cyan-500/10 dark:shadow-cyan-500/20"
		>
			<div className="flex items-center gap-3 mb-4">
				<div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl">
					<BarChart3 className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
				</div>
				<h3 className="text-xl font-semibold bg-gradient-to-r from-cyan-700 to-cyan-900 bg-clip-text text-transparent dark:from-cyan-100 dark:to-cyan-300">
					Property Overview
				</h3>
			</div>

			<div className="rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-cyan-200/30 dark:border-cyan-700/30">
				<div className="divide-y divide-cyan-200/20 dark:divide-cyan-700/20">
					{isEmpty(last_sold_for.sale_date) ? (
						<div className="px-4 py-3 flex items-start gap-4">
							<div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
								<DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
							</div>
							<div className="flex-1">
								<div className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">
									Sale Information
								</div>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									No sale data found for this property.
								</p>
							</div>
						</div>
					) : (
						<div className="px-4 py-3 flex items-start gap-4">
							<div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
								<DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
							</div>
							<div className="flex-1">
								<div className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">
									Last Sale
								</div>
								<p className="text-sm text-gray-700 dark:text-gray-300">
									Sold for <span className="font-semibold text-gray-900 dark:text-gray-100">{FORMAT_PRICE(last_sold_for.last_sold_price)}</span> on <span className="font-semibold text-gray-900 dark:text-gray-100">{new Date(last_sold_for.sale_date).toLocaleDateString()}</span>
								</p>
							</div>
						</div>
					)}

					<div className="px-4 py-3 flex items-start gap-4">
						<div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
							<Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
						</div>
						<div className="flex-1">
							<div className="text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-1">
								Current Owners
							</div>
							{current_owner.length > 6 ? (
								<p className="text-sm text-gray-700 dark:text-gray-300">
									<span className="font-semibold text-gray-900 dark:text-gray-100">{current_owner.length}</span> current owners
								</p>
							) : (
								<p className="text-sm text-gray-700 dark:text-gray-300">
									<span className="font-semibold text-gray-900 dark:text-gray-100">{current_owner.join(", ")}</span>
								</p>
							)}
						</div>
					</div>

					<div className="px-4 py-3 flex items-start gap-4">
						<div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
							<ClipboardList className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
						</div>
						<div className="flex-1">
							<div className="text-sm font-medium text-emerald-700 dark:text-emerald-300 mb-1">
								Property Records
							</div>
							<p className="text-sm text-gray-700 dark:text-gray-300">
								<span className="font-semibold text-gray-900 dark:text-gray-100">{records.length}</span> notable entries
							</p>
						</div>
					</div>

					<div className="px-4 py-3 flex items-start gap-4">
						<div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-xl">
							<AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
						</div>
						<div className="flex-1">
							<div className="text-sm font-medium text-red-700 dark:text-red-300 mb-1">
								Violations
							</div>
							<p className="text-sm text-gray-700 dark:text-gray-300">
								<span className="font-semibold text-gray-900 dark:text-gray-100">{violations.length}</span> violations linked to property
							</p>
						</div>
					</div>

					<div className="px-4 py-3 flex items-start gap-4">
						<div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
							<CircleAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />
						</div>
						<div className="flex-1">
							<div className="text-sm font-medium text-amber-700 dark:text-amber-300 mb-1">
								Complaints
							</div>
							<p className="text-sm text-gray-700 dark:text-gray-300">
								<span className="font-semibold text-gray-900 dark:text-gray-100">{complaints.length}</span> complaints linked to property
							</p>
						</div>
					</div>

					<div className="px-4 py-3 flex items-start gap-4">
						<div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-xl">
							<Building className="w-5 h-5 text-violet-600 dark:text-violet-400" />
						</div>
						<div className="flex-1">
							<div className="text-sm font-medium text-violet-700 dark:text-violet-300 mb-1">
								Zoning
							</div>
							<p className="text-sm text-gray-700 dark:text-gray-300">
								<span className="font-semibold text-gray-900 dark:text-gray-100">{zoning.zoning_districts}</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	)
}
