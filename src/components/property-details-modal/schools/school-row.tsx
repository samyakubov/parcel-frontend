import React from "react"
import { TableCell, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface SchoolRowProps {
    school: School
}

export default function SchoolRow({ school }: SchoolRowProps) {
    return (
        <TableRow className="hover:bg-muted/50">
            <TableCell className="py-3">
                <div className="flex flex-col">
                    <span className="font-medium text-sm">
                        {school.location_name}
                    </span>
                    {school.primary_address_line_1 && (
                        <span className="text-xs text-muted-foreground mt-0.5">
                            {school.primary_address_line_1}
                        </span>
                    )}
                </div>
            </TableCell>
            <TableCell>
                <Badge variant="outline" className="font-normal whitespace-nowrap">
                    {school.location_type_description}
                </Badge>
            </TableCell>
            <TableCell className="text-right font-medium">
                <span className="text-sm">
                    {school.grades_final_text}
                </span>
            </TableCell>
        </TableRow>
    )
}
