"use client"
import React, { useState, useMemo } from "react"
import { Search, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import OwnerList from "@/components/property-details-modal/owners/owner-list"
import { CardContent, CardHeader } from "@/components/ui/card"

interface PreviousOwnersProps {
    previousOwners: string[];
}

export default function PreviousOwners({ previousOwners }: PreviousOwnersProps) {
    const [previousOwnersSearchTerm, setPreviousOwnersSearchTerm] = useState<string>("")

    const filteredPreviousOwners = useMemo(() => {
        if (!previousOwnersSearchTerm.trim()) return previousOwners
        return previousOwners.filter(owner =>
            owner.toLowerCase().includes(previousOwnersSearchTerm.toLowerCase())
        )
    }, [previousOwners, previousOwnersSearchTerm])

    const sortedPreviousOwners = useMemo(() => {
        return filteredPreviousOwners.slice().sort((a, b) => a.localeCompare(b))
    }, [filteredPreviousOwners])

    if (previousOwners.length === 0) return null

    return (
        <>
            <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-full bg-muted">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <span className="text-sm font-medium">
                        Previous Owners
                    </span>
                    <Badge variant="secondary" className="ml-2">
                        {previousOwners.length}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform
                    -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        className="pl-10"
                        placeholder="Search previous owners..."
                        value={previousOwnersSearchTerm}
                        onChange={(e) => setPreviousOwnersSearchTerm(e.target.value)}
                    />
                </div>

                <OwnerList owners={sortedPreviousOwners} />
            </CardContent>
        </>
    )
}
