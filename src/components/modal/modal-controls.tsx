"use client"

import React from "react"
import { Minus, X } from "lucide-react"
import { motion } from "framer-motion"
import ExpandModalButton from "@/components/modal/expand-modal-button"
import { Button } from "@/components/ui/button"

interface ModalControlsProps {
    isExpandable?: boolean
    isExpanded?: boolean
    setIsExpanded?: (isExpanded: boolean) => void
    onClose: () => void
    onMinimize?: () => void
    className?: string
}

export default function ModalControls(props: ModalControlsProps) {
	const {
		isExpandable = false,
		isExpanded,
		setIsExpanded,
		onClose,
		onMinimize,
		className = "",
	} = props

	return (
		<div className={`flex gap-2 ${className}`}>
			{onMinimize && (
				<Button
					asChild
					size="icon"
					variant="ghost"
					aria-label="Minimize window"
				>
					<motion.div
						onClick={onMinimize}
						whileHover={{ scale: 1.05, y: -1 }}
						whileTap={{ scale: 0.95 }}
						transition={{ duration: 0.15 }}
					>
						<Minus size={16} />
					</motion.div>
				</Button>
			)}

			<ExpandModalButton
				setIsExpanded={setIsExpanded}
				isExpandable={isExpandable}
				isExpanded={isExpanded}
			/>

			<Button
				asChild
				size="icon"
				variant="ghost"
				aria-label="Close modal"
			>
				<motion.div
					onClick={onClose}
					whileHover={{ scale: 1.05, y: -1 }}
					whileTap={{ scale: 0.95 }}
					transition={{ duration: 0.15 }}
				>
					<X size={16} />
				</motion.div>
			</Button>
		</div>
	)
}
