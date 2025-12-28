"use client"

import React, { useMemo } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import {COOP_PROPERTY_TYPES, PROPERTY_RECORD_GRID_COLUMNS} from "@/constants/property"

interface GridProps {
    data: PropertyRecord[]
}



const formatCurrency = (amount: number): string =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount)

const formatDate = (date: string): string =>
    new Date(date).toLocaleDateString("en-US")

const isCoopProperty = (propType: string): boolean =>
    (COOP_PROPERTY_TYPES as readonly string[]).includes(propType)

export default function PropertyRecordGridTable({ data }: GridProps) {
    const columns = useMemo(() => {
        if (data.length === 0) return PROPERTY_RECORD_GRID_COLUMNS

        const shouldShowUnit = isCoopProperty(data[0].prop_type)
        return shouldShowUnit
            ? [...PROPERTY_RECORD_GRID_COLUMNS, "Unit"]
            : PROPERTY_RECORD_GRID_COLUMNS
    }, [data])

    const showUnitColumn = useMemo(
        () => data.length > 0 && isCoopProperty(data[0].prop_type),
        [data]
    )

    if (data.length === 0) {
        return (
            <div className="rounded-xl border border-border/50 bg-background/50
             backdrop-blur-sm shadow-lg p-8 text-center text-muted-foreground">
                No property records found
            </div>
        )
    }

    return (
        <div className="rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm shadow-lg overflow-hidden">
            <ScrollArea className="h-[500px] w-full">
                <Table>
                    <TableHeader className="sticky top-0 bg-muted/50 backdrop-blur-sm z-10">
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead key={column} className="font-semibold">
                                    {column}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((record, index) => (
                            <TableRow
                                key={`${record.documentid}-${index}`}
                                className="hover:bg-muted/50"
                            >
                                <TableCell className="py-2">
                                    {formatCurrency(record.amount)}
                                </TableCell>
                                <TableCell className="py-2">
                                    {record.prop_type}
                                </TableCell>
                                <TableCell className="py-2">
                                    {record.party_name}
                                </TableCell>
                                <TableCell className="py-2">
                                    {record.partytype_desc}
                                </TableCell>
                                <TableCell className="py-2">
                                    {record.doc_type}
                                </TableCell>
                                <TableCell className="py-2">
                                    {formatDate(record.record_filed)}
                                </TableCell>
                                {showUnitColumn && (
                                    <TableCell className="py-2">
                                        {record.prop_unit || "—"}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
    )
}
