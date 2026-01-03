import React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface SchoolsTableProps {
    schools: School[] | null
}

export default function SchoolsTable({ schools }: SchoolsTableProps) {
    return (
        <div className="max-h-96 overflow-y-auto pr-2">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>School Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Grade Levels</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {schools?.map((school, index) => (
                        <TableRow key={index}>
                            <TableCell>{school.location_name}</TableCell>
                            <TableCell>{school.location_type_description}</TableCell>
                            <TableCell>{school.grades_final_text}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
