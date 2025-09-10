"use client"
import React from "react"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { modalStore } from "@/stores/modal-store"

interface PropertyDetailsModalHeaderProps {
    modal: PropertyModal;
    details: PropertyDetails;
}

export default function PropertyDetailsModalHeader ({ modal, details }: PropertyDetailsModalHeaderProps) {
	return (
		<motion.div
			layout="preserve-aspect"
			whileHover={{ scale: 1.005 }}
			transition={{ type: "spring", stiffness: 300, damping: 20 }}
			className="flex-none flex items-center gap-3 p-6 bg-background border-b border-border backdrop-blur-sm cursor-pointer"
			onClick={() => modalStore.focusModal(modal.id)}
		>
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
	)
}
