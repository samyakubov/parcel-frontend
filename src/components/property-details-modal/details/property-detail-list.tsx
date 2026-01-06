import React from "react"
import isNull from "lodash-es/isNull"
import FirstRecordDetails from "@/components/property-details-modal/details/first-record-details"
import LastSoldDetails from "@/components/property-details-modal/details/last-sold-details"

interface PropertyDetailListProps {
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

export default function PropertyDetailList({ firstRecord, lastSold }: PropertyDetailListProps) {
    if (!isNull(firstRecord)) {
        return <FirstRecordDetails firstRecord={firstRecord} />
    } else if (isLastSoldWithSqft(lastSold)) {
        return <LastSoldDetails lastSold={lastSold} />
    }
    return null
}
