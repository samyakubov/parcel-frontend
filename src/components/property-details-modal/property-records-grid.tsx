import React from "react"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import {PROPERTY_RECORD_GRID_COLUMNS} from "@/constants/property"

interface GridProps {
    data: PropertyRecord[];
}

const formatCurrency = (amount: number) =>
	new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)

const formatDate = (date: string) => new Date(date).toLocaleDateString()

const renderCellValue = (field: keyof PropertyRecord, record: PropertyRecord) => {
	const value = record[field]

	if (field === "amount") {
		return formatCurrency(value as number)
	}

	if (field === "recordedfiled") {
		return formatDate(value as string)
	}

	return String(value || "--")
}

export default function PropertyRecordGrid({ data }: GridProps) {
	return (
		<div className="space-y-6">
			<div className="flex items-center gap-3 w-full">
				<a
					target="_blank"
					rel="noopener noreferrer"
					className="text-xl font-bold bg-primary bg-clip-text text-transparent"
					href={`http://a836-acris.nyc.gov/bblsearch/bblsearch.asp?
					borough=${data[0].bbl?.[0]}&block=${data[0].prop_block}
					&lot=${data[0].prop_lot}`}
				>
					<span>ACRIS Records</span>
				</a>
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							{PROPERTY_RECORD_GRID_COLUMNS.map(({ field, label }) => (
								<TableHead key={field} className="font-semibold">
									{label}
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.map((record, index) => (
							<TableRow key={record.documentid + index} className="hover:bg-muted/50">
								{PROPERTY_RECORD_GRID_COLUMNS.map(({ field }) => (
									<TableCell key={field} className="py-2">
										{renderCellValue(field, record)}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
