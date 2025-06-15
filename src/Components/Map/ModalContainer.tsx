import React from "react"
import { observer } from "mobx-react"
import {modalStore} from "../../Stores/ModalStore"

interface ModalContainerProps {
	isRelatedPropertyContainer?: boolean;
	renderModal: (modal: PropertyModal | RelatedPropertyModal) => React.ReactNode;
}

function ModalContainer({ isRelatedPropertyContainer = false, renderModal }: ModalContainerProps) {
	const modals = isRelatedPropertyContainer
		? modalStore.relatedPropertyModals.filter((modal)=>modal.isOpen && !modal.isMinimized)
		: modalStore.propertyModals.filter((modal)=>modal.isOpen && !modal.isMinimized)

	const sortedModals = [...modals].sort((a, b) => a.zIndex - b.zIndex)
	return (
		<>
			{sortedModals.map(modal => renderModal(modal))}
		</>
	)
}

export default observer(ModalContainer)
