"use client"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
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

export default function ComplaintsTable({ complaints }: ComplaintsTableProps) {
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
										key={`${complaint.bin}-${index}`}
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
										<TableCell className="py-3 text-muted-foreground">
											{complaint.complaint_category}
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
	)
}
