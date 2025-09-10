"use client"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import isNull from "lodash-es/isNull"
import Details from "@/components/property-details-modal/details"
import Mortgage from "@/components/property-details-modal/mortgage/mortgage"
import Zoning from "@/components/property-details-modal/zoning/zoning"
import LastSold from "@/components/property-details-modal/last-sold/last-sold"
import Permits from "@/components/property-details-modal/permits/permits"
import Complaints from "@/components/property-details-modal/complaints/complaints"
import Violations from "@/components/property-details-modal/violations/violations"
import Owners from "@/components/property-details-modal/owners/owners"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import PropertyRecordGrid from "@/components/property-details-modal/property-records-grid"
import getMortgageDetails from "@/utils/get-mortgage-details"

interface PropertyDetailsModalContentProps {
    modal: PropertyModal;
    details: PropertyDetails;
}

export default function PropertyDetailsModalContent({ modal, details }: PropertyDetailsModalContentProps) {
	const latestMortgage = getMortgageDetails(details.records, details.last_sold_for.sale_date)

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
							className="rounded-lg w-full h-64 object-cover mb-4"
							src={`https://maps.googleapis.com/maps/api/streetview?size=800x300&location=
							${modal.coords.latitude},${modal.coords.longitude}&key=${process.env.NEXT_PUBLIC_STREETVIEW_API_KEY}`}
							alt="Google Street View"
						/>
						<Details firstRecord={details.records[0]} />
						<LastSold lastSoldFor={details.last_sold_for}/>
						{
							!isNull(latestMortgage) ? (
								<Mortgage borrower={latestMortgage.borrower} lender={latestMortgage.lender} />
							) : (
								<Card>
									<CardHeader>Mortgage Details</CardHeader>
									<CardContent>No mortgage on record</CardContent>
								</Card>
							)
						}
					</motion.div>
					<motion.div
						layout="preserve-aspect"
						className={modal.isExpanded ? "w-1/2 space-y-4" : "space-y-4"}
					>
						<Zoning zoning={details.zoning} />

						<Owners currentOwners={details.owners.current_owners} previousOwners={details.owners.previous_owners}/>

					</motion.div>
				</motion.div>

				<AnimatePresence>
					{modal.isExpanded && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
						>
							<Permits permits={details.permits}/>
							<Complaints complaints={details.complaints} />
							<Violations violations={details.violations} />
							<PropertyRecordGrid data={details.records} />
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.div>
	)
}
