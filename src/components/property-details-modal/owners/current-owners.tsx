import React, { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import OwnerList from "@/components/property-details-modal/owners/owner-list"
import isArray from "lodash-es/isArray"

interface CurrentOwnersSectionProps {
    owners: string[]
}

export default function CurrentOwners({ owners }: CurrentOwnersSectionProps) {
    const [searchTerm, setSearchTerm] = useState<string>("")

    const sortedOwners = useMemo(() => {
        return owners.slice().sort((a, b) => a.localeCompare(b))
    }, [owners])

    const filteredOwners = useMemo(() => {
        if (!isArray(sortedOwners)) return []

        if (!searchTerm.trim()) return sortedOwners

        return sortedOwners.filter(owner =>
            owner.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [sortedOwners, searchTerm])

    return (
        <>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    type="text"
                    className="pl-10"
                    placeholder="Search current owners..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <OwnerList owners={filteredOwners} />
        </>
    )
}
