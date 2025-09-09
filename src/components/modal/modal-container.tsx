"use client"
import React from "react"
import {modalStore} from "@/stores/modal-store"
import {observer} from "mobx-react"
import PropertyDetailsModal from "@/components/property-details-modal"


function ModalContainer() {
	const modals = modalStore._propertyModals.filter((modal)=>modal.isOpen && !modal.isMinimized)

	const sortedModals = [...modals].sort((a, b) => a.zIndex - b.zIndex)

	return sortedModals.map(modal => <PropertyDetailsModal id={modal.id} key={modal.id} />)
}

export default observer(ModalContainer)
