"use client"
import React from "react"
import { motion } from "framer-motion"
import isNull from "lodash-es/isNull"
import { isEmpty, isNil } from "lodash-es"
import Details from "@/components/property-details-modal/details/details"
import Mortgage from "@/components/property-details-modal/mortgage/mortgage"
import Zoning from "@/components/property-details-modal/zoning/zoning"
import Owners from "@/components/property-details-modal/owners/owners"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import PropertyRecordGrid from "@/components/property-details-modal/property-record-grid/property-records-grid"
import { Landmark } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Schools from "@/components/property-details-modal/schools/schools"
import Census from "@/components/property-details-modal/census/census"
import Violations from "@/components/property-details-modal/violations/violations"
import Complaints from "@/components/property-details-modal/complaints/complaints"
import Jobs from "@/components/property-details-modal/jobs/jobs"

interface PropertyDetailsModalContentProps {
	modal: PropertyModal;
}

export default function PropertyDetailsModalContent({ modal }: PropertyDetailsModalContentProps) {
	const firstDeedOrMortgageRecord = modal.propertyData.records.find(
		(record) => record.doc_type === "DEED" || record.doc_type === "MORTGAGE")

	const getCurrentOwner = () => {
		if (
			(isEmpty(modal.propertyData.owners.current_owners) || isNull(modal.propertyData.owners.current_owners))
			&& !isNil(modal.propertyData.records[0].owner_name)
		) {
			return [modal.propertyData.records[0].owner_name]
		} else {
			return modal.propertyData.owners.current_owners
		}
	}

	const renderTab = () => {
		switch (modal.activeTab) {
			case "details":
				return (
					<div className="space-y-2">
						<Details
							firstRecord={!isNil(firstDeedOrMortgageRecord) ? firstDeedOrMortgageRecord : modal.propertyData.records[0]}
							lastSold={modal.propertyData.last_sold}
						/>
						<Zoning zoning={modal.propertyData.zoning} />
					</div>
				)
			case "owners":
				return (
					<Owners
						currentOwners={getCurrentOwner()}
						previousOwners={modal.propertyData.owners.previous_owners}
					/>
				)
			case "mortgage":
				return !isNull(modal.propertyData.mortgage) ? (
					<Mortgage
						borrower={modal.propertyData.mortgage.borrower}
						lender={modal.propertyData.mortgage.lender}
						amount={modal.propertyData.mortgage.amount}
					/>
				) : (
					<Card>
						<CardHeader>
							<div className="flex items-center gap-2">
								<div className="p-2 rounded-full bg-destructive/10">
									<Landmark className="h-4 w-4 text-destructive" />
								</div>
								<h3 className="text-lg font-semibold text-destructive">Mortgage Details</h3>
							</div>
						</CardHeader>
						<CardContent>
							<Alert variant="destructive">
								<AlertDescription>No mortgage on record</AlertDescription>
							</Alert>
						</CardContent>
					</Card>
				)
			case "violations":
				return <Violations violations={modal.propertyData.violations} />
			case "complaints":
				return <Complaints complaints={modal.propertyData.complaints} />
			case "jobs":
				return <Jobs jobsFiled={modal.propertyData.job_filings} />
			case "schools":
				return <Schools schools={modal.schools} />
			case "census":
				return <Census census={modal.census} />
			case "records":
				return <PropertyRecordGrid data={modal.propertyData.records} />
			default:
				return null
		}
	}

	return (
		<motion.div
			layout="preserve-aspect"
			className="flex-1 overflow-y-auto"
		>
			<div className="p-2">
				<motion.div
					key={modal.activeTab}
					initial={{ opacity: 0, y: 6 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.15 }}
				>
					{renderTab()}
				</motion.div>
			</div>
		</motion.div>
	)
}
