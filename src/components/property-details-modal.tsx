"use client"
import React from "react"
import { motion } from "framer-motion"
import { modalStore } from "@/stores/modal-store"
import Modal from "@/components/modal/modal"
import { observer } from "mobx-react"
import PropertyDetailsModalHeader from "@/components/property-details-modal/property-details-modal-header"
import PropertyDetailsModalContent from "@/components/property-details-modal/property-details-modal-content"
import isUndefined from "lodash-es/isUndefined"


interface PropertyInfoModalProps {
    id: string
}

function PropertyDetailsModal({ id }: PropertyInfoModalProps) {
	const modal = modalStore.getModal(id)

    if (isUndefined(modal)) {
        return null
    }

	return (
		<Modal
			isExpandable={true}
			currentModal={modal}>
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
