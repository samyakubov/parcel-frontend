"use client"
import React, {useEffect, useRef, useCallback, useState} from "react"
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

	const modalPosition = currentModal?.position || { x: 0, y: 0 }
	const lastPositionRef = useRef<ModalPosition>(modalPosition)
	const dragStartRef = useRef<ModalDragStart>({ x: 0, y: 0, dragX: 0, dragY: 0 })
	const [dragPosition, setDragPosition] = useState<ModalPosition>(modalPosition || { x: 0, y: 0 })

	const [isDragging, setIsDragging] = useState(false)
	const prevPositionRef = useRef<ModalPosition | null>(null)

	const handleMouseMove = useCallback((e: MouseEvent) => {
		if (isDragging) {
			const newX = e.clientX - dragStartRef.current.x
			const newY = e.clientY - dragStartRef.current.y
			setDragPosition({ x: newX, y: newY })
		}
	}, [isDragging])

	useEffect(() => {
		if (modalPosition &&
            (!prevPositionRef.current ||
                (prevPositionRef.current.x !== modalPosition.x ||
                    prevPositionRef.current.y !== modalPosition.y)) &&
            !isDragging) {
			prevPositionRef.current = modalPosition
			setDragPosition(modalPosition)
		}
	}, [modalPosition?.x, modalPosition?.y, isDragging])

	useEffect(() => {
		if (isDragging) {
			window.addEventListener("mousemove", handleMouseMove)
		}
		return () => {
			window.removeEventListener("mousemove", handleMouseMove)
		}
	}, [isDragging, handleMouseMove])

	const handleMouseDown = (e: React.MouseEvent) => {
		if (e.target instanceof Element &&
            !e.target.closest("button") &&
            !e.target.closest("input") &&
            !e.target.closest("select") &&
            !e.target.closest("textarea")) {
			setIsDragging(true)
			dragStartRef.current = {
				x: e.clientX - dragPosition.x,
				y: e.clientY - dragPosition.y,
				dragX: dragPosition.x,
				dragY: dragPosition.y
			}
		}
	}

	const handlePositionChange = useCallback((newPosition: ModalPosition) => {
		if (!isUndefined(currentModal) && (newPosition.x !== lastPositionRef.current.x || newPosition.y !== lastPositionRef.current.y)) {
			lastPositionRef.current = newPosition
			modalStore.updateModalPosition(modalId, newPosition)
		}
	}, [currentModal, modalId, modalStore])

	useEffect(() => {
		if (!isDragging && (dragPosition.x !== 0 || dragPosition.y !== 0)) {
			handlePositionChange(dragPosition)
		}
	}, [isDragging, dragPosition, handlePositionChange])


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
					transition={{ x: { duration: 0 }, y: { duration: 0 } }}
					className={`bg-background rounded-lg shadow-lg ${panelClassName}`}
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
