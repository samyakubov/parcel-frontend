import {DOCUMENT_TYPES, PROPERTY_TYPES} from "../Constants/Constants"

declare global {
    interface Zoning {
        zoning_districts: string[];
        commercial_overlays: string[];
        special_districts: string[];
        limited_height_district: string;
        last_updated: string;
    }

    interface LastSoldFor {
        last_sold_price: number;
        sale_date: string;
    }

    interface Owners {
        current_owners: string[];
        previous_owners: string[];
    }

    interface PropertyDetails {
        last_sold_for: LastSoldFor;
        owners: Owners;
        records: PropertyRecord[];
        permits:PulledPermit[];
        violations: Violation[];
        complaints: Complaint[];
        zoning: Zoning;
    }

    interface PropertyDetailsWithCoords extends PropertyDetails {
        coordinates:Coordinates;
    }
}

export { }
