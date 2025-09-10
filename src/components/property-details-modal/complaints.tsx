"use client"
import React, { useState } from "react"
import isEmpty from "lodash-es/isEmpty"
import { AlertCircle, ChevronDown, CircleAlert } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { COMPLAINT_COLUMNS } from "@/constants/property"

interface ComplaintsProps {
    complaints: Complaint[];
}

const getStatusVariant = (status: string) => {
	switch (status) {
	case "CLOSED":
		return "secondary" as const
	case "OPEN":
		return "destructive" as const
	default:
		return "outline" as const
	}
}

export default function Complaints({ complaints }: ComplaintsProps) {
	const [isExpanded, setIsExpanded] = useState(false)

	if (isEmpty(complaints)) {
		return (
			<Card className="border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950">
				<CardContent className="p-6">
					<motion.div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
							<CircleAlert className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
						</div>
						<h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200">
                            No Complaints found
						</h3>
					</motion.div>
				</CardContent>
			</Card>
		)
	}

	return (
		<Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950 mb-3">
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
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900 t
							ransition-colors group-hover:bg-amber-200 dark:group-hover:bg-amber-800">
								<AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
							</div>
							<h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200">
                                Complaints ({complaints.length})
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
													{COMPLAINT_COLUMNS.map((column) => (
														<TableHead
															key={column}
															className="font-semibold text-foreground"
														>
															{column}
														</TableHead>
													))}
												</TableRow>
											</TableHeader>
											<TableBody>
												<AnimatePresence>
													{complaints.map((complaint, index) => (
														<motion.tr
															key={`${complaint.date_entered}-${index}`}
															initial={{ opacity: 0, x: -20 }}
															animate={{ opacity: 1, x: 0 }}
															transition={{ delay: index * 0.05 }}
															className="border-b transition-colors hover:bg-muted/50"
														>
															<TableCell className="py-3">
																<Badge variant={getStatusVariant(complaint.status)}>
																	{complaint.status}
																</Badge>
															</TableCell>
															<TableCell className="py-3 font-medium">
																{complaint.date_entered}
															</TableCell>
															<TableCell className="py-3 text-muted-foreground">
																{complaint.complaint_category}
															</TableCell>
															<TableCell className="py-3 text-muted-foreground">
																{complaint.unit}
															</TableCell>
															<TableCell className="py-3 text-muted-foreground">
																{complaint.disposition_date || (
																	<span className="text-muted-foreground/50">—</span>
																)}
															</TableCell>
															<TableCell className="py-3 text-muted-foreground">
																{complaint.disposition_code || (
																	<span className="text-muted-foreground/50">—</span>
																)}
															</TableCell>
															<TableCell className="py-3 text-muted-foreground">
																{complaint.inspection_date || (
																	<span className="text-muted-foreground/50">—</span>
																)}
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
