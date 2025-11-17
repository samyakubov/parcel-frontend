"use client"
import React from "react"
import { motion } from "framer-motion"
import ModalControls from "@/components/modal/modal-controls"
import { modalStore } from "@/stores/modal-store"

interface ModalContentProps {
    children: React.ReactNode;
    isExpandable: boolean;
    currentModal: PropertyModal;
}

export default function ModalContent ({
	children,
	isExpandable,
	currentModal,
} : ModalContentProps) {

    const getPanelClassName = () => {
        const baseClasses = "overflow-hidden flex flex-col"
        if (isExpandable) {
            return currentModal.isExpanded
                ? `fixed w-[90vw] h-[90vh] top-[5vh] left-[5vw] ${baseClasses}`
                : `fixed right-4 top-4 w-11/12 max-w-md h-[95vh] ${baseClasses}`
        }
    }

	return (
		<motion.div
			drag={!currentModal.isExpanded}
			dragMomentum={false}
			dragConstraints={{ left: -window.innerWidth + 100, right: 100, top: 0, bottom: window.innerHeight - 100 }}
			onMouseDown={() => modalStore.focusModal(currentModal.id)}
			onDragEnd={(_, info) => {
				// Save drag position so it's preserved when expanding/collapsing
				if (!currentModal.isExpanded) {
					modalStore.updateModalPosition(currentModal.id, {
						x: currentModal.position.x + info.offset.x,
						y: currentModal.position.y + info.offset.y
					})
				}
			}}
			initial="hidden"
			animate="visible"
			exit="exit"
			transition={{ x: { duration: 0 }, y: { duration: 0 } }}
			className={`bg-background rounded-lg shadow-lg ${getPanelClassName()}`}
			style={{
				pointerEvents: "auto",
				x: currentModal.position.x,
				y: currentModal.position.y,
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
