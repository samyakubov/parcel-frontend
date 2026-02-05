"use client"

import React, { useMemo, useState } from "react"
import {ArrowUpDown, ArrowUp, ArrowDown, Calendar, FileText, Building2, User} from "lucide-react"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const COOP_PROPERTY_TYPES = ["Co-op", "Cooperative"]

interface GridProps {
	data: PropertyRecord[]
}

const formatCurrency = (amount: number): string =>
	new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount)

const formatDate = (date: string): string =>
	new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric"
	})

const isCoopProperty = (propType: string): boolean =>
	(COOP_PROPERTY_TYPES as readonly string[]).includes(propType)

export default function PropertyRecordGridTable({ data }: GridProps) {
	const [sortConfig, setSortConfig] = useState<SortConfig>(null)

	const columnConfig = useMemo((): ColumnConfig[] => {
		const baseColumns: ColumnConfig[] = [
			{ key: "amount", label: "Amount", sortable: true },
			{ key: "prop_type", label: "Property Type", sortable: true },
			{ key: "party_name", label: "Party Name", sortable: true },
			{ key: "partytype_desc", label: "Party Type", sortable: true },
			{ key: "doc_type", label: "Document Type", sortable: true },
			{ key: "record_filed", label: "Filed Date", sortable: true },
		]

		const shouldShowUnit = data.length > 0 && isCoopProperty(data[0].prop_type)
		if (shouldShowUnit) {
			baseColumns.push({ key: "prop_unit", label: "Unit", sortable: true })
		}

		return baseColumns
	}, [data])

	const sortedData = useMemo(() => {
		if (!sortConfig) return data

		return [...data].sort((a, b) => {
			const aValue = a[sortConfig.key]
			const bValue = b[sortConfig.key]

			if (aValue === null || aValue === undefined) return 1
			if (bValue === null || bValue === undefined) return -1

			if (typeof aValue === "number" && typeof bValue === "number") {
				return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue
			}

			const aStr = String(aValue).toLowerCase()
			const bStr = String(bValue).toLowerCase()

			if (aStr < bStr) return sortConfig.direction === "asc" ? -1 : 1
			if (aStr > bStr) return sortConfig.direction === "asc" ? 1 : -1
			return 0
		})
	}, [data, sortConfig])

	const handleSort = (key: keyof PropertyRecord) => {
		setSortConfig(current => {
			if (!current || current.key !== key) {
				return { key, direction: "asc" }
			}
			if (current.direction === "asc") {
				return { key, direction: "desc" }
			}
			return null
		})
	}

	const getSortIcon = (key: keyof PropertyRecord) => {
		if (!sortConfig || sortConfig.key !== key) {
			return <ArrowUpDown className="ml-2 h-3.5 w-3.5 opacity-50" />
		}
		return sortConfig.direction === "asc"
			? <ArrowUp className="ml-2 h-3.5 w-3.5" />
			: <ArrowDown className="ml-2 h-3.5 w-3.5" />
	}

	if (data.length === 0) {
		return (
			<div
				className="flex items-center justify-center min-h-[400px]
                rounded-2xl border-2 border-dashed bg-gradient-to-br from-background to-muted/20"
			>
				<div className="text-center space-y-3">
					<Building2 className="w-12 h-12 mx-auto text-muted-foreground/40" />
					<p className="text-lg font-medium text-muted-foreground">No property records found</p>
				</div>
			</div>
		)
	}

	const showUnitColumn = columnConfig.length > 6

	return (
		<div className="space-y-4">

			<div className="rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden">
				<ScrollArea className="h-[600px] w-full">
					<Table>
						<TableHeader className="sticky top-0 bg-muted/80 backdrop-blur-md z-10 border-b">
							<TableRow className="hover:bg-transparent">
								{columnConfig.map((column) => (
									<TableHead key={column.key}
										className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
									>
										{column.sortable ? (
											<Button
												variant="ghost"
												onClick={() => handleSort(column.key)}
												className="-ml-4 h-auto p-2 hover:bg-transparent hover:text-foreground transition-colors"
											>
												{column.label}
												{getSortIcon(column.key)}
											</Button>
										) : (
											column.label
										)}
									</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{sortedData.map((record, index) => (
								<TableRow
									key={`${record.documentid}-${index}`}
									className="group hover:bg-accent/50 transition-colors border-b border-border/50"
								>
									<TableCell className="py-4">
										<div className="flex items-center gap-2">
											<div className="w-1 h-8 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
											<span className="text-base font-bold text-foreground">
												{formatCurrency(record.amount)}
											</span>
										</div>
									</TableCell>
									<TableCell className="py-4">
										<Badge
											variant="secondary"
											className="bg-primary/10 text-primary border border-primary/20 gap-1.5"
										>
											<Building2 className="w-3 h-3" />
											{record.prop_type}
										</Badge>
									</TableCell>
									<TableCell className="py-4">
										<div className="flex items-center gap-2">
											<User className="w-4 h-4 text-muted-foreground/50" />
											<span className="font-medium text-foreground">{record.party_name}</span>
										</div>
									</TableCell>
									<TableCell className="py-4 text-sm text-muted-foreground">
										{record.partytype_desc}
									</TableCell>
									<TableCell className="py-4">
										<div className="flex items-center gap-2">
											<FileText className="w-4 h-4 text-muted-foreground/50" />
											<span className="text-sm text-foreground">{record.doc_type}</span>
										</div>
									</TableCell>
									<TableCell className="py-4">
										<div className="flex items-center gap-2">
											<Calendar className="w-4 h-4 text-muted-foreground/50" />
											<span className="text-sm text-muted-foreground">
												{formatDate(record.record_filed)}
											</span>
										</div>
									</TableCell>
									{showUnitColumn && (
										<TableCell className="py-4 text-sm font-mono text-muted-foreground">
											{record.prop_unit || "—"}
										</TableCell>
									)}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</ScrollArea>
			</div>
		</div>
	)
}
