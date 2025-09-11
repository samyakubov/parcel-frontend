interface ModalPosition {
    x: number;
    y: number;
}

interface ModalDragStart {
    x: number;
    y: number;
    dragX: number;
    dragY: number;
}

interface PropertyModal {
    id: string;
    isOpen: boolean;
    isMinimized: boolean;
    isExpanded: boolean;
    coords: Coordinates;
    title: string;
    position: ModalPosition;
    propertyData: PropertyDetails;
    zIndex: number;
}

