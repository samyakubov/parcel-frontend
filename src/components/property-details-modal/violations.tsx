import React, { useState } from "react"
import isEmpty from "lodash-es/isEmpty"
import { AlertTriangle, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {VIOLATION_COLUMNS} from "@/constants/property"

interface ViolationsProps {
    violations: Violation[];
}

const getSeverityClassName = (severity: string): string => {
	switch (severity) {
	case "CLASS - 1":
		return "violations-severity-class1"
	case "CLASS - 2":
		return "violations-severity-class2"
	default:
		return "violations-severity-default"
	}
}

export default function Violations({ violations }: ViolationsProps) {
	const [isExpanded, setIsExpanded] = useState(false)

	if (isEmpty(violations)) {
		return (
			<motion.div className="violations-container-empty">
				<motion.div className="flex items-center justify-between">
					<div className="violations-header-content">
						<div className="violations-icon-container-empty">
							<AlertTriangle className="violations-icon-empty" />
						</div>
						<h3 className="violations-title-empty">
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
			className="violations-container"
		>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
			>
				<motion.div
					className="violations-header"
					onClick={() => setIsExpanded(!isExpanded)}
				>
					<div className="violations-header-content">
						<div className="violations-icon-container">
							<AlertTriangle className="violations-icon" />
						</div>
						<h3 className="violations-title">
                            Violations ({violations.length})
						</h3>
					</div>
					<motion.div
						initial={false}
						animate={{ rotate: isExpanded ? 180 : 0 }}
						className="violations-expand-button"
					>
						<ChevronDown className="violations-expand-icon" />
					</motion.div>
				</motion.div>

				<AnimatePresence>
					{isExpanded && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							className="violations-content"
						>
							<div>
								<div className="violations-table-container">
									<table className="violations-table">
										<thead className="violations-table-header">
											<tr>
												{
													VIOLATION_COLUMNS.map((item) => (
														<th key={item} className="violations-table-header-cell">{item}</th>
													))
												}
											</tr>
										</thead>
										<tbody className="violations-table-body">
											<AnimatePresence>
												{violations.map((violation, index) => (
													<motion.tr
														key={index}
														initial={{ opacity: 0, x: -20 }}
														animate={{ opacity: 1, x: 0 }}
														transition={{ delay: index * 0.1 }}
														className="violations-table-row"
													>
														<td className="violations-table-cell">
															<span className={violation.violation_status === "RESOLVE" ? "violations-status-resolved" : "violations-status-pending"}>
																{violation.violation_status}
															</span>
														</td>
														<td className="violations-table-cell-medium">{violation.issuedate}</td>
														<td className="violations-table-cell-gray">{violation.violationtype}</td>
														<td className="violations-table-cell-description">{violation.description}</td>
														<td className="violations-table-cell-gray">
															<span className={getSeverityClassName(violation.severity)}>
																{violation.severity}
															</span>
														</td>
														<td className="violations-table-cell-gray">
															{typeof violation.penalty_amount === "number" ? `$${violation.penalty_amount.toFixed(2)}` : <span className="violations-placeholder">—</span>}
														</td>
														<td className="violations-table-cell">
															{typeof violation.amountpaid === "number" ? (
																<span className={
																	violation.amountpaid >= (violation.penalty_amount || 0)
																		? "violations-payment-paid"
																		: "violations-payment-unpaid"
																}>${violation.amountpaid.toFixed(2)}
																</span>
															) : (
																<span className="violations-placeholder">—</span>
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
