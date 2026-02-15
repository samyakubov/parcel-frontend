"use client"
import React from "react"
import ExpandModalButton from "@/components/modal/modal-control-buttons/expand-modal-button"
import MinimizeButton from "@/components/modal/modal-control-buttons/minimize-button"
import CloseButton from "@/components/modal/modal-control-buttons/close-button"
import { uiStore } from "@/stores/ui-store"
import { observer } from "mobx-react"

interface ModalControlsProps {
	currentModal: PropertyModal
}

function ModalControls({
	currentModal,
}: ModalControlsProps) {
	const isMobileView = uiStore.isMobileView

	return (
		<div className={"flex gap-2 absolute top-4 right-4 z-10"}>
			<MinimizeButton currentModal={currentModal} />
			{!isMobileView && (
				<ExpandModalButton
					currentModal={currentModal}
				/>
			)}
			<CloseButton currentModal={currentModal} />
		</div>
	)
}

export default observer(ModalControls)
