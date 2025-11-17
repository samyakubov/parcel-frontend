"use client"
import React from "react"
import { motion } from "framer-motion"
import ModalContent from "@/components/modal/modal-content"

interface ModalProps {
    children: React.ReactNode;
    isExpandable: boolean;
    modal: PropertyModal;
}

export default function Modal({
  children,
  isExpandable,
  modal,
}: ModalProps) {

	return (
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
			<ModalContent
				isExpandable={isExpandable}
				currentModal={modal}
			>
				{children}
			</ModalContent>
		</motion.div>
	)
}
