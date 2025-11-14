interface ModalPosition {
    x: number;
    y: number;
}

interface PropertyModal {
    id: string;
    isOpen: boolean;
    isMinimized: boolean;
    isExpanded: boolean;
    coords: Coordinates;
    title: string;
    position: ModalPosition;
    previousPosition?: ModalPosition;
    propertyData: PropertyDetails;
    zIndex: number;
}
