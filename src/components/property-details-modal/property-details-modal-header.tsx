"use client"
import React from "react"
import { motion } from "framer-motion"
import { modalStore } from "@/stores/modal-store"

interface PropertyDetailsModalHeaderProps {
	modal: PropertyModal;
}

export default function PropertyDetailsModalHeader({ modal }: PropertyDetailsModalHeaderProps) {
	return (
		<motion.div
			layout="preserve-aspect"
			transition={{ type: "spring", stiffness: 300, damping: 20 }}
			className="flex-none flex items-center gap-4 p-5 bg-gradient-to-r from-primary/5 via-transparent to-transparent
			 border-b border-border/50 backdrop-blur-sm cursor-pointer"
			onClick={() => modalStore.focusModal(modal.id)}
		>
			<div className="flex items-center w-full">
				<a
					target="_blank"
					rel="noopener noreferrer"
					className="text-xl font-bold text-foreground hover:text-primary transition-colors duration-300 group"
					href={`http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet
					?boro=${modal.propertyData.records[0].bbl[0]}
					&block=${modal.propertyData.records[0].prop_block}
					&lot=${modal.propertyData.records[0].prop_lot}`}
				>
					<span className="group-hover:underline underline-offset-4 decoration-primary/50">
						{modal.title}
					</span>
				</a>
			</div>
		</motion.div>
	)
}
