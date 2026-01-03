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
    routesNearBy:Route[];
    stopsNearBy:Stop[];
    schools:School[];
    zIndex: number;
}
