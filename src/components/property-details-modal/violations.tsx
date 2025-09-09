import React, { useState } from "react"
import isEmpty from "lodash-es/isEmpty"
import { AlertTriangle, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { VIOLATION_COLUMNS } from "@/constants/property"

interface ViolationsProps {
    violations: Violation[];
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

const getPaymentVariant = (amountPaid: number, penaltyAmount: number): "default" | "secondary" => {
	return amountPaid >= penaltyAmount ? "secondary" : "default"
}

export default function Violations({ violations }: ViolationsProps) {
	const [isExpanded, setIsExpanded] = useState(false)

	if (isEmpty(violations)) {
		return (
			<Card className="w-full">
				<CardHeader>
					<div className="flex items-center gap-2">
						<div className="p-2 rounded-full bg-muted">
							<AlertTriangle className="h-4 w-4 text-muted-foreground" />
						</div>
						<h3 className="text-lg font-semibold text-muted-foreground">
                            No Violations Found
						</h3>
					</div>
				</CardHeader>
				<CardContent>
					<Alert>
						<AlertDescription>
                            This property has no recorded violations.
						</AlertDescription>
					</Alert>
				</CardContent>
			</Card>
		)
	}

	return (
		<motion.div
			layout="preserve-aspect"
			className="w-full"
		>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
			>
				<Card>
					<CardContent className="p-0">
						<Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
							<CollapsibleTrigger asChild>
								<Button variant="ghost" className="w-full justify-between p-3 h-auto rounded-none">
									<div className="flex items-center gap-2">
										<div className="p-2 rounded-full bg-destructive/10">
											<AlertTriangle className="h-4 w-4 text-destructive" />
										</div>
										<h3 className="text-lg font-semibold">
                                            Violations
										</h3>
										<Badge variant="destructive" className="ml-2">
											{violations.length}
										</Badge>
									</div>
									<motion.div
										initial={false}
										animate={{ rotate: isExpanded ? 180 : 0 }}
										transition={{ duration: 0.2 }}
									>
										<ChevronDown className="h-4 w-4" />
									</motion.div>
								</Button>
							</CollapsibleTrigger>

							<CollapsibleContent>
								<AnimatePresence>
									{isExpanded && (
										<motion.div
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											className="border-t"
										>
											<div className="overflow-x-auto">
												<Table>
													<TableHeader>
														<TableRow>
															{VIOLATION_COLUMNS.map((column) => (
																<TableHead key={column} className="font-semibold">
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
																	transition={{ delay: index * 0.1 }}
																	className="border-b hover:bg-muted/50"
																>
																	<TableCell>
																		<Badge variant={getStatusVariant(violation.violation_status)}>
																			{violation.violation_status}
																		</Badge>
																	</TableCell>
																	<TableCell className="font-mono text-sm">
																		{violation.issuedate}
																	</TableCell>
																	<TableCell className="text-sm">
																		{violation.violationtype}
																	</TableCell>
																	<TableCell className="max-w-md">
																		<div className="truncate text-sm" title={violation.description}>
																			{violation.description}
																		</div>
																	</TableCell>
																	<TableCell>
																		<Badge variant={getSeverityVariant(violation.severity)}>
																			{violation.severity}
																		</Badge>
																	</TableCell>
																	<TableCell className="font-mono text-sm">
																		{typeof violation.penalty_amount === "number"
																			? `$${violation.penalty_amount.toFixed(2)}`
																			: <span className="text-muted-foreground">—</span>
																		}
																	</TableCell>
																	<TableCell className="font-mono text-sm">
																		{typeof violation.amountpaid === "number" ? (
																			<Badge
																				variant={getPaymentVariant(violation.amountpaid, violation.penalty_amount || 0)}
																			>
                                                                                ${violation.amountpaid.toFixed(2)}
																			</Badge>
																		) : (
																			<span className="text-muted-foreground">—</span>
																		)}
																	</TableCell>
																</motion.tr>
															))}
														</AnimatePresence>
													</TableBody>
												</Table>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</CollapsibleContent>
						</Collapsible>
					</CardContent>
				</Card>
			</motion.div>
		</motion.div>
	)
}
