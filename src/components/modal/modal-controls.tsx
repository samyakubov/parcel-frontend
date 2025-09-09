"use client"
import React from "react"
import { Minus, X } from "lucide-react"
import { motion } from "framer-motion"
import ExpandModalButton from "@/components/modal/expand-modal-button"

interface ModalControlsProps {
    isExpandable?: boolean;
    isExpanded?: boolean;
    setIsExpanded?: (isExpanded: boolean) => void;
    onClose: () => void;
    onMinimize?: () => void;
    className?: string;
}

export default function ModalControls(props: ModalControlsProps) {
	const {isExpandable = false, isExpanded, setIsExpanded, onClose, onMinimize, className = ""} = props

	return (
		<div className={`modal-controls ${className}`}>
			{onMinimize && (
				<motion.button
					onClick={onMinimize}
					className="modal-control-btn modal-control-btn--minimize"
					aria-label="Minimize window"
					whileHover={{ scale: 1.05, y: -1 }}
					whileTap={{ scale: 0.95 }}
					transition={{ duration: 0.15 }}
				>
					<Minus size={16} />
				</motion.button>
			)}

			<ExpandModalButton setIsExpanded={setIsExpanded} isExpandable={isExpandable} isExpanded={isExpanded}/>

			<motion.button
				onClick={onClose}
				className="modal-control-btn modal-control-btn--close"
				aria-label="Close modal"
				whileHover={{ scale: 1.05, y: -1 }}
				whileTap={{ scale: 0.95 }}
				transition={{ duration: 0.15 }}
			>
				<X size={16} />
			</motion.button>
		</div>
	)
}
