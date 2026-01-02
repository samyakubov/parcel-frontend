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
    routesNearBy:Route[] | null;
    stopsNearBy:Stop[] | null;
    zIndex: number;
}
