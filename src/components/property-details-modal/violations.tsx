"use client"
import { useState } from "react"
import { isEmpty } from "lodash-es"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, AlertTriangle } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { VIOLATION_COLUMNS } from "@/constants/property"

interface ViolationsProps {
    violations: Violation[]
}

const getSeverityVariant = (severity: string): "default" | "secondary" | "destructive" => {
	switch (severity) {
	case "CLASS - 1":
		return "destructive"
	case "CLASS - 2":
		return "secondary"
	default:
		return "default"
	}
}

const getStatusVariant = (status: string): "default" | "secondary" => {
	return status === "RESOLVE" ? "secondary" : "default"
}

export default function Violations({ violations }: ViolationsProps) {
	const [isExpanded, setIsExpanded] = useState(false)

	if (isEmpty(violations)) {
		return (
			<Card className="border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
				<CardContent className="p-6">
					<motion.div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-900">
							<AlertTriangle className="h-6 w-6 text-slate-600 dark:text-slate-400" />
						</div>
						<h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                            No Violations found
						</h3>
					</motion.div>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950 mb-3">
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
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900
							transition-colors group-hover:bg-red-200 dark:group-hover:bg-red-800">
								<AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
							</div>
							<h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
                                Violations ({violations.length})
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
													{VIOLATION_COLUMNS.map((column) => (
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
													{violations.map((violation, index) => (
														<motion.tr
															key={index}
															initial={{ opacity: 0, x: -20 }}
															animate={{ opacity: 1, x: 0 }}
															transition={{ delay: index * 0.05 }}
															className="border-b transition-colors hover:bg-muted/50"
														>
															<TableCell className="py-3">
																<Badge variant={getStatusVariant(violation.violation_status)}>
																	{violation.violation_status}
																</Badge>
															</TableCell>
															<TableCell className="py-3 text-muted-foreground">
																{violation.issuedate}
															</TableCell>
															<TableCell className="py-3 text-muted-foreground">
																{violation.violationtype}
															</TableCell>
															<TableCell className="py-3 text-muted-foreground max-w-xs truncate">
																<span title={violation.description}>
																	{violation.description}
																</span>
															</TableCell>
															<TableCell className="py-3">
																<Badge variant={getSeverityVariant(violation.severity)}>
																	{violation.severity}
																</Badge>
															</TableCell>
															<TableCell className="py-3 text-muted-foreground">
																{violation.penalty_amount ?
																	`$${Number(violation.penalty_amount).toLocaleString()}` :
																	<span className="text-muted-foreground/50">—</span>
																}
															</TableCell>
															<TableCell className="py-3 text-muted-foreground">
																{violation.amountpaid ?
																	`$${Number(violation.amountpaid).toLocaleString()}` :
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
