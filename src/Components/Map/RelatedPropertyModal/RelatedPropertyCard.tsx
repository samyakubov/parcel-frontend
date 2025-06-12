import React from "react"
import { MapPin, User, Home, Hash, Calendar, DollarSign } from "lucide-react"
import isEmpty from "lodash-es/isEmpty"
import {NormalizeStreetName} from "../../../Utils/NormalizeStreetName"

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
export default function RelatedPropertyCard({ property }:PropertyCardProps) {
	return (
		<div
			key={property.documentid}
			className="bg-white dark:bg-gray-800 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm border border-gray-100 dark:border-gray-700"
		>
			<div className="mb-3">
				<div className="flex items-center gap-1.5 mb-1.5">
					<div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded-md">
						<MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
					</div>
					<h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">
						{formatAddress(property)}
					</h3>
				</div>
				<div className="flex items-center gap-1.5 ml-1">
					<User className="w-3 h-3 text-gray-400 dark:text-gray-500 flex-shrink-0" />
					<p className="text-xs text-gray-500 dark:text-gray-400 truncate">
						{property.party_name}
					</p>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-2 text-xs">
				<div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-md">
					<div className="flex items-center gap-1.5 mb-1">
						<Home className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
						<span className="text-gray-900 dark:text-white font-bold">Type</span>
					</div>
					<div className="text-gray-600 dark:text-gray-300 pl-4 truncate">
						{property.prop_type}
					</div>
				</div>

				<div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-md">
					<div className="flex items-center gap-1.5 mb-1">
						<Hash className="w-3 h-3 text-purple-500 dark:text-purple-400" />
						<span className="text-gray-900 dark:text-white font-bold">BBL</span>
					</div>
					<div className="text-gray-600 dark:text-gray-300 pl-4 font-mono">
						{property.bbl}
					</div>
				</div>

				<div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-md">
					<div className="flex items-center gap-1.5 mb-1">
						<Calendar className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
						<span className="text-gray-900 dark:text-white font-bold">Recorded</span>
					</div>
					<div className="text-gray-600 dark:text-gray-300 pl-4">
						{new Date(property.recordedfiled).toLocaleDateString()}
					</div>
				</div>

				<div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-md">
					<div className="flex items-center gap-1.5 mb-1">
						<DollarSign className="w-3 h-3 text-green-500 dark:text-green-400" />
						<span className="text-gray-900 dark:text-white font-bold">Last Sold</span>
					</div>
					<div className="text-gray-600 dark:text-gray-300 pl-4 truncate">
						{formatLastSoldFor(property.last_sold_for)}
					</div>
				</div>
			</div>
		</div>
	)
}

