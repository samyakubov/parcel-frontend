interface ModalPosition {
    x: number;
    y: number;
}

interface PropertyModal {
    id: string;
    isOpen: boolean;
    isMinimized: boolean;
    isExpanded: boolean;
    title: string;
    position: ModalPosition;
    propertyData: PropertyDetailsWithCoords;
    routesNearBy:Route[] | null;
    stopsNearBy:Stop[] | null;
    zIndex: number;
}
