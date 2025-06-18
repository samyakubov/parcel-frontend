import React, { useEffect } from "react"
import { observer } from "mobx-react"
import Modal from "../Modal"
import Owners from "./PropertyInfoModal/Owners"
import PropertyLastSold from "./PropertyInfoModal/PropertyLastSold"
import MortgageDetails from "./PropertyInfoModal/MortgageDetails"
import PropertyDetails from "./PropertyInfoModal/PropertyDetails"
import Violations from "./PropertyInfoModal/Violations"
import Complaints from "./PropertyInfoModal/Complaints"
import { motion, AnimatePresence } from "framer-motion"
import ZoningSection from "./PropertyInfoModal/Zoning"
import isEmpty from "lodash-es/isEmpty"
import getMortgageDetails from "../../Utils/GetMortgageDetails"
import isNull from "lodash-es/isNull"
import ExportToExcelButton from "../ExportToExcelButton"
import Overview from "./PropertyInfoModal/Overview"
import Grid from "../Search/Grid"
import {modalStore} from "../../Stores/ModalStore"
import {MapPin} from "lucide-react"
import Permits from "./PropertyInfoModal/Permits"

interface PropertyInfoModalProps {
	data: PropertyModal
}

function PropertyInfoModal(props: PropertyInfoModalProps) {
	const modal = props.data
	useEffect(() => {
		if (isEmpty(modal.propertyData.records)) {
			modalStore.closeModal(modal.id, false)
		}
	}, [modal.id, modal.propertyData])

	const data = modal.propertyData

	const latestMortgage = getMortgageDetails(data.records, data.last_sold_for.sale_date)

	const getPanelClassName = () => {
		const baseClasses = "overflow-hidden flex flex-col"
		return modal.isExpanded
			? `fixed left-20 right-4 top-4 bottom-4 ${baseClasses}`
			: `fixed right-4 top-4 w-11/12 max-w-md h-[95vh] ${baseClasses}`
	}

	return (
		<Modal
			open={modal.isOpen}
			panelClassName={getPanelClassName()}
			isExpandable={true}
			modalId={modal.id}>
			<motion.div
				layout="preserve-aspect"
				className="flex flex-col h-full overflow-hidden"
				onClick={() => modalStore.focusModal(modal.id, false)}
				style={{ zIndex: modal.zIndex }}
			>
				<motion.div
					layout="preserve-aspect"
					whileHover={{ scale: 1.005 }}
					transition={{ type: "spring", stiffness: 300, damping: 20 }}
					className="flex-none flex items-center gap-3 p-6 bg-gradient-to-r from-slate-50 to-blue-50/30 dark:from-gray-900/50 dark:to-blue-900/20 border-b border-slate-200/60 dark:border-gray-700/50 backdrop-blur-sm cursor-pointer"
				>
					<div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex-shrink-0">
						<MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
					</div>

					<div className="flex items-center w-full">
						<a
							target="_blank"
							rel="noopener noreferrer"
							className="text-xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent dark:from-slate-100 dark:to-blue-200 transition-all duration-300 ease-out group"
							href={`http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?boro=${data.records[0].bbl[0]}&block=${data.records[0].prop_block}&lot=${data.records[0].prop_lot}`}
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
									src={`https://maps.googleapis.com/maps/api/streetview?size=800x300&location=${modal.coords.latitude},${modal.coords.longitude}&key=${process.env.REACT_APP_STREETVIEW_API_KEY}`}
									alt="Google Street View"
								/>
								{!modal.isExpanded && (<Overview propertyData={data} />)}
								<PropertyDetails first_record={data.records[0]} />
								{
									!isNull(latestMortgage) ? (
										<MortgageDetails borrower={latestMortgage.borrower} lender={latestMortgage.lender} />
									) : null
								}
							</motion.div>
							<motion.div
								layout="preserve-aspect"
								className={modal.isExpanded ? "w-1/2 space-y-4" : "space-y-4"}
							>
								<ZoningSection zoning={data.zoning} />

								<Owners owners={data.owners} />

								<PropertyLastSold
									lastSoldFor={data.last_sold_for}
								/>
							</motion.div>
						</motion.div>

						<AnimatePresence>
							{modal.isExpanded && (
								<motion.div
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: "auto" }}
									exit={{ opacity: 0, height: 0 }}
								>
									<Permits permits={data.permits}/>
									<Complaints complaints={data.complaints} />
									<Violations violations={data.violations} />
									<div className="space-y-6">
										<div className="flex items-center gap-3 w-full">
											<div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex-shrink-0">
												<svg
													className="w-6 h-6 text-blue-600 dark:text-blue-400"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
													/>
												</svg>
											</div>
											<a
												target="_blank"
												rel="noopener noreferrer"
												className="text-xl font-bold bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent dark:from-slate-100 dark:to-blue-200 hover:from-blue-600 hover:to-blue-800 dark:hover:from-blue-300 dark:hover:to-blue-100 transition-all duration-300 ease-out group"
												href={`http://a836-acris.nyc.gov/bblsearch/bblsearch.asp?borough=${data.records[0].bbl[0]}&block=${data.records[0].prop_block}&lot=${data.records[0].prop_lot}`}
											>
												<span>ACRIS Records</span>
											</a>
										</div>

										<motion.div
											layout="preserve-aspect"
											className={"w-full h-[600px] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"}
										>
											<Grid data={data.records} />
										</motion.div>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>

					<div className="sticky bottom-4 ml-auto mr-6 mt-4 z-50 flex justify-end">
						<ExportToExcelButton />
					</div>
				</motion.div>
			</motion.div>
		</Modal>
	)
}

export default observer(PropertyInfoModal)
