"use client"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import ModalContent from "@/components/modal/modal-content"

interface ModalProps {
	children: React.ReactNode;
	modal: PropertyModal;
}

export default function Modal({
	children,
	modal,
}: ModalProps) {

	return (
		<AnimatePresence>
			<motion.div
				initial="hidden"
				animate="visible"
				exit="exit"
				transition={{ duration: 0.2 }}
				className={"fixed inset-0 overflow-hidden"}
				style={{
					pointerEvents: "none",
					zIndex: modal.zIndex
				}}
			>
				<ModalContent currentModal={modal} >
					{children}
				</ModalContent>
			</motion.div>
		</AnimatePresence>
	)
}
