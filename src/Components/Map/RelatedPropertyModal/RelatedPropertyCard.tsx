import React from "react"
import { MapPin, User, Home, Hash, Calendar, DollarSign } from "lucide-react"
import isEmpty from "lodash-es/isEmpty"
import { NormalizeStreetName } from "../../../Utils/NormalizeStreetName"

interface PropertyCardProps {
	property: RelatedPropertySummary
}

function formatAddress(property: RelatedPropertySummary): string {
	const unit = property.prop_unit ? ` Unit ${property.prop_unit}` : ""
	return `${property.prop_streetnumber} ${NormalizeStreetName(property.prop_streetname)}${unit}`
}

function formatLastSoldFor(lastSoldFor: LastSoldFor): string {
	if (isEmpty(lastSoldFor)) {
		return "No Sale information found"
	}
	return `$${lastSoldFor.last_sold_price.toLocaleString()} on ${new Date(lastSoldFor.sale_date).toLocaleDateString()}`
}

export default function RelatedPropertyCard({ property }: PropertyCardProps) {
	return (
		<div
			key={property.documentid}
			className="group relative bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10 transition-all duration-300 border border-gray-200/60 dark:border-gray-700/60 backdrop-blur-sm hover:-translate-y-1"
		>
			<div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-400/5 dark:to-purple-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

			<div className="relative mb-6">
				<div className="flex items-start gap-3 mb-3">
					<div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 p-2.5 rounded-xl shadow-lg shadow-blue-500/25">
						<MapPin className="w-4 h-4 text-white flex-shrink-0" />
					</div>
					<div className="flex-1 min-w-0">
						<h3 className="text-lg font-bold text-gray-900 dark:text-white truncate mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
							{formatAddress(property)}
						</h3>
						<div className="flex items-center gap-2">
							<div className="bg-gray-100 dark:bg-gray-700 p-1.5 rounded-lg">
								<User className="w-3 h-3 text-gray-500 dark:text-gray-400" />
							</div>
							<p className="text-sm text-gray-600 dark:text-gray-300 truncate font-medium">
								{property.party_name}
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="relative grid grid-cols-2 gap-4">
				<div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 group/item">
					<div className="flex items-center gap-2 mb-2">
						<div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-1.5 rounded-lg">
							<Home className="w-3 h-3 text-white" />
						</div>
						<span className="text-sm font-bold text-gray-900 dark:text-white">Type</span>
					</div>
					<div className="text-sm text-gray-700 dark:text-gray-300 font-medium pl-7 truncate">
						{property.prop_type}
					</div>
				</div>

				<div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 group/item">
					<div className="flex items-center gap-2 mb-2">
						<div className="bg-gradient-to-br from-purple-500 to-purple-600 p-1.5 rounded-lg">
							<Hash className="w-3 h-3 text-white" />
						</div>
						<span className="text-sm font-bold text-gray-900 dark:text-white">BBL</span>
					</div>
					<div className="text-sm text-gray-700 dark:text-gray-300 font-mono font-medium pl-7">
						{property.bbl}
					</div>
				</div>

				<div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 group/item">
					<div className="flex items-center gap-2 mb-2">
						<div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-1.5 rounded-lg">
							<Calendar className="w-3 h-3 text-white" />
						</div>
						<span className="text-sm font-bold text-gray-900 dark:text-white">Recorded</span>
					</div>
					<div className="text-sm text-gray-700 dark:text-gray-300 font-medium pl-7">
						{new Date(property.recordedfiled).toLocaleDateString()}
					</div>
				</div>

				<div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 group/item">
					<div className="flex items-center gap-2 mb-2">
						<div className="bg-gradient-to-br from-green-500 to-green-600 p-1.5 rounded-lg">
							<DollarSign className="w-3 h-3 text-white" />
						</div>
						<span className="text-sm font-bold text-gray-900 dark:text-white">Last Sold</span>
					</div>
					<div className="text-sm text-gray-700 dark:text-gray-300 font-medium pl-7 truncate">
						{formatLastSoldFor(property.last_sold_for)}
					</div>
				</div>
			</div>

			<div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
		</div>
	)
}
