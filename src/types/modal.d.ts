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
    census: CensusDemographicDataResponse | null | undefined;
    routesNearBy: Route[] | null | undefined;
    stopsNearBy: Stop[] | null | undefined;
    schools: School[] | null | undefined;
    zIndex: number;
}
