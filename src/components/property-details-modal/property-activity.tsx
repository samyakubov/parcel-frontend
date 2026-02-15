"use client"
import React, { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Activity } from "lucide-react"
import Jobs from "@/components/property-details-modal/jobs/jobs"
import Complaints from "@/components/property-details-modal/complaints/complaints"
import Violations from "@/components/property-details-modal/violations/violations"

interface PropertyActivityProps {
	jobs: JobFiled[]
	complaints: Complaint[]
	violations: Violation[]
}

export default function PropertyActivity({ jobs, complaints, violations }: PropertyActivityProps) {
	const [activeTab, setActiveTab] = useState("violations")

	const getTitle = () => {
		switch (activeTab) {
			case "violations":
				return "Violations"
			case "complaints":
				return "Complaints"
			case "jobs":
				return "Jobs"
			default:
				return "Property Activity"
		}
	}

	return (
		<Card className="w-full py-2 gap-2">
			<CardHeader className="p-4 py-2">
				<div className="flex items-center gap-2">
					<div className="rounded-full bg-primary/10">
						<Activity className="h-4 w-4 text-primary" />
					</div>
					<h3 className="text-lg font-semibold">
						{getTitle()}
					</h3>
				</div>
			</CardHeader>
			<CardContent className="pt-2">
				<Tabs defaultValue="violations" className="w-full" onValueChange={setActiveTab}>
					<TabsList className="grid w-full grid-cols-3 h-12 md:h-9">
						<TabsTrigger value="violations" className="text-xs px-1 min-h-[44px] md:min-h-0">
							Violations ({violations?.length || 0})
						</TabsTrigger>
						<TabsTrigger value="complaints" className="text-xs px-1 min-h-[44px] md:min-h-0">
							Complaints ({complaints?.length || 0})
						</TabsTrigger>
						<TabsTrigger value="jobs" className="text-xs px-1 min-h-[44px] md:min-h-0">
							Jobs ({jobs?.length || 0})
						</TabsTrigger>
					</TabsList>
					<TabsContent value="violations">
						<Violations violations={violations} />
					</TabsContent>
					<TabsContent value="complaints">
						<Complaints complaints={complaints} />
					</TabsContent>
					<TabsContent value="jobs">
						<Jobs jobsFiled={jobs} />
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	)
}
