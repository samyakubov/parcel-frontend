"use client"
import React, { useEffect, useState } from "react"
import {modalStore} from "@/stores/modal-store"
import {observer} from "mobx-react"
import PropertyDetailsModal from "@/components/property-details-modal/property-details-modal"
import {uiStore} from "@/stores/ui-store"


function ModalContainer() {
	const [isMounted, setIsMounted] = useState(false)
	const isMobileView = uiStore.isMobileView
	const modals = modalStore._propertyModals.filter((modal)=>modal.isOpen && !modal.isMinimized)

	// Handle hydration - only use mobile detection after mount
	useEffect(() => {
		setIsMounted(true)
	}, [])

	// Update active mobile panel state when modals change
	useEffect(() => {
		if (!isMounted) return

		if (isMobileView && modals.length > 0) {
			if (uiStore._activeMobilePanel !== "modal") {
				uiStore.setActiveMobilePanel("modal")
			}
		} else if (isMobileView && modals.length === 0) {
			if (uiStore._activeMobilePanel === "modal") {
				uiStore.closeAllMobilePanels()
			}
		}
	}, [isMobileView, modals.length, isMounted])

	// On mobile, only show one modal at a time (the one with highest z-index)
	let visibleModals = modals
	if (isMounted && isMobileView && modals.length > 0) {
		// Find the modal with the highest z-index (most recently focused)
		const activeModal = modals.reduce((prev, current) =>
			(current.zIndex > prev.zIndex) ? current : prev
		)
		visibleModals = [activeModal]
	}

	const sortedModals = [...visibleModals].sort((a, b) => a.zIndex - b.zIndex)

	return sortedModals.map(modal => <PropertyDetailsModal id={modal.id} key={modal.id} />)
}

export default observer(ModalContainer)
