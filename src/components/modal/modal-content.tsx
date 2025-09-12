"use client"
import React from "react"
import { motion } from "framer-motion"
import isUndefined from "lodash-es/isUndefined"
import { modalStore } from "@/stores/modal-store"
import ModalControls from "@/components/modal/modal-controls"

interface ModalContentProps {
    children: React.ReactNode;
    isExpandable: boolean;
    modalId: string;
}

export default function ModalContent ({
	children,
	isExpandable,
	modalId,
} : ModalContentProps) {

	const currentModal = modalStore.getModal(modalId)
    if (isUndefined(currentModal)) {
        return
    }

    const getPanelClassName = () => {
        const baseClasses = "overflow-hidden flex flex-col"
        if (isExpandable) {
            return currentModal.isExpanded
                ? `fixed left-20 right-4 top-4 bottom-4 ${baseClasses}`
                : `fixed right-4 top-4 w-11/12 max-w-md h-[95vh] ${baseClasses}`
        }
        return `fixed right-4 top-4 w-11/12 max-w-md h-[95vh] ${baseClasses}`
    }
	return (
		<motion.div
			drag
			dragMomentum={false}
			initial="hidden"
			animate="visible"
			exit="exit"
			transition={{ x: { duration: 0 }, y: { duration: 0 } }}
			className={`bg-background rounded-lg shadow-lg ${getPanelClassName()}`}
			style={{
				pointerEvents: "auto",
				transformOrigin: "center top",
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
