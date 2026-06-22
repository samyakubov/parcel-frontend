"use client"
import React from "react"
import { motion } from "framer-motion"
import { modalStore } from "@/stores/modal-store"
import ModalControls from "@/components/modal/modal-controls"

interface ModalContentProps {
	children: React.ReactNode;
	currentModal: PropertyModal;
}

export default function ModalContent({
	children,
	currentModal,
}: ModalContentProps) {

	const getPanelClassName = () => {
		const baseClasses = "overflow-hidden flex flex-col"
		return currentModal.isExpanded
			? `fixed inset-0 m-auto w-[90vw] h-[90vh] ${baseClasses}`
			: `fixed right-4 top-4 w-11/12 max-w-md h-[95vh] ${baseClasses}`
	}

	return (
		<motion.div
			drag={!currentModal.isExpanded}
			dragMomentum={false}
			onDragEnd={(event, info) => {
				modalStore.setModalState(currentModal.id, {
					position: {
						x: currentModal.position.x + info.offset.x,
						y: currentModal.position.y + info.offset.y
					}
				})
			}}
			initial="hidden"
			animate={{
				x: currentModal.isExpanded ? 0 : currentModal.position.x,
				y: currentModal.isExpanded ? 0 : currentModal.position.y,
				opacity: 1,
				scale: 1,
			}}
			exit="exit"
			transition={{ x: { duration: 0 }, y: { duration: 0 } }}
			className={`bg-background dark:bg-background backdrop-blur-2xl border border-white/10
			dark:border-white/10 rounded-xl shadow-xl ${getPanelClassName()}`}
			style={{
				pointerEvents: "auto",
			}}
		>
			<ModalControls
				currentModal={currentModal}
			/>

			<div className="flex-1 min-h-0 flex flex-col" onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</motion.div>
	)
}
