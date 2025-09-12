"use client"
import React from "react"
import { motion } from "framer-motion"
import ModalControls from "@/components/modal/modal-controls"

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
                ? `fixed w-[90vw] h-[90vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${baseClasses}`
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
