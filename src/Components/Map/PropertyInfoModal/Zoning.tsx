import React from "react"
import { Hash, Map, Building2, Clock } from "lucide-react"
import { formatDate } from "../../../Utils/FormatDate"
import isNull from "lodash-es/isNull"
import isUndefined from "lodash-es/isUndefined"

interface ZoningSectionProps {
	zoning: Zoning
}

export default function ZoningSection({ zoning }: ZoningSectionProps) {

	const hasNoZoningData = isNull(zoning.zoning_districts) || isUndefined(zoning.zoning_districts) || (
		zoning.zoning_districts.length === 0 &&
		zoning.commercial_overlays.length === 0 &&
		zoning.special_districts.length === 0 &&
		!zoning.limited_height_district
	)

	if (hasNoZoningData) {
		return (
			<div className="bg-white/80 backdrop-blur-sm border border-red-200/60 dark:bg-gray-900/80 dark:border-red-800/60 rounded-2xl p-6 mb-6 shadow-lg shadow-red-500/5 dark:shadow-red-500/10">
				<div className="flex items-center gap-3 mb-4">
					<div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-xl">
						<Map className="w-6 h-6 text-red-600 dark:text-red-400" />
					</div>
					<h3 className="text-xl font-semibold bg-gradient-to-r from-red-700 to-red-900 bg-clip-text text-transparent dark:from-red-100 dark:to-red-300">
						Zoning Information
					</h3>
				</div>
				<p className="text-sm text-gray-600 dark:text-gray-400">
					No zoning information available.
				</p>
			</div>
		)
	}

	return (
		<div className="bg-white/80 backdrop-blur-sm border border-orange-200/60 dark:bg-gray-900/80 dark:border-orange-800/60 rounded-2xl p-6 mb-6 shadow-xl shadow-orange-500/10 dark:shadow-orange-500/20">
			<div className="flex items-center gap-3 mb-6">
				<div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
					<Map className="w-6 h-6 text-orange-600 dark:text-orange-400" />
				</div>
				<h3 className="text-xl font-semibold bg-gradient-to-r from-orange-700 to-orange-900 bg-clip-text text-transparent dark:from-orange-100 dark:to-orange-300">
					Zoning Information
				</h3>
			</div>

			<div className="space-y-6">
				{zoning.zoning_districts.length > 0 && (
					<div className="flex items-start gap-4">
						<div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex-shrink-0">
							<Map className="w-5 h-5 text-orange-600 dark:text-orange-400" />
						</div>
						<div className="flex-1">
							<div className="text-sm font-semibold text-orange-700 dark:text-orange-300 mb-2">
								Zoning Districts
							</div>
							<div className="text-gray-900 dark:text-gray-100 font-medium">
								{zoning.zoning_districts.join(", ")}
							</div>
						</div>
					</div>
				)}

				{zoning.commercial_overlays.length > 0 && (
					<div className="flex items-start gap-4">
						<div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex-shrink-0">
							<Building2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
						</div>
						<div className="flex-1">
							<div className="text-sm font-semibold text-orange-700 dark:text-orange-300 mb-2">
								Commercial Overlays
							</div>
							<div className="text-gray-900 dark:text-gray-100 font-medium">
								{zoning.commercial_overlays.join(", ")}
							</div>
						</div>
					</div>
				)}

				{zoning.special_districts.length > 0 && (
					<div className="flex items-start gap-4">
						<div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex-shrink-0">
							<Hash className="w-5 h-5 text-orange-600 dark:text-orange-400" />
						</div>
						<div className="flex-1">
							<div className="text-sm font-semibold text-orange-700 dark:text-orange-300 mb-2">
								Special Districts
							</div>
							<div className="text-gray-900 dark:text-gray-100 font-medium">
								{zoning.special_districts.join(", ")}
							</div>
						</div>
					</div>
				)}

				{zoning.limited_height_district && (
					<div className="flex items-start gap-4">
						<div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex-shrink-0">
							<Building2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
						</div>
						<div className="flex-1">
							<div className="text-sm font-semibold text-orange-700 dark:text-orange-300 mb-2">
								Limited Height District
							</div>
							<div className="text-gray-900 dark:text-gray-100 font-medium">
								{zoning.limited_height_district}
							</div>
						</div>
					</div>
				)}

				{zoning.last_updated && (
					<div className="flex items-start gap-4">
						<div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex-shrink-0">
							<Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
						</div>
						<div className="flex-1">
							<div className="text-sm font-semibold text-orange-700 dark:text-orange-300 mb-2">
								Last Updated
							</div>
							<div className="text-gray-900 dark:text-gray-100 font-medium">
								{formatDate(zoning.last_updated)}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
