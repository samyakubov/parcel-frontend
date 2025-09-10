"use client"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { modalStore } from "@/stores/modal-store"
import ModalContent from "@/components/modal/modal-content"

interface ModalProps {
    children: React.ReactNode;
    panelClassName?: string;
    isExpandable: boolean;
    modalId: string;
}

export default function Modal(props: ModalProps) {
	const {
		children,
		panelClassName,
		isExpandable,
		modalId,
	} = props


	const currentModal = modalStore.getModal(modalId)

	return (
		<AnimatePresence>
			<motion.div
				initial="hidden"
				animate="visible"
				exit="exit"
				transition={{ duration: 0.2 }}
				className="fixed inset-0 z-50 overflow-hidden"
				style={{
					pointerEvents: "none",
					x: currentModal?.position.x,
					y: currentModal?.position.y,
				}}
			>
				<ModalContent
					panelClassName={panelClassName}
					isExpandable={isExpandable}
					modalId={modalId}
				>
					{children}
				</ModalContent>
			</motion.div>
		</AnimatePresence>
	)
}
