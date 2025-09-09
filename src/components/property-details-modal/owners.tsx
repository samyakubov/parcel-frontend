"use client"
import isNull from "lodash-es/isNull"
import isEmpty from "lodash-es/isEmpty"
import isArray from "lodash-es/isArray"
import isUndefined from "lodash-es/isUndefined"
import React, { useState, useMemo } from "react"
import { Users, Search, ChevronDown, ChevronUp, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface OwnerProps {
    currentOwners: string[];
    previousOwners: string[];
}


export default function Owners(props: OwnerProps) {
	const { currentOwners, previousOwners } = props

	const [searchTerm, setSearchTerm] = useState<string>("")
	const [previousOwnersSearchTerm, setPreviousOwnersSearchTerm] = useState<string>("")
	const [isPreviousOwnersOpen, setIsPreviousOwnersOpen] = useState<boolean>(false)

	const filteredOwners = useMemo(() => {
		if (!isArray(currentOwners)) return []

		if (!searchTerm.trim()) return currentOwners

		return currentOwners.filter(owner =>
			owner.toLowerCase().includes(searchTerm.toLowerCase())
		)
	}, [currentOwners, searchTerm])

	const filteredPreviousOwners = useMemo(() => {
		if (!isArray(previousOwners)) return []

		if (!previousOwnersSearchTerm.trim()) return previousOwners

		return previousOwners.filter(owner =>
			owner.toLowerCase().includes(previousOwnersSearchTerm.toLowerCase())
		)
	}, [previousOwners, previousOwnersSearchTerm])

	const sortedOwners = useMemo(() => {
		return filteredOwners.slice().sort((a, b) => a.localeCompare(b))
	}, [filteredOwners])

	const sortedPreviousOwners = useMemo(() => {
		return filteredPreviousOwners.slice().sort((a, b) => a.localeCompare(b))
	}, [filteredPreviousOwners])

	if (isNull(currentOwners) || isEmpty(currentOwners) || isUndefined(currentOwners)) {
		return (
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				className="w-full"
			>
				<Card>
					<CardHeader>
						<div className="flex items-center gap-2">
							<div className="p-2 rounded-full bg-destructive/10">
								<Users className="h-4 w-4 text-destructive" />
							</div>
							<h3 className="text-lg font-semibold text-destructive">
                                Owners
							</h3>
						</div>
					</CardHeader>
					<CardContent>
						<Alert variant="destructive">
							<AlertDescription>
                                No owners found.
							</AlertDescription>
						</Alert>
					</CardContent>
				</Card>
			</motion.div>
		)
	}

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

					{sortedOwners.length > 0 ? (
						<div className="space-y-2">
							{sortedOwners.map((owner, index) => (
								<div
									key={index}
									className="flex items-center justify-between p-3 rounded-lg
									border bg-card hover:bg-accent/50 transition-colors"
								>
									<span className="text-sm font-medium">
										{owner}
									</span>
								</div>
							))}
						</div>
					) : (
						<div className="flex flex-col items-center justify-center py-8 text-center">
							<div className="p-3 rounded-full bg-muted mb-3">
								<Search className="h-6 w-6 text-muted-foreground" />
							</div>
							<p className="text-sm text-muted-foreground">No matching current owners found.</p>
						</div>
					)}
				</CardContent>

				{isArray(previousOwners) && previousOwners.length > 0 && (
					<CardContent className="pt-0">
						<Collapsible open={isPreviousOwnersOpen} onOpenChange={setIsPreviousOwnersOpen}>
							<CollapsibleTrigger asChild>
								<Button variant="ghost" className="w-full justify-between p-3 h-auto">
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
									{isPreviousOwnersOpen ? (
										<ChevronUp className="h-4 w-4" />
									) : (
										<ChevronDown className="h-4 w-4" />
									)}
								</Button>
							</CollapsibleTrigger>

							<CollapsibleContent>
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className="space-y-4 mt-4"
								>
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

									{sortedPreviousOwners.length > 0 ? (
										<div className="space-y-2">
											{sortedPreviousOwners.map((owner, index) => (
												<div
													key={index}
													className="flex items-center justify-between p-3 rounded-lg
													border bg-muted/30 hover:bg-muted/50 transition-colors"
												>
													<span className="text-sm font-medium text-muted-foreground">
														{owner}
													</span>
												</div>
											))}
										</div>
									) : (
										<div className="flex flex-col items-center justify-center py-6 text-center">
											<div className="p-3 rounded-full bg-muted mb-3">
												<Search className="h-5 w-5 text-muted-foreground" />
											</div>
											<p className="text-sm text-muted-foreground">No matching previous owners found.</p>
										</div>
									)}
								</motion.div>
							</CollapsibleContent>
						</Collapsible>
					</CardContent>
				)}
			</Card>
		</motion.div>
	)
}
