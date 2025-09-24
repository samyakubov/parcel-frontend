"use client"
import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Card } from "@/components/ui/card"
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

interface ViolationsTableProps {
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

export default function ViolationsTable ({ violations }: ViolationsTableProps) {
	return (
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
											<Badge variant={violation.violation_status === "RESOLVE"
												? "secondary" : "default"}>
												{violation.violation_status}
											</Badge>
										</TableCell>
										<TableCell className="py-3 text-muted-foreground">
											{violation.issue_date}
										</TableCell>
										<TableCell className="py-3 text-muted-foreground">
											{violation.violation_type}
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
											{violation.amount_paid ?
												`$${Number(violation.amount_paid).toLocaleString()}` :
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
	)
}
