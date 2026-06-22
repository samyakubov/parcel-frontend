"use client"
import React from "react"
import ExpandModalButton from "@/components/modal/modal-control-buttons/expand-modal-button"
import MinimizeButton from "@/components/modal/modal-control-buttons/minimize-button"
import CloseButton from "@/components/modal/modal-control-buttons/close-button"

interface ModalControlsProps {
	currentModal: PropertyModal
}

export default function ModalControls({
	currentModal,
}: ModalControlsProps) {

	return (
		<div className="flex gap-0.5 absolute top-3 right-3 z-10 bg-black/35 backdrop-blur-sm rounded-lg px-1 py-0.5 text-white [&_button]:hover:bg-white/20 [&_button]:text-white">
			<MinimizeButton currentModal={currentModal} />
			<ExpandModalButton currentModal={currentModal} />
			<CloseButton currentModal={currentModal} />
		</div>
	)
}
