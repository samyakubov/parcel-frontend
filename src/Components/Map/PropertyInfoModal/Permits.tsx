import React, { useState } from "react"
import isEmpty from "lodash-es/isEmpty"
import { HardHat, ChevronDown, FileWarning } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { PERMIT_COLUMNS } from "../../../Constants/Constants"
import {observer} from "mobx-react"

interface PermitsProps {
	permits: PulledPermit[]
}

function Permits({ permits }: PermitsProps) {
	const [isExpanded, setIsExpanded] = useState(false)

	const transitionProps = {
		duration: 0.8,
		ease: [0.4, 0, 0.2, 1]
	}

	const toggleExpand = () => setIsExpanded(!isExpanded)

	if (isEmpty(permits)) {
		return (
			<motion.div className="bg-white/80 backdrop-blur-sm border border-indigo-200/60 dark:bg-gray-900/80 dark:border-indigo-800/60 rounded-2xl p-6 mb-6 shadow-lg shadow-indigo-500/5 dark:shadow-indigo-500/10">
				<div className="flex items-center gap-3 mb-4">
					<div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
						<FileWarning className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
					</div>
					<h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-700 to-indigo-900 bg-clip-text text-transparent dark:from-indigo-100 dark:to-indigo-300">
						No Permits found
					</h3>
				</div>
			</motion.div>
		)
	}

	return (
		<motion.div
			layout="preserve-aspect"
			transition={transitionProps}
			className="bg-white/80 backdrop-blur-sm border border-indigo-200/60 dark:bg-gray-900/80 dark:border-indigo-800/60 rounded-2xl p-6 mb-6 shadow-xl shadow-indigo-500/10 dark:shadow-indigo-500/20"
		>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={transitionProps}
			>
				<div
					className="flex items-center justify-between cursor-pointer group"
					onClick={toggleExpand}
				>
					<div className="flex items-center gap-3 mb-4">
						<div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
							<HardHat className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
						</div>
						<h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-700 to-indigo-900 bg-clip-text text-transparent dark:from-indigo-100 dark:to-indigo-300">
							Permits ({permits.length})
						</h3>
					</div>
					<motion.div
						initial={false}
						animate={{ rotate: isExpanded ? 180 : 0 }}
						transition={transitionProps}
						className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors"
					>
						<ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
					</motion.div>
				</div>

				<AnimatePresence>
					{isExpanded && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={transitionProps}
							className="overflow-hidden"
						>
							<div className="max-h-96 overflow-auto rounded-xl border border-indigo-200/40 dark:border-indigo-800/40 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
								<table className="w-full">
									<thead className="bg-gradient-to-r from-indigo-50 to-indigo-100/80 dark:from-indigo-900/30 dark:to-indigo-800/30 sticky top-0 backdrop-blur-sm">
										<tr>
											{PERMIT_COLUMNS.map((col) => (
												<th
													key={col}
													className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b border-indigo-200/40 dark:border-indigo-700/40"
												>
													{col}
												</th>
											))}
										</tr>
									</thead>
									<tbody className="divide-y divide-indigo-200/30 dark:divide-indigo-700/30">
										<AnimatePresence>
											{permits.map((permit, index) => (
												<motion.tr
													key={permit.job_filing_number}
													initial={{ opacity: 0, x: -20 }}
													animate={{ opacity: 1, x: 0 }}
													transition={{ delay: index * 0.05, ...transitionProps }}
													className="hover:bg-gradient-to-r hover:from-indigo-50/80 hover:to-transparent dark:hover:from-indigo-900/20 dark:hover:to-transparent transition-all duration-300"
												>
													<td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">
														{permit.job_filing_number}
													</td>
													<td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
														{permit.filing_reason}
													</td>
													<td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
														{permit.work_type}
													</td>
													<td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
														{permit.permittee_s_license_type}
													</td>
													<td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
														{permit.applicant_license_number}
													</td>
													<td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
														{permit.applicant_first_name}
													</td>
													<td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
														{permit.applicant_last_name}
													</td>
													<td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
														{permit.applicant_business_name}
													</td>
													<td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
														{permit.applicant_business_address}
													</td>
													<td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
														{permit.work_permit}
													</td>
													<td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
														{permit.approved_date}
													</td>
													<td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
														{permit.issued_date}
													</td>
													<td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
														{permit.job_description}
													</td>
													<td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
														{permit.estimated_job_costs}
													</td>
												</motion.tr>
											))}
										</AnimatePresence>
									</tbody>
								</table>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</motion.div>
	)
}

export default observer(Permits)
