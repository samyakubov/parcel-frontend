import React from "react"
import { DollarSign, Calendar, Building2, Landmark } from "lucide-react"
import { formatDate } from "../../../Utils/FormatDate"

interface MortgageDetailsProps {
	borrower: PropertyRecord
	lender: PropertyRecord
}

export default function MortgageDetails(props: MortgageDetailsProps) {
	const { recordedfiled, amount } = props.borrower
	const lenderName = props.lender.party_name

	return (
		<div className="bg-white/80 backdrop-blur-sm border border-teal-200/60 dark:bg-gray-900/80 dark:border-teal-800/60 rounded-2xl p-6 mb-6 shadow-xl shadow-teal-500/10 dark:shadow-teal-500/20">
			<div className="flex items-center gap-3 mb-6">
				<div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-xl">
					<Building2 className="w-6 h-6 text-teal-600 dark:text-teal-400" />
				</div>
				<h3 className="text-xl font-semibold bg-gradient-to-r from-teal-700 to-teal-900 bg-clip-text text-transparent dark:from-teal-100 dark:to-teal-300">
					Mortgage Details
				</h3>
			</div>

			<div className="space-y-6">
				<div className="flex items-start gap-4">
					<div className="p-2 bg-teal-50 dark:bg-teal-900/20 rounded-xl flex-shrink-0">
						<Landmark className="w-5 h-5 text-teal-600 dark:text-teal-400" />
					</div>
					<div className="flex-1">
						<div className="text-sm font-semibold text-teal-700 dark:text-teal-300 mb-2">
							Lender
						</div>
						<div className="text-lg font-bold text-gray-900 dark:text-gray-100">
							{lenderName}
						</div>
					</div>
				</div>

				<div className="flex items-start gap-4">
					<div className="p-2 bg-teal-50 dark:bg-teal-900/20 rounded-xl flex-shrink-0">
						<DollarSign className="w-5 h-5 text-teal-600 dark:text-teal-400" />
					</div>
					<div className="flex-1">
						<div className="text-sm font-semibold text-teal-700 dark:text-teal-300 mb-2">
							Amount
						</div>
						<div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
							${amount.toLocaleString()}
						</div>
					</div>
				</div>

				<div className="flex items-start gap-4">
					<div className="p-2 bg-teal-50 dark:bg-teal-900/20 rounded-xl flex-shrink-0">
						<Calendar className="w-5 h-5 text-teal-600 dark:text-teal-400" />
					</div>
					<div className="flex-1">
						<div className="text-sm font-semibold text-teal-700 dark:text-teal-300 mb-2">
							Recorded On
						</div>
						<div className="text-gray-900 dark:text-gray-100 font-medium">
							{formatDate(recordedfiled)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
