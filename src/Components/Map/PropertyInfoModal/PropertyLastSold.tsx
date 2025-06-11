import React from "react"
import { DollarSign, Calendar, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { formatDate } from "../../../Utils/FormatDate"
import { FORMAT_PRICE } from "../../../Constants/Constants"

interface PropertyLastSaleProps {
	lastSoldFor: LastSoldFor
}

export default function PropertyLastSold(props: PropertyLastSaleProps) {
	const { last_sold_price, sale_date } = props.lastSoldFor
	const hasNoSaleData = !last_sold_price && !sale_date

	if (hasNoSaleData) {
		return (
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className="bg-white/80 backdrop-blur-sm border border-rose-200/60 dark:bg-gray-900/80 dark:border-rose-800/60 rounded-2xl p-6 mb-6 shadow-lg shadow-rose-500/5 dark:shadow-rose-500/10"
			>
				<div className="flex items-center gap-3 mb-4">
					<div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-xl">
						<TrendingUp className="w-6 h-6 text-rose-600 dark:text-rose-400" />
					</div>
					<h3 className="text-xl font-semibold bg-gradient-to-r from-rose-700 to-rose-900 bg-clip-text text-transparent dark:from-rose-100 dark:to-rose-300">
						Last Sale Information
					</h3>
				</div>
				<p className="text-sm text-gray-600 dark:text-gray-400">No sale history available</p>
			</motion.div>
		)
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			className="bg-white/80 backdrop-blur-sm border border-emerald-200/60 dark:bg-gray-900/80 dark:border-emerald-800/60 rounded-2xl p-6 mb-6 shadow-xl shadow-emerald-500/10 dark:shadow-emerald-500/20"
		>
			<div className="flex items-center gap-3 mb-4">
				<div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
					<TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
				</div>
				<h3 className="text-xl font-semibold bg-gradient-to-r from-emerald-700 to-emerald-900 bg-clip-text text-transparent dark:from-emerald-100 dark:to-emerald-300">
					Last Sale Information
				</h3>
			</div>

			<div className="space-y-4">
				<div className="backdrop-blur-sm  rounded-xl p-4">
					<div className="flex items-start gap-4">
						<div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
							<DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
						</div>
						<div className="flex-1">
							<div className="text-sm font-medium text-emerald-700 dark:text-emerald-300 mb-2">
								Last Sold Price
							</div>
							{last_sold_price === 0 ? (
								<p className="text-sm text-gray-600 dark:text-gray-400 italic bg-emerald-50/50 dark:bg-emerald-900/10 rounded-lg px-3 py-2 border border-emerald-200/30 dark:border-emerald-700/30">
									Price not disclosed: likely a transfer to trust, LLC, or sold pre-ACRIS.
								</p>
							) : (
								<div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
									{FORMAT_PRICE(last_sold_price)}
								</div>
							)}
						</div>
					</div>
				</div>

				{sale_date && (
					<div className=" backdrop-blur-sm p-4">
						<div className="flex items-start gap-4">
							<div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
								<Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
							</div>
							<div className="flex-1">
								<div className="text-sm font-medium text-emerald-700 dark:text-emerald-300 mb-2">
									Sold On
								</div>
								<div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
									{formatDate(sale_date)}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</motion.div>
	)
}
