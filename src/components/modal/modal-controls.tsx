"use client"
import React from "react"
import ExpandModalButton from "@/components/modal/modal-control-buttons/expand-modal-button"
import MinimizeButton from "@/components/modal/modal-control-buttons/minimize-button"
import CloseButton from "@/components/modal/modal-control-buttons/close-button"

interface ModalControlsProps {
    isExpandable?: boolean
    isExpanded?: boolean
    setIsExpanded?: (isExpanded: boolean) => void
    onClose: () => void
    onMinimize?: () => void
    className?: string
}

export default function ModalControls({
	isExpandable = false,
	isExpanded,
	setIsExpanded,
	onClose,
	onMinimize,
	className = "",
}: ModalControlsProps) {

	return (
		<div className={`flex gap-2 ${className}`}>
			<MinimizeButton onMinimize={onMinimize} />

			<ExpandModalButton
				setIsExpanded={setIsExpanded}
				isExpandable={isExpandable}
				isExpanded={isExpanded}
			/>

			<CloseButton onClose={onClose} />
		</div>
	)
}
