import React from "react"
import { observer } from "mobx-react"
import { useModalManagerContext } from "../../Contexts/ModalManagerContext"

interface ModalContainerProps {
	isRelatedPropertyContainer?: boolean;
	renderModal: (modal: PropertyModal | RelatedPropertyModal) => React.ReactNode;
}

function ModalContainer({ isRelatedPropertyContainer = false, renderModal }: ModalContainerProps) {
	const modalManagerContext = useModalManagerContext()
	const modals = isRelatedPropertyContainer
		? modalManagerContext.relatedPropertyModals.filter((modal)=>modal.isOpen && !modal.isMinimized)
		: modalManagerContext.propertyModals.filter((modal)=>modal.isOpen && !modal.isMinimized)

	const sortedModals = [...modals].sort((a, b) => a.zIndex - b.zIndex)
	return (
		<>
			{sortedModals.map(modal => renderModal(modal))}
		</>
	)
}

export default observer(ModalContainer)
