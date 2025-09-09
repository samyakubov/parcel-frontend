"use client"
import { useState } from "react"
import { isEmpty } from "lodash-es"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, FileWarning, HardHat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { PERMIT_COLUMNS } from "@/constants/property"

interface PermitsProps {
    permits: PulledPermit[]
}

export default function Permits({ permits }: PermitsProps) {
	const [isExpanded, setIsExpanded] = useState(false)

	if (isEmpty(permits)) {
		return (
			<Card className="border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
				<CardContent className="p-6">
					<motion.div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-900">
							<FileWarning className="h-6 w-6 text-slate-600 dark:text-slate-400" />
						</div>
						<h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                            No Permits found
						</h3>
					</motion.div>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950 mb-3">
			<CardContent className="p-2">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<Button
						variant="ghost"
						className="w-full justify-between p-0 h-auto hover:bg-transparent"
						onClick={() => setIsExpanded(!isExpanded)}
					>
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900
							 transition-colors group-hover:bg-green-200 dark:group-hover:bg-green-800">
								<HardHat className="h-6 w-6 text-green-600 dark:text-green-400" />
							</div>
							<h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                                Permits ({permits.length})
							</h3>
						</div>
						<motion.div
							initial={false}
							animate={{ rotate: isExpanded ? 180 : 0 }}
							transition={{ duration: 0.2 }}
						>
							<ChevronDown className="h-5 w-5 text-muted-foreground" />
						</motion.div>
					</Button>

					<AnimatePresence>
						{isExpanded && (
							<motion.div
								initial={{ height: 0, opacity: 0 }}
								animate={{ height: "auto", opacity: 1 }}
								exit={{ height: 0, opacity: 0 }}
								transition={{ duration: 0.3 }}
								className="overflow-hidden"
							>
								<Card className="mt-4 border-border">
									<ScrollArea className="h-96">
										<Table>
											<TableHeader>
												<TableRow className="hover:bg-transparent">
													{PERMIT_COLUMNS.map((column) => (
														<TableHead
															key={column}
															className="font-semibold text-foreground whitespace-nowrap"
														>
															{column}
														</TableHead>
													))}
												</TableRow>
											</TableHeader>
											<TableBody>
												<AnimatePresence>
													{permits.map((permit, index) => (
														<motion.tr
															key={permit.job_filing_number}
															initial={{ opacity: 0, x: -20 }}
															animate={{ opacity: 1, x: 0 }}
															transition={{ delay: index * 0.05 }}
															className="border-b transition-colors hover:bg-muted/50"
														>
															<TableCell className="py-3 font-medium">
																{permit.job_filing_number}
															</TableCell>
															<TableCell className="py-3 text-muted-foreground">
																{permit.filing_reason}
															</TableCell>
															<TableCell className="py-3 text-muted-foreground">
																{permit.work_type}
															</TableCell>
															<TableCell className="py-3 text-muted-foreground">
																{permit.permittee_s_license_type}
															</TableCell>
															<TableCell className="py-3 text-muted-foreground">
																{permit.applicant_license_number}
															</TableCell>
															<TableCell className="py-3 text-muted-foreground">
																{permit.applicant_first_name}
															</TableCell>
															<TableCell className="py-3 text-muted-foreground">
																{permit.applicant_last_name}
															</TableCell>
															<TableCell className="py-3 text-muted-foreground">
																{permit.applicant_business_name || (
																	<span className="text-muted-foreground/50">—</span>
																)}
															</TableCell>
															<TableCell className="py-3 text-muted-foreground">
																{permit.applicant_business_address || (
																	<span className="text-muted-foreground/50">—</span>
																)}
															</TableCell>
															<TableCell className="py-3 text-muted-foreground">
																{permit.work_permit}
															</TableCell>
															<TableCell className="py-3 text-muted-foreground">
																{permit.approved_date || (
																	<span className="text-muted-foreground/50">—</span>
																)}
															</TableCell>
															<TableCell className="py-3 text-muted-foreground">
																{permit.issued_date || (
																	<span className="text-muted-foreground/50">—</span>
																)}
															</TableCell>
															<TableCell className="py-3 text-muted-foreground max-w-xs truncate">
																<span title={permit.job_description}>
																	{permit.job_description}
																</span>
															</TableCell>
															<TableCell className="py-3 text-muted-foreground">
																{permit.estimated_job_costs ?
																	`$${Number(permit.estimated_job_costs).toLocaleString()}` :
																	<span className="text-muted-foreground/50">—</span>
																}
															</TableCell>
														</motion.tr>
													))}
												</AnimatePresence>
											</TableBody>
										</Table>
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
