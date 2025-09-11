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
import { PERMIT_COLUMNS } from "@/constants/property"

interface PermitsTableProps {
    permits: PulledPermit[];
}

export default function PermitsTable({ permits }: PermitsTableProps) {
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
	)
}
