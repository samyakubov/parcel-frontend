import React, {useEffect, useRef, useCallback} from "react"
import { motion, AnimatePresence } from "framer-motion"
import ModalControls from "./Modal/ModalControls"
import useModalDrag from "../Hooks/DialogModal/useModalDrag"
import {useModalManagerContext} from "../Contexts/ModalManagerContext"
import isUndefined from "lodash-es/isUndefined"

interface DialogModalProps {
	open: boolean;
	children: React.ReactNode;
	panelClassName?: string;
	isExpandable: boolean;
	modalId: string;
	isRelatedPropertyModal?: boolean;
}

export default function Modal(props: DialogModalProps) {
	const modalManagerContext = useModalManagerContext()
	const {
		children,
		panelClassName,
		isExpandable,
		modalId,
		isRelatedPropertyModal = false
	} = props

	const currentModal = isRelatedPropertyModal ? modalManagerContext.getCurrentRelatedPropertyModal(modalId) : modalManagerContext.getCurrentPropertyModal(modalId)

	const modalPosition = currentModal?.position || { x: 0, y: 0 }
	const isModalOpen = !!currentModal?.isOpen
	const isModalExpanded = !!currentModal?.isExpanded
	const lastPositionRef = useRef<ModalPosition>(modalPosition)

	const {
		dragPosition,
		isDragging,
		handleMouseDown,
	} = useModalDrag(modalPosition)

	const handleClose = () => {
		if (!isUndefined(currentModal)) {
			modalManagerContext.closeModal(modalId, isRelatedPropertyModal)
		}
	}

	const handleMinimize = () => {
		if (!isUndefined(currentModal)) {
			modalManagerContext.minimizeModal(modalId, isRelatedPropertyModal)
		}
	}

	const handleExpand = () => {
		if (!isUndefined(currentModal)) {
			modalManagerContext.toggleModalExpand(modalId, isRelatedPropertyModal)
		}
	}

	const handlePositionChange = useCallback((newPosition: ModalPosition) => {
		if (!isUndefined(currentModal) && (newPosition.x !== lastPositionRef.current.x || newPosition.y !== lastPositionRef.current.y)) {
			lastPositionRef.current = newPosition
			modalManagerContext.updateModalPosition(modalId, newPosition, isRelatedPropertyModal)
		}
	}, [currentModal, modalId, modalManagerContext, isRelatedPropertyModal])

	useEffect(() => {
		if (!isDragging && (dragPosition.x !== 0 || dragPosition.y !== 0)) {
			handlePositionChange(dragPosition)
		}
	}, [isDragging, dragPosition, handlePositionChange])


	const modalVariants = {
		hidden: { opacity: 0, scale: 0.9, y: -20 },
		visible: {
			opacity: 1,
			scale: 1,
			x: dragPosition.x,
			y: dragPosition.y,
		},
		exit: {
			opacity: 0,
			scale: 0.3,
			y: 50,
			transition: {
				duration: 0.3,
				ease: [0.42, 0, 0.58, 1],
			}
		}
	}


	if (!isModalOpen) {
		return null
	}

	return (
		<AnimatePresence>
			<motion.div
				initial="hidden"
				animate="visible"
				exit="exit"
				transition={{ duration: 0.2 }}
				className="fixed inset-0 z-50 overflow-hidden"
				style={{ pointerEvents: "none" }}
			>
				<motion.div
					initial="hidden"
					animate="visible"
					exit="exit"
					variants={modalVariants}
					transition={{ x: { duration: 0 }, y: { duration: 0 } }}
					className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg ${panelClassName}`}
					style={{
						pointerEvents: "auto",
						transformOrigin: "center top"
					}}
					onMouseDown={(e) => {
						handleMouseDown(e)
						e.stopPropagation()
					}}
				>
					<ModalControls
						className="absolute top-4 right-4 z-10"
						isExpandable={isExpandable}
						isExpanded={isModalExpanded}
						setIsExpanded={handleExpand}
						onClose={handleClose}
						onMinimize={handleMinimize}
					/>
					<div className="overflow-y-auto" onClick={(e) => e.stopPropagation()}>
						{children}
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	)
}
