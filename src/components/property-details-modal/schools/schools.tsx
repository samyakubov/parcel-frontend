import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { isEmpty, isNil, isUndefined } from "lodash-es"
import SchoolsHeader from "@/components/property-details-modal/schools/schools-header"
import SchoolsTable from "@/components/property-details-modal/schools/schools-table"
import SchoolsLoading from "@/components/property-details-modal/schools/schools-loading"
import SchoolsEmpty from "@/components/property-details-modal/schools/schools-empty"

interface SchoolsProps {
    schools: School[] | null | undefined
}

export default function Schools({ schools }: SchoolsProps) {
    if (isUndefined(schools)) {
        return <SchoolsLoading />
    }

    if (isNil(schools) || isEmpty(schools)) {
        return <SchoolsEmpty />
    }

    return (
        <Card className="overflow-hidden">
            <SchoolsHeader count={schools.length} />
            <CardContent className="p-0">
                <SchoolsTable schools={schools} />
            </CardContent>
        </Card>
    )
}
