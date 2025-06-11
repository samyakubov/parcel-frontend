import isNull from "lodash-es/isNull"
import isEmpty from "lodash-es/isEmpty"
import isArray from "lodash-es/isArray"
import isUndefined from "lodash-es/isUndefined"
import React, { useState, useMemo } from "react"
import { Users, Loader2, Search } from "lucide-react"
import { motion } from "framer-motion"
import useSearchAllPropertiesToOwner from "../../../Hooks/Search/useSearchAllPropertiesToOwner"
import { useSearchContext } from "../../../Contexts/SearchContext"
import { observer } from "mobx-react"
import { useMapContext } from "../../../Contexts/MapContext"
import { NormalizeStreetName } from "../../../Utils/NormalizeStreetName"

interface OwnerProps {
	owners: string[] | string;
}

// eslint-disable-next-line complexity
function Owners(props: OwnerProps) {
	const { owners } = props
	const [loadingOwner, setLoadingOwner] = useState<string | null>(null)
	const [searchTerm, setSearchTerm] = useState<string>("")
	const searchContext = useSearchContext()
	const mapContext = useMapContext()
	const searchAllProperties = useSearchAllPropertiesToOwner()
	const address = `${searchContext.propertyResults.records[0]?.prop_streetnumber || ""} ${NormalizeStreetName(searchContext.propertyResults.records[0]?.prop_streetname) || ""}`.trim() || "Address not found"

	const handleSearch = async (owner: string) => {
		setLoadingOwner(owner)
		mapContext.setIsRelatedPropertiesLoading(true)
		await searchAllProperties(address, owner)
		mapContext.setIsRelatedPropertiesLoading(false)
		setLoadingOwner(null)
		mapContext.setIsRelatedPropertySummaryModalOpen(true)
	}

	const filteredOwners = useMemo(() => {
		if (!isArray(owners)) return []

		if (!searchTerm.trim()) return owners

		return owners.filter(owner =>
			owner.toLowerCase().includes(searchTerm.toLowerCase())
		)
	}, [owners, searchTerm])

	const sortedOwners = useMemo(() => {
		return filteredOwners.slice().sort((a, b) => a.localeCompare(b))
	}, [filteredOwners])

	if (isNull(owners) || isEmpty(owners) || isUndefined(owners)) {
		return (
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className="bg-white/80 backdrop-blur-sm border border-rose-200/60 dark:bg-gray-900/80 dark:border-rose-800/60 rounded-2xl p-6 mb-6 shadow-lg shadow-rose-500/5 dark:shadow-rose-500/10"
			>
				<div className="flex items-center gap-3 mb-4">
					<div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-xl">
						<Users className="w-6 h-6 text-rose-600 dark:text-rose-400" />
					</div>
					<h3 className="text-xl font-semibold bg-gradient-to-r from-rose-700 to-rose-900 bg-clip-text text-transparent dark:from-rose-100 dark:to-rose-300">
						Owners
					</h3>
				</div>
				<p className="text-sm text-gray-600 dark:text-gray-400">No owners found.</p>
			</motion.div>
		)
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			className="bg-white/80 backdrop-blur-sm border border-violet-200/60 dark:bg-gray-900/80 dark:border-violet-800/60 rounded-2xl p-6 mb-6 shadow-xl shadow-violet-500/10 dark:shadow-violet-500/20"
		>
			<div className="flex items-center gap-3 mb-4">
				<div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-xl">
					<Users className="w-6 h-6 text-violet-600 dark:text-violet-400"/>
				</div>
				<h3 className="text-xl font-semibold bg-gradient-to-r from-violet-700 to-violet-900 bg-clip-text text-transparent dark:from-violet-100 dark:to-violet-300">
					Owners
				</h3>
			</div>
			<p className="text-sm text-gray-500 dark:text-gray-400 mb-4 italic bg-violet-50/50 dark:bg-violet-900/10 rounded-lg px-3 py-2 border border-violet-200/30 dark:border-violet-700/30">
				Press on an owner to find related properties
			</p>

			<div className="relative mb-4">
				<div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
					<Search className="w-5 h-5 text-gray-400 dark:text-gray-500" />
				</div>
				<input
					type="text"
					className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-violet-200/50 dark:border-violet-700/50 text-gray-900 dark:text-gray-100 text-sm rounded-xl focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 block w-full pl-12 pr-4 py-3 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300"
					placeholder="Search owners..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>

			{sortedOwners.length > 0 ? (
				<div className="max-h-60 overflow-y-auto rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-violet-200/30 dark:border-violet-700/30">
					<ul className="divide-y divide-violet-200/20 dark:divide-violet-700/20">
						{sortedOwners.map((owner, index) => (
							<li
								key={index}
								className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gradient-to-r hover:from-violet-50/80 hover:to-transparent dark:hover:from-violet-900/20 dark:hover:to-transparent transition-all duration-300 cursor-pointer flex items-center justify-between group"
								onClick={() => handleSearch(owner)}
							>
								<span className="group-hover:text-violet-700 dark:group-hover:text-violet-300 font-medium transition-colors">
									{owner}
								</span>
								{loadingOwner === owner && (
									<Loader2 className="w-4 h-4 animate-spin text-violet-600 dark:text-violet-400" />
								)}
							</li>
						))}
					</ul>
				</div>
			) : (
				<div className="text-center py-8">
					<div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl w-fit mx-auto mb-3">
						<Search className="w-6 h-6 text-gray-400" />
					</div>
					<p className="text-sm text-gray-500 dark:text-gray-400">No matching owners found.</p>
				</div>
			)}
		</motion.div>
	)
}

export default observer(Owners)
