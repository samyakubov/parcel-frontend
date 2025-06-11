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

interface Coordinates {
  latitude: number;
  longitude: number;
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

interface RelatedPropertyModal {
  id: string;
  isOpen: boolean;
  isMinimized: boolean;
  isExpanded: boolean;
  title: string;
  position: ModalPosition;
  relatedPropertyData: RelatedPropertySummary[];
  zIndex: number;
}
interface RelatedPropertySummary {
  address: string;
  borough: string;
  block: string;
  lot: string;
}
