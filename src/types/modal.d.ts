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
    savedPosition?: ModalPosition; // Store position before expanding
    propertyData: PropertyDetails;
    zIndex: number;
}
