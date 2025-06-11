import React, { useState } from "react"
import isEmpty from "lodash-es/isEmpty"
import { AlertTriangle, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {VIOLATION_COLUMNS} from "../../../Constants/Constants"

interface ViolationsProps {
	violations: Violation[];
}

const getSeverityClassName = (severity: string): string => {
	switch (severity) {
	case "CLASS - 1":
		return "bg-rose-50 text-rose-700 ring-1 ring-rose-600/20 dark:bg-rose-500/10 dark:text-rose-400 dark:ring-rose-400/30"
	case "CLASS - 2":
		return "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-400/30"
	default:
		return "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-400/30"
	}
}

export default function Violations({ violations }: ViolationsProps) {
	const [isExpanded, setIsExpanded] = useState(false)

	const transitionProps = {
		duration: 0.8,
		ease: [0.4, 0, 0.2, 1]
	}

	const toggleExpand = () => {
		setIsExpanded(!isExpanded)
	}

	if (isEmpty(violations)) {
		return (
			<motion.div
				className="bg-white/80 backdrop-blur-sm border border-emerald-200/60 dark:bg-gray-900/80 dark:border-emerald-800/60 rounded-2xl p-6 mb-6 shadow-lg shadow-emerald-500/5 dark:shadow-emerald-500/10"
			>
				<motion.div
					className="flex items-center justify-between"
				>
					<div className="flex items-center gap-3 mb-4">
						<div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
							<AlertTriangle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
						</div>
						<h3 className="text-xl font-semibold bg-gradient-to-r from-emerald-700 to-emerald-900 bg-clip-text text-transparent dark:from-emerald-100 dark:to-emerald-300">
							No Violations found
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
			className="bg-white/80 backdrop-blur-sm border border-rose-200/60 dark:bg-gray-900/80 dark:border-rose-800/60 rounded-2xl p-6 mb-6 shadow-xl shadow-rose-500/10 dark:shadow-rose-500/20"
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
						<div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
							<AlertTriangle className="w-6 h-6 text-rose-600 dark:text-rose-400" />
						</div>
						<h3 className="text-xl font-semibold bg-gradient-to-r from-rose-700 to-rose-900 bg-clip-text text-transparent dark:from-rose-100 dark:to-rose-300">
							Violations ({violations.length})
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
								<div className="max-h-96 overflow-auto rounded-xl border border-rose-200/40 dark:border-rose-800/40 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
									<table className="w-full">
										<thead className="bg-gradient-to-r from-rose-50 to-rose-100/80 dark:from-rose-900/30 dark:to-rose-800/30 sticky top-0 backdrop-blur-sm">
											<tr>
												{
													VIOLATION_COLUMNS.map((item) => (
														<th key={item} className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider border-b border-rose-200/40 dark:border-rose-700/40">{item}</th>
													))
												}
											</tr>
										</thead>
										<tbody className="divide-y divide-rose-200/30 dark:divide-rose-700/30">
											<AnimatePresence>
												{violations.map((violation, index) => (
													<motion.tr
														key={index}
														initial={{ opacity: 0, x: -20 }}
														animate={{ opacity: 1, x: 0 }}
														transition={{ delay: index * 0.1, ...transitionProps }}
														className="hover:bg-gradient-to-r hover:from-rose-50/80 hover:to-transparent dark:hover:from-rose-900/20 dark:hover:to-transparent transition-all duration-300"
													>
														<td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">
															<span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${violation.violation_status === "RESOLVE"
																? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-400/30"
																: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-400/30"}`}
															>
																{violation.violation_status}
															</span>
														</td>
														<td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap">{violation.issuedate}</td>
														<td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">{violation.violationtype}</td>
														<td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200">{violation.description}</td>
														<td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
															<span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getSeverityClassName(violation.severity)}`}>
																{violation.severity}
															</span>
														</td>
														<td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200 whitespace-nowrap">
															{typeof violation.penalty_amount === "number" ? `$${violation.penalty_amount.toFixed(2)}` : <span className="text-gray-400 dark:text-gray-500">—</span>}
														</td>
														<td className="px-6 py-4 text-sm whitespace-nowrap">
															{typeof violation.amountpaid === "number" ? (
																<span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
																	violation.amountpaid >= (violation.penalty_amount || 0)
																		? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-400/30"
																		: "bg-rose-50 text-rose-700 ring-1 ring-rose-600/20 dark:bg-rose-500/10 dark:text-rose-400 dark:ring-rose-400/30"
																}`}>${violation.amountpaid.toFixed(2)}
																</span>
															) : (
																<span className="text-gray-400 dark:text-gray-500">—</span>
															)}
														</td>
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
