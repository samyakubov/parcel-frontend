import React from "react"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import SchoolRow from "@/components/property-details-modal/schools/school-row"

interface SchoolsTableProps {
    schools: School[] | null
}

export default function SchoolsTable({ schools }: SchoolsTableProps) {
    return (
        <ScrollArea className="h-96 w-full rounded-md border">
            <Table>
                <TableHeader className="bg-muted/50 sticky top-0 z-10 transition-none">
                    <TableRow>
                        <TableHead className="w-[45%]">School Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Grades</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {schools?.map((school, index) => (
                        <SchoolRow key={index} school={school} />
                    ))}
                </TableBody>
            </Table>
        </ScrollArea>
    )
}
