"use client"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import ModalContent from "@/components/modal/modal-content"

interface ModalProps {
    children: React.ReactNode;
    isExpandable: boolean;
    currentModal: PropertyModal;
}

export default function Modal({
  children,
  isExpandable,
  currentModal,
}: ModalProps) {

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
					isExpandable={isExpandable}
					currentModal={currentModal}
				>
					{children}
				</ModalContent>
			</motion.div>
		</AnimatePresence>
	)
}
