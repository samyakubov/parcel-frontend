"use client"
import React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
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

export default function PropertyRecordGridTable ({ data }: GridProps) {
    return (
        <div className="rounded-md border">
            <ScrollArea className="h-[500px] w-full">
                <Table>
                    <TableHeader className="sticky top-0 bg-background">
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
            </ScrollArea>
        </div>
    )
}
