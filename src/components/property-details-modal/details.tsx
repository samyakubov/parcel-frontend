"use client"
import React from "react"
import {
    Building2,
    Home,
    Ruler,
    TreePine,
    Hash, Square, CalendarDays, Layers
} from "lucide-react"
import isEmpty from "lodash-es/isEmpty"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import PropertyDetailItem from "@/components/property-details-modal/mortgage/property-detail-item"
import isNull from "lodash-es/isNull"

interface PropertyDetailProps {
    firstRecord: PropertyRecord
    lastSold: LastSoldWithSqft | LastSold
}

function isLastSoldWithSqft(
    data: LastSold | LastSoldWithSqft
): data is LastSoldWithSqft {
    if (typeof data !== "object" || data === null) return false

    return (
        "gross_sqft" in data &&
        "land_sqft" in data &&
        "year_built" in data &&
        data.gross_sqft !== null &&
        data.land_sqft !== null &&
        data.year_built !== null
    )
}


export default function Details({ firstRecord, lastSold }: PropertyDetailProps) {
    if (isEmpty(firstRecord) || isNull(firstRecord)) {
        return (
            <Card className="w-full">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-destructive/10">
                            <Building2 className="h-4 w-4 text-destructive" />
                        </div>
                        <h3 className="text-lg font-semibold text-destructive">
                            Property Details
                        </h3>
                    </div>
                </CardHeader>
                <CardContent>
                    <Alert variant="destructive">
                        <AlertDescription>No property details available.</AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        )
    }


    const getDetails = () => {
        if (!isNull(firstRecord)) {
            return (
                <>
                    <PropertyDetailItem
                        icon={<Layers className="h-4 w-4 text-muted-foreground"/>}
                        label="# of floors"
                        value={firstRecord.num_floors.toString()}
                    />
                    <PropertyDetailItem
                        icon={<Home className="h-4 w-4 text-muted-foreground"/>}
                        label="Home Square Feet"
                        value={`${firstRecord.bldg_area.toString()} (${firstRecord.bldg_front} X ${firstRecord.bldg_depth})`}
                    />
                    <PropertyDetailItem
                        icon={<Square className="h-4 w-4 text-muted-foreground"/>}
                        label="Land Square Feet"
                        value={`${firstRecord.lot_area.toString()} (${firstRecord.lot_front} X ${firstRecord.lot_depth})`}
                    />
                    <PropertyDetailItem
                        icon={<CalendarDays className="h-4 w-4 text-muted-foreground"/>}
                        label="Property Year Built"
                        value={firstRecord.year_built.toString()}
                    />
                </>
            )
        } else if (isLastSoldWithSqft(lastSold)) {
            return (
                <>
                    <PropertyDetailItem
                        icon={<Ruler className="h-4 w-4 text-muted-foreground"/>}
                        label="Home Square Feet"
                        value={lastSold.gross_sqft}
                    />
                    <PropertyDetailItem
                        icon={<TreePine className="h-4 w-4 text-muted-foreground"/>}
                        label="Land Square Feet"
                        value={lastSold.land_sqft}
                    />
                    <PropertyDetailItem
                        icon={<CalendarDays className="h-4 w-4 text-muted-foreground"/>}
                        label="Property Year Built"
                        value={lastSold.year_built}
                    />
                </>
            )
        } else {
            return null
        }
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
                {getDetails()}
            </CardContent>
        </Card>
    )
}
