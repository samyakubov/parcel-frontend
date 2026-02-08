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
		<div className={"flex gap-2 absolute top-4 right-4 z-10"}>
			<MinimizeButton currentModal={currentModal} />

			<ExpandModalButton
				currentModal={currentModal}
			/>

			<CloseButton currentModal={currentModal} />
		</div>
	)
}
