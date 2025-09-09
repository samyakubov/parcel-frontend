"use client"
import {useState} from "react"
import {isEmpty} from "lodash-es"
import {Card, CardContent} from "@/components/ui/card"
import {ChevronDown, FileWarning, HardHat} from "lucide-react"
import {Button} from "@/components/ui/button"
import {AnimatePresence, motion} from "framer-motion"
import {ScrollArea} from "@/components/ui/scroll-area"
import {PERMIT_COLUMNS} from "@/constants/property"

interface PermitsProps {
    permits: PulledPermit[]
}

export default function Permits({ permits }: PermitsProps) {
	const [isExpanded, setIsExpanded] = useState(false)

	if (isEmpty(permits)) {
		return (
			<Card className="permits-card permits-card--empty">
				<CardContent className="permits-card-content">
					<motion.div className="permits-empty-header">
						<div className="permits-empty-icon">
							<FileWarning className="permits-empty-icon-svg" />
						</div>
						<h3 className="permits-empty-title">
                            No Permits found
						</h3>
					</motion.div>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card className="permits-card permits-card--success">
			<CardContent className="permits-card-content">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<Button
						variant="ghost"
						className="permits-expand-btn"
						onClick={() => setIsExpanded(!isExpanded)}
					>
						<div className="permits-expand-btn-content">
							<div className="permits-expand-icon">
								<HardHat className="permits-expand-icon-svg" />
							</div>
							<h3 className="permits-title">
                                Permits ({permits.length})
							</h3>
						</div>
						<motion.div
							initial={false}
							animate={{ rotate: isExpanded ? 180 : 0 }}
							className="permits-chevron-wrapper"
						>
							<ChevronDown className="permits-chevron" />
						</motion.div>
					</Button>

					<AnimatePresence>
						{isExpanded && (
							<motion.div
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: "auto", opacity: 1 }}
								exit={{ height: 0, opacity: 0 }}
								className="permits-expanded-content"
							>
								<Card className="permits-table-card">
									<ScrollArea className="permits-scroll-area">
										<table className="permits-table">
											<thead className="permits-table-header">
												<tr className="permits-table-header-row">
													{PERMIT_COLUMNS.map((col) => (
														<th
															key={col}
															className="permits-table-header-cell"
														>
															{col}
														</th>
													))}
												</tr>
											</thead>
											<tbody className="permits-table-body">
												<AnimatePresence>
													{permits.map((permit, index) => (
														<motion.tr
															key={permit.job_filing_number}
															initial={{ opacity: 0, x: -20 }}
															animate={{ opacity: 1, x: 0 }}
															transition={{ delay: index * 0.05 }}
															className="permits-table-row"
														>
															<td className="permits-table-cell permits-table-cell--primary">
																{permit.job_filing_number}
															</td>
															<td className="permits-table-cell permits-table-cell--secondary">
																{permit.filing_reason}
															</td>
															<td className="permits-table-cell permits-table-cell--secondary">
																{permit.work_type}
															</td>
															<td className="permits-table-cell permits-table-cell--secondary">
																{permit.permittee_s_license_type}
															</td>
															<td className="permits-table-cell permits-table-cell--secondary">
																{permit.applicant_license_number}
															</td>
															<td className="permits-table-cell permits-table-cell--secondary">
																{permit.applicant_first_name}
															</td>
															<td className="permits-table-cell permits-table-cell--secondary">
																{permit.applicant_last_name}
															</td>
															<td className="permits-table-cell permits-table-cell--secondary">
																{permit.applicant_business_name}
															</td>
															<td className="permits-table-cell permits-table-cell--secondary">
																{permit.applicant_business_address}
															</td>
															<td className="permits-table-cell permits-table-cell--secondary">
																{permit.work_permit}
															</td>
															<td className="permits-table-cell permits-table-cell--secondary">
																{permit.approved_date}
															</td>
															<td className="permits-table-cell permits-table-cell--secondary">
																{permit.issued_date}
															</td>
															<td className="permits-table-cell permits-table-cell--secondary">
																{permit.job_description}
															</td>
															<td className="permits-table-cell permits-table-cell--secondary">
																{permit.estimated_job_costs}
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
