"use client"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import isNull from "lodash-es/isNull"
import Details from "@/components/property-details-modal/details"
import Mortgage from "@/components/property-details-modal/mortgage/mortgage"
import Zoning from "@/components/property-details-modal/zoning/zoning"
import LastSold from "@/components/property-details-modal/last-sold/last-sold"
import Jobs from "@/components/property-details-modal/jobs/jobs"
import Complaints from "@/components/property-details-modal/complaints/complaints"
import Violations from "@/components/property-details-modal/violations/violations"
import Owners from "@/components/property-details-modal/owners/owners"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import PropertyRecordGrid from "@/components/property-details-modal/property-record-grid/property-records-grid"
import { Landmark } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface PropertyDetailsModalContentProps {
	modal: PropertyModal;
}

export default function PropertyDetailsModalContent({ modal }: PropertyDetailsModalContentProps) {


	return (
		<motion.div
			layout="preserve-aspect"
			className="flex-1 overflow-y-auto"
		>
			<div className="p-6 space-y-4">
				<motion.div
					layout="preserve-aspect"
					className={modal.isExpanded ? "flex gap-8 " : "space-y-4"}
				>
					<motion.div
						layout="preserve-aspect"
						className={modal.isExpanded ? "w-1/2 space-y-4" : "space-y-4"}
					>
						<motion.img
							layout="preserve-aspect"
							className="rounded-xl shadow-lg w-full h-64 object-cover mb-4 border border-white/10"
							src={`https://maps.googleapis.com/maps/api/streetview?size=800x300&location=
							${modal.coords.latitude},${modal.coords.longitude}
							&key=${process.env.NEXT_PUBLIC_STREETVIEW_API_KEY}`
							}
							alt="Google Street View"
						/>

						<Details
							firstRecord={modal.propertyData.records[0]}
							lastSold={modal.propertyData.last_sold}
						/>


						<LastSold lastSoldFor={modal.propertyData.last_sold} />
					</motion.div>
					<motion.div
						layout="preserve-aspect"
						className={modal.isExpanded ? "w-1/2 space-y-4" : "space-y-4"}
					>
						<Zoning zoning={modal.propertyData.zoning} />

						<Owners currentOwners={modal.propertyData.owners.current_owners}
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
													<Landmark className="h-4 w-4 text-muted-foreground" />
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
					</motion.div>
				</motion.div>

				<AnimatePresence>
					{modal.isExpanded && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
						>
							<Jobs jobsFiled={modal.propertyData.job_filings} />
							<Complaints complaints={modal.propertyData.complaints} />
							<Violations violations={modal.propertyData.violations} />
							<PropertyRecordGrid data={modal.propertyData.records} />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	)
}
