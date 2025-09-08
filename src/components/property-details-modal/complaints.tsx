"use client"
import React, { useState } from "react"
import isEmpty from "lodash-es/isEmpty"
import {AlertCircle, Badge, ChevronDown, CircleAlert} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {Button} from "@/components/ui/button"
import { Card ,CardContent} from "@/components/ui/card"
import {COMPLAINT_COLUMNS} from "@/constants/property"
import {ScrollArea} from "@/components/ui/scroll-area"

interface ComplaintsProps {
    complaints: Complaint[];
}

const getStatusClassName = (status: string): string => {
	switch (status) {
	case "CLOSED":
		return "status-badge--closed"
	case "OPEN":
		return "status-badge--open"
	default:
		return "status-badge--default"
	}
}

export default function Complaints({ complaints }: ComplaintsProps) {
	const [isExpanded, setIsExpanded] = useState(false)

	if (isEmpty(complaints)) {
		return (
			<Card className="complaints-card complaints-card--success">
				<CardContent className="p-6">
					<motion.div className="complaints-header">
						<div className="complaints-icon complaints-icon--success">
							<CircleAlert className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
						</div>
						<h3 className="complaints-title complaints-title--success">
                            No Complaints found
						</h3>
					</motion.div>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card className="complaints-card complaints-card--warning">
			<CardContent className="p-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<Button
						variant="ghost"
						className="complaints-expand-btn"
						onClick={() => setIsExpanded(!isExpanded)}
					>
						<div className="complaints-header">
							<div className="complaints-icon complaints-icon--warning complaints-icon--hover">
								<AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
							</div>
							<h3 className="complaints-title complaints-title--warning">
                                Complaints ({complaints.length})
							</h3>
						</div>
						<motion.div
							initial={false}
							animate={{ rotate: isExpanded ? 180 : 0 }}
							className="complaints-chevron"
						>
							<ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
						</motion.div>
					</Button>

					<AnimatePresence>
						{isExpanded && (
							<motion.div
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: "auto", opacity: 1 }}
								exit={{ height: 0, opacity: 0 }}
								className="overflow-hidden"
							>
								<Card className="complaints-table-container">
									<ScrollArea className="h-96">
										<table className="w-full">
											<thead className="complaints-table-header">
												<tr className="complaints-table-header-row">
													{COMPLAINT_COLUMNS.map((item) => (
														<th
															key={item}
															className="complaints-table-header-cell"
														>
															{item}
														</th>
													))}
												</tr>
											</thead>
											<tbody className="complaints-table-body">
												<AnimatePresence>
													{complaints.map((complaint, index) => (
														<motion.tr
															key={index}
															initial={{ opacity: 0, x: -20 }}
															animate={{ opacity: 1, x: 0 }}
															className="complaints-table-row"
														>
															<td className="complaints-table-cell">
																<Badge
																	className={getStatusClassName(complaint.status)}
																>
																	{complaint.status}
																</Badge>
															</td>
															<td className="complaints-table-cell complaints-table-cell--primary">
																{complaint.date_entered}
															</td>
															<td className="complaints-table-cell complaints-table-cell--secondary">
																{complaint.complaint_category}
															</td>
															<td className="complaints-table-cell complaints-table-cell--secondary">
																{complaint.unit}
															</td>
															<td className="complaints-table-cell complaints-table-cell--secondary">
																{complaint.disposition_date || (
																	<span className="complaints-table-cell--empty">—</span>
																)}
															</td>
															<td className="complaints-table-cell complaints-table-cell--secondary">
																{complaint.disposition_code || (
																	<span className="complaints-table-cell--empty">—</span>
																)}
															</td>
															<td className="complaints-table-cell complaints-table-cell--secondary">
																{complaint.inspection_date || (
																	<span className="complaints-table-cell--empty">—</span>
																)}
															</td>
														</motion.tr>
													))}
												</AnimatePresence>
											</tbody>
										</table>
									</ScrollArea>
								</Card>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			</CardContent>
		</Card>
	)
}
