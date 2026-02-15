"use client"
import React from "react"
import { motion } from "framer-motion"
import { modalStore } from "@/stores/modal-store"
import ModalControls from "@/components/modal/modal-controls"
import { uiStore } from "@/stores/ui-store"
import { observer } from "mobx-react"

interface ModalContentProps {
	children: React.ReactNode;
	currentModal: PropertyModal;
}

function ModalContent({
	children,
	currentModal,
}: ModalContentProps) {

	const isMobileView = uiStore.isMobileView

	const getPanelClassName = () => {
		const baseClasses = "overflow-hidden flex flex-col"


		if (isMobileView) {
			return `fixed inset-0 w-full h-full ${baseClasses}`
		}


		return currentModal.isExpanded
			? `fixed inset-0 m-auto w-[90vw] h-[90vh] ${baseClasses}`
			: `fixed right-4 top-4 w-11/12 max-w-md h-[95vh] ${baseClasses}`
	}

	const handlePanEnd = (event: unknown, info: { offset: { x: number; y: number } }) => {

		if (isMobileView && info.offset.y > 100) {

			if (event && typeof event === "object" && "preventDefault" in event && typeof event.preventDefault === "function") {
				event.preventDefault()
			}
			modalStore.minimizeModal(currentModal.id)
			return
		}


		if (!isMobileView && !currentModal.isExpanded) {
			modalStore.setModalState(currentModal.id, {
				position: {
					x: currentModal.position.x + info.offset.x,
					y: currentModal.position.y + info.offset.y
				}
			})
		}
	}

	return (
		<motion.div
			drag={!isMobileView && !currentModal.isExpanded}
			dragMomentum={false}
			onPanEnd={handlePanEnd}
			initial="hidden"
			animate={{
				x: currentModal.isExpanded || isMobileView ? 0 : currentModal.position.x,
				y: currentModal.isExpanded || isMobileView ? 0 : currentModal.position.y,
				opacity: 1,
				scale: 1,
			}}
			exit="exit"
			transition={{
				x: { duration: 0 },
				y: { duration: 0 },
				opacity: { duration: 0.2 },
				scale: { duration: 0.2 }
			}}
			className={`bg-background dark:bg-background backdrop-blur-2xl border border-white/10
			dark:border-white/10 rounded-xl shadow-xl motion-reduce:transition-none ${getPanelClassName()}`}
			style={{
				pointerEvents: "auto",
				willChange: currentModal.isMinimized ? "auto" : "transform, opacity"
			}}
		>
			<ModalControls
				currentModal={currentModal}
			/>

			<div className="overflow-y-auto" onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</motion.div>
	)
}

export default observer(ModalContent)
