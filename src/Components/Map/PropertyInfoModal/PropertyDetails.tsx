import React from "react"
import { MapPin, Building2, Home, Hash } from "lucide-react"
import isEmpty from "lodash-es/isEmpty"

interface PropertyDetailProps {
	first_record: PropertyRecord
}

export default function PropertyDetails(props: PropertyDetailProps) {
	const record = props.first_record

	if (isEmpty(record)) {
		return (
			<div className="bg-white/80 backdrop-blur-sm border border-rose-200/60 dark:bg-gray-900/80 dark:border-rose-800/60 rounded-2xl p-6 mb-6 shadow-lg shadow-rose-500/5 dark:shadow-rose-500/10">
				<div className="flex items-center gap-3 mb-4">
					<div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-xl">
						<Building2 className="w-6 h-6 text-rose-600 dark:text-rose-400" />
					</div>
					<h3 className="text-xl font-semibold bg-gradient-to-r from-rose-700 to-rose-900 bg-clip-text text-transparent dark:from-rose-100 dark:to-rose-300">
						Property Details
					</h3>
				</div>
				<p className="text-sm text-gray-600 dark:text-gray-400">
					No property details available.
				</p>
			</div>
		)
	}

	return (
		<div className="bg-white/80 backdrop-blur-sm border border-indigo-200/60 dark:bg-gray-900/80 dark:border-indigo-800/60 rounded-2xl p-6 mb-6 shadow-xl shadow-indigo-500/10 dark:shadow-indigo-500/20">
			<div className="flex items-center gap-3 mb-6">
				<div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
					<Building2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
				</div>
				<h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-700 to-indigo-900 bg-clip-text text-transparent dark:from-indigo-100 dark:to-indigo-300">
					Property Details
				</h3>
			</div>

			<div className="space-y-6">
				<div className="flex items-start gap-4">
					<div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex-shrink-0">
						<MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
					</div>
					<div className="flex-1">
						<div className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
							Address
						</div>
						<div className="text-gray-900 dark:text-gray-100 font-medium mb-1">
							{record.prop_streetnumber} {record.prop_streetname}
						</div>
						<div className="text-gray-700 dark:text-gray-200">
							{record.prop_borough}
						</div>
					</div>
				</div>

				<div className="flex items-start gap-4">
					<div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex-shrink-0">
						<Home className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
					</div>
					<div className="flex-1">
						<div className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
							Property Type
						</div>
						<div className="text-gray-900 dark:text-gray-100 font-medium">
							{record.prop_type}
						</div>
					</div>
				</div>

				<div className="flex items-start gap-4">
					<div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex-shrink-0">
						<Hash className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
					</div>
					<div className="flex-1">
						<div className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
							BBL
						</div>
						<div className="text-gray-900 dark:text-gray-100 font-medium font-mono">
							{record.bbl}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
