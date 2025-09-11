"use client"
import React from "react"
import { motion } from "framer-motion"
import { modalStore } from "@/stores/modal-store"
import Modal from "@/components/modal/modal"
import { observer } from "mobx-react"
import PropertyDetailsModalHeader from "@/components/property-details-modal/property-details-modal-header"
import PropertyDetailsModalContent from "@/components/property-details-modal/property-details-modal-content"


interface PropertyInfoModalProps {
    id: string
}

function PropertyDetailsModal({ id }: PropertyInfoModalProps) {
	const modal = modalStore._propertyModals.filter(propertyModal => propertyModal.id === id)[0]

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
				style={{ zIndex: modal.zIndex }}
			>
				<PropertyDetailsModalHeader modal={modal}/>
				<PropertyDetailsModalContent modal={modal}/>
			</motion.div>
		</Modal>
	)
}

export default observer(PropertyDetailsModal)
