"use client"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import isNull from "lodash-es/isNull"
import Details from "@/components/property-details-modal/details/details"
import Mortgage from "@/components/property-details-modal/mortgage/mortgage"
import Zoning from "@/components/property-details-modal/zoning/zoning"
import LastSold from "@/components/property-details-modal/last-sold/last-sold"
import Owners from "@/components/property-details-modal/owners/owners"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import PropertyRecordGrid from "@/components/property-details-modal/property-record-grid/property-records-grid"
import { Landmark } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { isEmpty, isNil } from "lodash-es"
import Schools from "@/components/property-details-modal/schools/schools"
import Census from "@/components/property-details-modal/census/census"
import PropertyActivity from "@/components/property-details-modal/property-activity"


interface PropertyDetailsModalContentProps {
	modal: PropertyModal;
}
// eslint-disable-next-line max-lines-per-function
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

	return (
		<motion.div
			layout="preserve-aspect"
			className="flex-1 overflow-y-auto"
		>
			<div className="p-2 space-y-2">
				<motion.div
					layout="preserve-aspect"
					className={modal.isExpanded ? "flex gap-2 " : "space-y-2"}
				>
					<motion.div
						layout="preserve-aspect"
						className={modal.isExpanded ? "w-1/2 space-y-2" : "space-y-2"}
					>

						<motion.img
							layout="preserve-aspect"
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.3 }}
							className={`rounded-lg w-full object-cover 
								${modal.isExpanded ? "h-80" : "h-64"}
							  `}
							src={`https://maps.googleapis.com/maps/api/streetview?size=2048x2048&scale=2&fov=90&pitch=10
								&location=${modal.propertyData.coordinates.latitude},${modal.propertyData.coordinates.longitude}
								&key=${process.env.NEXT_PUBLIC_STREETVIEW_API_KEY}`}
							alt="Google Street View"
						/>

						<Details
							firstRecord={!isNil(firstDeedOrMortgageRecord) ? firstDeedOrMortgageRecord : modal.propertyData.records[0]}
							lastSold={modal.propertyData.last_sold}
						/>


						<LastSold lastSoldFor={modal.propertyData.last_sold} />
						<PropertyActivity
							jobs={modal.propertyData.job_filings}
							complaints={modal.propertyData.complaints}
							violations={modal.propertyData.violations}
						/>
					</motion.div>
					<motion.div
						layout="preserve-aspect"
						className={modal.isExpanded ? "w-1/2 space-y-2" : "space-y-2"}
					>
						<Zoning zoning={modal.propertyData.zoning} />

						<Owners
							currentOwners={getCurrentOwner()}
							previousOwners={modal.propertyData.owners.previous_owners}
						/>
						{
							!isNull(modal.propertyData.mortgage) ? (
								<Mortgage
									borrower={modal.propertyData.mortgage.borrower}
									lender={modal.propertyData.mortgage.lender}
									amount={modal.propertyData.mortgage.amount}
								/>
							) : (
								<motion.div
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									className="w-full"
								>
									<Card>
										<CardHeader>
											<div className="flex items-center gap-2">
												<div className="p-2 rounded-full bg-destructive/10">
													<Landmark className="h-4 w-4 text-destructive" />
												</div>
												<h3 className="text-lg font-semibold text-destructive">
													Mortgage Details
												</h3>
											</div>
										</CardHeader>
										<CardContent>
											<Alert variant="destructive">
												<AlertDescription>
													No mortgage on record
												</AlertDescription>
											</Alert>
										</CardContent>
									</Card>
								</motion.div>

							)
						}
						<Schools schools={modal.schools} />

					</motion.div>

				</motion.div>

				<AnimatePresence>
					{modal.isExpanded && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							className="space-y-2"
						>
							<Census census={modal.census} />
							<PropertyRecordGrid data={modal.propertyData.records} />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	)
}
