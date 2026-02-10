"use client"
import React from "react"
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

export default function ViolationsTable({ violations }: ViolationsTableProps) {
	return (
		<div className="overflow-hidden">
			<div className="mt-2 border-t border-border/50">
				<ScrollArea className="h-60">
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								{VIOLATION_COLUMNS.map((column) => (
									<TableHead
										key={column}
										className="font-semibold text-foreground whitespace-nowrap text-xs h-8"
									>
										{column}
									</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{violations.map((violation, index) => (
								<tr
									key={index}
									className="border-b transition-colors hover:bg-muted/50"
								>
									<TableCell className="py-2">
										<Badge variant={violation.violation_status === "RESOLVE"
											? "secondary" : "default"} className="text-[10px] px-1.5 h-5">
											{violation.violation_status}
										</Badge>
									</TableCell>
									<TableCell className="py-2 text-muted-foreground text-xs">
										{violation.issue_date}
									</TableCell>
									<TableCell className="py-2 text-muted-foreground text-xs">
										{violation.violation_type}
									</TableCell>
									<TableCell className="py-2 text-muted-foreground max-w-xs truncate text-xs">
										<span title={violation.description}>
											{violation.description}
										</span>
									</TableCell>
									<TableCell className="py-2">
										<Badge variant={getSeverityVariant(violation.severity)} className="text-[10px] px-1.5 h-5">
											{violation.severity}
										</Badge>
									</TableCell>
									<TableCell className="py-2 text-muted-foreground text-xs">
										{violation.penalty_amount ?
											`$${Number(violation.penalty_amount).toLocaleString()}` :
											<span className="text-muted-foreground/50">—</span>
										}
									</TableCell>
									<TableCell className="py-2 text-muted-foreground text-xs">
										{violation.amount_paid ?
											`$${Number(violation.amount_paid).toLocaleString()}` :
											<span className="text-muted-foreground/50">—</span>
										}
									</TableCell>
								</tr>
							))}
						</TableBody>
					</Table>
				</ScrollArea>
			</div>
		</div>
	)
}
