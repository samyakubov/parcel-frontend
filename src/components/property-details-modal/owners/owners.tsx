"use client"
import isArray from "lodash-es/isArray"
import React, { useState, useMemo } from "react"
import { Users, Search } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import PreviousOwners from "@/components/property-details-modal/owners/previous-owners"
import OwnerList from "@/components/property-details-modal/owners/owner-list"

interface OwnerProps {
    currentOwners: string[];
    previousOwners: string[];
}

export default function Owners({ currentOwners, previousOwners }: OwnerProps) {

	const [searchTerm, setSearchTerm] = useState<string>("")

	const filteredOwners = useMemo(() => {
		if (!isArray(currentOwners)) return []

		if (!searchTerm.trim()) return currentOwners

		return currentOwners.filter(owner =>
			owner.toLowerCase().includes(searchTerm.toLowerCase())
		)
	}, [currentOwners, searchTerm])

	const sortedOwners = useMemo(() => {
		return filteredOwners.slice().sort((a, b) => a.localeCompare(b))
	}, [filteredOwners])

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			className="w-full"
		>
			<Card>
				<CardHeader>
					<div className="flex items-center gap-2">
						<div className="p-2 rounded-full bg-primary/10">
							<Users className="h-4 w-4 text-primary"/>
						</div>
						<h3 className="text-lg font-semibold">
                            Owners
						</h3>
					</div>
				</CardHeader>

				<CardContent className="space-y-4">
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

					<OwnerList owners={sortedOwners} />
				</CardContent>

				<CardContent>
					<PreviousOwners previousOwners={previousOwners} />
				</CardContent>
			</Card>
		</motion.div>
	)
}
