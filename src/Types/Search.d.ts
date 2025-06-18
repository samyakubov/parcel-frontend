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

	interface owners{
		current_owners: string[];
		previous_owners: string[];
	}

	interface PropertyDetails {
		last_sold_for: LastSoldFor;
		owners: owners;
		records: PropertyRecord[];
		permits:PulledPermit[];
		violations: Violation[];
		complaints: Complaint[];
		zoning: Zoning;
	}

	interface PropertyDetailsWithCoords extends PropertyDetails {
		coordinates:Coordinates;
	}

	interface PartyDetails {
		current_address: string;
		records: PropertyRecord[];
	}

	interface AdvancedSearchResponse {
		records:PropertyRecord[];
	}

	interface RelatedPropertySummary {
		documentid: string;
		party_name: string;
		prop_streetnumber: string;
		prop_streetname: string;
		prop_unit: string | null;
		recordedfiled: string;
		party_address1: string;
		prop_type: string;
		bbl: string;
		last_sold_for: LastSoldFor;
	}

	interface RelatedPropertiesResponse {
		coordinates: Coordinates[]
		related_properties_summary: RelatedPropertySummary[]
	}

	export type DocumentType = typeof DOCUMENT_TYPES[number];

	export type PropertyType = typeof PROPERTY_TYPES[number];

	interface AdvancedSearchFilter {
		document_type: DocumentType;
		year_filed_start:number;
		year_filed_end:number;
		property_type: PropertyType;
		from_amount:number;
		to_amount:number;
		zip_code:string;
		party_type?:string;
	}

	interface Analytics {
		prices:PriceDataPoint[];
		recent_sales:PropertyRecord[]
	}
}

export { }
