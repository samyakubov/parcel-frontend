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


export default function PropertyRecordGridTable ({ data }: GridProps) {
    return (
        <div className="rounded-md border">
            <ScrollArea className="h-[500px] w-full">
                <Table>
                    <TableHeader className="sticky top-0 bg-background">
                        <TableRow>
                            {PROPERTY_RECORD_GRID_COLUMNS.map((column) => (
                                <TableHead key={column} className="font-semibold">
                                    {column}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((record, index) => (
                            <TableRow key={record.documentid + index} className="hover:bg-muted/50">
                                <TableCell className="py-2">
                                    {record.prop_streetnumber}
                                </TableCell>
                                <TableCell className="py-2">
                                    {record.prop_streetname}
                                </TableCell>
                                <TableCell className="py-2">
                                    {record.prop_unit}
                                </TableCell>
                                <TableCell className="py-2">
                                    {record.bbl}
                                </TableCell>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
    )
}
