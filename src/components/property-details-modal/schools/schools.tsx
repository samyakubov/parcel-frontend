"use client"
import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { School } from "lucide-react"
import { isEmpty, isNil, isUndefined } from "lodash-es"
import SchoolsHeader from "@/components/property-details-modal/schools/schools-header"
import SchoolsTable from "@/components/property-details-modal/schools/schools-table"
import { Skeleton } from "@/components/ui/skeleton"

interface SchoolsProps {
    schools: School[] | null | undefined
}

export default function Schools({ schools }: SchoolsProps) {
    // Loading state
    if (isUndefined(schools)) {
        return (
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-primary/10">
                            <School className="h-4 w-4 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold">
                            Schools
                        </h3>
                    </div>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-5/6" />
                </CardContent>
            </Card>
        )
    }

    // No data state
    if (isNil(schools) || isEmpty(schools)) {
        return (
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-primary/10">
                            <School className="h-4 w-4 text-destructive" />
                        </div>
                        <h3 className="text-lg font-semibold text-destructive">
                            Schools
                        </h3>
                    </div>
                </CardHeader>
                <CardContent>
                    <Alert variant="destructive">
                        <AlertDescription>
                            No school information available.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        )
    }

    // Data loaded state
    return (
        <Card>
            <SchoolsHeader />
            <CardContent className="p-3">
                <SchoolsTable schools={schools} />
            </CardContent>
        </Card>
    )
}
