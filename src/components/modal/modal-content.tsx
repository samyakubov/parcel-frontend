"use client"
import React from "react"
import { motion } from "framer-motion"
import { modalStore } from "@/stores/modal-store"
import ModalControls from "@/components/modal/modal-controls"

interface ModalContentProps {
	children: React.ReactNode;
	isExpandable: boolean;
	currentModal: PropertyModal;
}

export default function ModalContent({
	children,
	isExpandable,
	currentModal,
}: ModalContentProps) {

	const getPanelClassName = () => {
		const baseClasses = "overflow-hidden flex flex-col"
		if (isExpandable) {
			return currentModal.isExpanded
				? `fixed inset-0 m-auto w-[90vw] h-[90vh] ${baseClasses}`
				: `fixed right-4 top-4 w-11/12 max-w-md h-[95vh] ${baseClasses}`
		}
	}
	return (
		<motion.div
			drag={!currentModal.isExpanded}
			dragMomentum={false}
			onDragEnd={(event, info) => {
				modalStore.updateModalPosition(currentModal.id, {
					x: currentModal.position.x + info.offset.x,
					y: currentModal.position.y + info.offset.y
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
			className={`bg-background/80 dark:bg-background/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-xl shadow-2xl ${getPanelClassName()}`}
			style={{
				pointerEvents: "auto",
			}}
		>
			<ModalControls
				currentModal={currentModal}
				isExpandable={isExpandable}
			/>

			<div className="overflow-y-auto" onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</motion.div>
	)
}
