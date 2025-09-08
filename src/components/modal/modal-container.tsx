import React from "react"
import {modalStore} from "@/stores/modal-store";
import {observer} from "mobx-react";

interface ModalContainerProps {
    renderModal: (modal: PropertyModal) => React.ReactNode;
}

function ModalContainer({ renderModal }: ModalContainerProps) {
    const modals = modalStore._propertyModals.filter((modal)=>modal.isOpen && !modal.isMinimized)

    const sortedModals = [...modals].sort((a, b) => a.zIndex - b.zIndex)
    return (
        <>
            {sortedModals.map(modal => renderModal(modal))}
        </>
    )
}

export default observer(ModalContainer)
