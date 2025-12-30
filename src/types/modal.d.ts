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
    propertyData: PropertyDetails;
    publicTransit:FeatureCollection | null;
    zIndex: number;
}
