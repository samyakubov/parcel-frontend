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
    routesNearBy: Route[] | null | undefined;
    stopsNearBy: Stop[] | null | undefined;
    schools: School[] | null | undefined;
    zIndex: number;
}
