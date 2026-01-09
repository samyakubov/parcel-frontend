"use client"
import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import CensusHeader from "@/components/property-details-modal/census/census-header"

export default function CensusLoading() {
    return (
        <Card className="w-full mb-3">
            <CardHeader>
               <CensusHeader/>
            </CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
            </CardContent>
        </Card>
    )
}
