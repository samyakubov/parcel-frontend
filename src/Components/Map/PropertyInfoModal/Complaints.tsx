import React, { useState } from "react"
import isEmpty from "lodash-es/isEmpty"
import {AlertCircle, ChevronDown, CircleAlert} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {COMPLAINT_COLUMNS} from "../../../Constants/Constants"

interface ComplaintsProps {
	complaints: Complaint[];
}

const getStatusClassName = (status: string): string => {
	switch (status) {
	case "CLOSED":
		return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-400/30"
	case "OPEN":
		return "bg-rose-50 text-rose-700 ring-1 ring-rose-600/20 dark:bg-rose-500/10 dark:text-rose-400 dark:ring-rose-400/30"
	default:
		return "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-400/30"
	}
}

export default function Complaints({ complaints }: ComplaintsProps) {
	const [isExpanded, setIsExpanded] = useState(false)

	const transitionProps = {
		duration: 0.8,
		ease: [0.4, 0, 0.2, 1]
	}

	const toggleExpand = () => {
		setIsExpanded(!isExpanded)
	}

	if (isEmpty(complaints)) {
		return (
			<motion.div
				className="bg-white/80 backdrop-blur-sm border border-emerald-200/60 dark:bg-gray-900/80 dark:border-emerald-800/60 rounded-2xl p-6 mb-6 shadow-lg shadow-emerald-500/5 dark:shadow-emerald-500/10"
			>
				<motion.div
					className="flex items-center justify-between"
				>
					<div className="flex items-center gap-3 mb-4">
						<div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
							<CircleAlert className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
						</div>
						<h3 className="text-xl font-semibold bg-gradient-to-r from-emerald-700 to-emerald-900 bg-clip-text text-transparent dark:from-emerald-100 dark:to-emerald-300">
							No Complaints found
						</h3>
					</div>
				</motion.div>
			</motion.div>
		)
	}

	return (
		<motion.div
			layout="preserve-aspect"
			transition={transitionProps}
			className="bg-white/80 backdrop-blur-sm border border-amber-200/60 dark:bg-gray-900/80 dark:border-amber-800/60 rounded-2xl p-6 mb-6 shadow-xl shadow-amber-500/10 dark:shadow-amber-500/20"
		>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={transitionProps}
			>
				<motion.div
					className="flex items-center justify-between cursor-pointer group"
					onClick={toggleExpand}
				>
					<div className="flex items-center gap-3 mb-4">
						<div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
							<AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
						</div>
						<h3 className="text-xl font-semibold bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent dark:from-amber-100 dark:to-amber-300">
							Complaints ({complaints.length})
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
				</motion.div>

				<AnimatePresence>
					{isExpanded && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={transitionProps}
							className="overflow-hidden"
						>
							<div>
								<div className="max-h-96 overflow-auto rounded-xl border border-amber-200/40 dark:border-amber-800/40 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
									<table className="w-full">
										<thead className="bg-gradient-to-r from-amber-50 to-amber-100/80 dark:from-amber-900/30 dark:to-amber-800/30 sticky top-0 backdrop-blur-sm">
											<tr>
												{
													COMPLAINT_COLUMNS.map((item) => (
														<th key={item} className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b border-amber-200/40 dark:border-amber-700/40">{item}</th>
													))
												}
											</tr>
										</thead>
										<tbody className="divide-y divide-amber-200/30 dark:divide-amber-700/30">
											<AnimatePresence>
												{complaints.map((complaint, index) => (
													<motion.tr
														key={index}
														initial={{ opacity: 0, x: -20 }}
														animate={{ opacity: 1, x: 0 }}
														transition={{ delay: index * 0.1, ...transitionProps }}
														className="hover:bg-gradient-to-r hover:from-amber-50/80 hover:to-transparent dark:hover:from-amber-900/20 dark:hover:to-transparent transition-all duration-300"
													>
														<td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">
															<span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusClassName(complaint.status)}`}>
																{complaint.status}
															</span>
														</td>
														<td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">{complaint.date_entered}</td>
														<td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">{complaint.complaint_category}</td>
														<td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">{complaint.unit}</td>
														<td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">{complaint.disposition_date || <span className="text-gray-400 dark:text-gray-500">—</span>}</td>
														<td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">{complaint.disposition_code || <span className="text-gray-400 dark:text-gray-500">—</span>}</td>
														<td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">{complaint.inspection_date || <span className="text-gray-400 dark:text-gray-500">—</span>}</td>
													</motion.tr>
												))}
											</AnimatePresence>
										</tbody>
									</table>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</motion.div>
	)
}
