"use client"
import React from "react"
import {
    Building2,
    Home,
    Hash
} from "lucide-react"
import isEmpty from "lodash-es/isEmpty"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import PropertyDetailItem from "@/components/property-details-modal/mortgage/property-detail-item"
import isNull from "lodash-es/isNull"
import PropertyDetailsEmpty from "@/components/property-details-modal/details/property-details-empty"
import PropertyDetailList from "@/components/property-details-modal/details/property-detail-list"

interface PropertyDetailProps {
    firstRecord: PropertyRecord
    lastSold: LastSoldWithSqft | LastSold
}

export default function Details({ firstRecord, lastSold }: PropertyDetailProps) {
    if (isEmpty(firstRecord) || isNull(firstRecord)) {
        return <PropertyDetailsEmpty />
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-primary/10">
                        <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">Property Details</h3>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <PropertyDetailItem
                    icon={<Home className="h-4 w-4 text-muted-foreground" />}
                    label="Property Type"
                    value={firstRecord.prop_type}
                />
                <PropertyDetailItem
                    icon={<Hash className="h-4 w-4 text-muted-foreground" />}
                    label="BBL"
                    value={firstRecord.bbl}
                    enableCopy={true}
                />
                <PropertyDetailList firstRecord={firstRecord} lastSold={lastSold} />
            </CardContent>
        </Card>
    )
}
