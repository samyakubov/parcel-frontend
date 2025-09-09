"use client"
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import isUndefined from "lodash-es/isUndefined"
import {modalStore} from "@/stores/modal-store"
import ModalControls from "@/components/modal/modal-controls"

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
				<motion.div
					drag
					dragMomentum={false}
					initial="hidden"
					animate="visible"
					exit="exit"
					transition={{ x: { duration: 0 }, y: { duration: 0 } }}
					className={`bg-background rounded-lg shadow-lg ${panelClassName}`}
					style={{
						pointerEvents: "auto",
						transformOrigin: "center top",
					}}
				>
					<ModalControls
						className="absolute top-4 right-4 z-10"
						isExpandable={isExpandable}
						isExpanded={currentModal?.isExpanded}
						setIsExpanded={()=>{
							if (!isUndefined(currentModal)) {
								modalStore.toggleModalExpand(modalId)
							}
						}}
						onClose={()=>{
							if (!isUndefined(currentModal)) {
								modalStore.closeModal(modalId)
							}
						}}
						onMinimize={()=>{
							if (!isUndefined(currentModal)) {
								modalStore.minimizeModal(modalId)
							}
						}}
					/>
					<div className="overflow-y-auto" onClick={(e) => e.stopPropagation()}>
						{children}
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	)
}
