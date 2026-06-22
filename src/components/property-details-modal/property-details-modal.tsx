"use client"
import React from "react"
import { modalStore } from "@/stores/modal-store"
import Modal from "@/components/modal/modal"
import { observer } from "mobx-react"
import PropertyDetailsModalContent from "@/components/property-details-modal/property-details-modal-content"
import isUndefined from "lodash-es/isUndefined"
import {ExportPDFButton} from "@/components/property-details-modal/export-to-pdf-button"


interface PropertyInfoModalProps {
	id: string
}

function PropertyDetailsModal({ id }: PropertyInfoModalProps) {
	const modal = modalStore.getModal(id)

	if (isUndefined(modal)) {
		return null
	}

	return (
		<Modal modal={modal}>
			<PropertyDetailsModalContent modal={modal}/>
			<div className="absolute bottom-4 right-4 z-10">
				<ExportPDFButton data={modal}/>
			</div>
		</Modal>
	)
}

export default observer(PropertyDetailsModal)
