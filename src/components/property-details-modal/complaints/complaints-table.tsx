"use client"
import React from "react"
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

interface ComplaintsTableProps {
	complaints: Complaint[]
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

export default function ComplaintsTable({ complaints }: ComplaintsTableProps) {
	return (
		<div
			className="overflow-hidden"
		>
			<div className="mt-2 border-t border-border/50">
				<ScrollArea className="h-60">
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								{COMPLAINT_COLUMNS.map((column) => (
									<TableHead
										key={column}
										className="font-semibold text-foreground text-xs h-8"
									>
										{column}
									</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{complaints.map((complaint, index) => (
								<tr
									key={`${complaint.bin}-${index}`}
									className="border-b"
								>
									<TableCell className="py-2">
										<Badge variant={getStatusVariant(complaint.status)} className="text-[10px] px-1.5 h-5">
											{complaint.status}
										</Badge>
									</TableCell>
									<TableCell className="py-2 text-muted-foreground text-xs">
										{complaint.complaint_category}
									</TableCell>
									<TableCell className="py-2 text-muted-foreground text-xs">
										{complaint.disposition_date || (
											<span className="text-muted-foreground/50">—</span>
										)}
									</TableCell>
									<TableCell className="py-2 text-muted-foreground text-xs">
										{complaint.disposition_code || (
											<span className="text-muted-foreground/50">—</span>
										)}
									</TableCell>
									<TableCell className="py-2 text-muted-foreground text-xs">
										{complaint.inspection_date || (
											<span className="text-muted-foreground/50">—</span>
										)}
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
