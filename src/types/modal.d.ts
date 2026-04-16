
declare global {
	interface ModalPosition {
		x: number;
		y: number;
	}

	type ModalTab = "details" | "owners" | "mortgage" | "violations" | "complaints" | "jobs" | "schools" | "census" | "records"

	interface PropertyModal {
		id: string;
		isOpen: boolean;
		isMinimized: boolean;
		isExpanded: boolean;
		activeTab: ModalTab;
		title: string;
		position: ModalPosition;
		propertyData: PropertyDetailsWithCoords;
		census: CensusDemographicDataResponse | null | undefined;
		routesNearBy: Route[] | null | undefined;
		stopsNearBy: Stop[] | null | undefined;
		schools: School[] | null | undefined;
		zIndex: number;
	}

	type SortConfig = {
		key: keyof PropertyRecord
		direction: "asc" | "desc"
	} | null

	type ColumnConfig = {
		key: keyof PropertyRecord
		label: string
		sortable: boolean
	}

}

export {}

