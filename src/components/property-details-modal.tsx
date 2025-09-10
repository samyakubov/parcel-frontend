"use client"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import isNull from "lodash-es/isNull"
import {MapPin} from "lucide-react"
import {modalStore} from "@/stores/modal-store"
import Modal from "@/components/modal/modal"
import getMortgageDetails from "@/utils/get-mortgage-details"
import Details from "@/components/property-details-modal/details"
import Mortgage from "@/components/property-details-modal/mortgage"
import Zoning from "@/components/property-details-modal/zoning"
import LastSold from "@/components/property-details-modal/last-sold"
import Permits from "@/components/property-details-modal/permits"
import Complaints from "@/components/property-details-modal/complaints"
import Violations from "@/components/property-details-modal/violations"
import Owners from "@/components/property-details-modal/owners"
import {observer} from "mobx-react"
import {Card, CardContent, CardHeader} from "@/components/ui/card"
import PropertyRecordGrid from "@/components/property-details-modal/property-records-grid"

interface PropertyInfoModalProps {
    id: string
}

function PropertyDetailsModal(props: PropertyInfoModalProps) {
	const { id } = props

	const modal = modalStore._propertyModals.filter(propertyModal => propertyModal.id === id)[0]
	const details = modal.propertyData
	const latestMortgage = getMortgageDetails(details.records, details.last_sold_for.sale_date)

	const getPanelClassName = () => {
		const baseClasses = "overflow-hidden flex flex-col"
		return modal.isExpanded
			? `fixed left-20 right-4 top-4 bottom-4 ${baseClasses}`
			: `fixed right-4 top-4 w-11/12 max-w-md h-[95vh] ${baseClasses}`
	}

	return (
		<Modal
			panelClassName={getPanelClassName()}
			isExpandable={true}
			modalId={modal.id}>
			<motion.div
				layout="preserve-aspect"
				className="flex flex-col h-full overflow-hidden"
				onClick={() => modalStore.focusModal(modal.id)}
				style={{ zIndex: modal.zIndex }}
			>
				<motion.div
					layout="preserve-aspect"
					whileHover={{ scale: 1.005 }}
					transition={{ type: "spring", stiffness: 300, damping: 20 }}
					className="flex-none flex items-center gap-3 p-6 bg-background border-b border-border backdrop-blur-sm cursor-pointer">
					<div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex-shrink-0">
						<MapPin className="w-5 h-5 text-secondary " />
					</div>

					<div className="flex items-center w-full">
						<a
							target="_blank"
							rel="noopener noreferrer"
							className="text-xl font-bold text-primary bg-clip-text transition-all duration-300 ease-out group"
							href={`http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?boro=
							${details.records[0].bbl[0]}&block=${details.records[0].prop_block}&lot=${details.records[0].prop_lot}`}
						>
							<span>
								{modal.title}
							</span>
						</a>
					</div>
				</motion.div>

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
			</motion.div>
		</Modal>
	)
}

export default observer(PropertyDetailsModal)
