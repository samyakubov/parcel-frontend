
declare global {
    interface Zoning {
        zoning_districts: string[];
        commercial_overlays: string[];
        special_districts: string[];
        limited_height_district: string;
        last_updated: string;
    }

    interface LastSold {
        last_sold_price: number;
        sale_date: string;
    }

    interface LastSoldWithSqft extends LastSold {
        year_built:string;
        land_sqft:string;
        gross_sqft:string;
    }

    interface Owners {
        current_owners: string[];
        previous_owners: string[];
    }

    interface PropertyDetails {
        last_sold: LastSold | LastSoldWithSqft;
        owners: Owners;
        records: PropertyRecord[];
        job_filings:JobFiled[];
        violations: Violation[];
        complaints: Complaint[];
        zoning: Zoning;
    }

    interface PropertyDetailsWithCoords extends PropertyDetails {
        coordinates:Coordinates;
    }

    interface PropertyRecord {
        documentid: string;
        bbl: string;
        amount: number;
        prop_borough: number;
        prop_block: number;
        prop_lot: number;
        prop_unit: string | null;
        prop_streetnumber: string;
        prop_streetname: string;
        prop_partiallot: string;
        prop_type: string;
        party_borough: string;
        partytype_desc: string;
        party_name: string;
        party_address1: string;
        party_address2: string | null;
        party_country: string;
        party_city: string;
        party_state: string;
        party_zip: string;
        doc_type: string;
        record_filed: string;
    }

    interface Violation {
        bbl: string;
        violation_status: string;
        issue_date: string;
        violation_type: string;
        description: string;
        severity: string;
        penalty_amount: number;
        amount_paid: number;
        balance_due: number;
        respondent_name: string;
        house_number: string;
        street: string;
        city: string;
        zip: string;
    }

    interface Complaint {
        complaint_number: number;
        bin: string;
        special_district: string;
        complaint_category: string;
        disposition_date: string;
        disposition_code: string;
        inspection_date: string;
        dobrun_date: string;
        status: string;
    }

    interface JobFiled {
        bin: number;
        job_description: string;
        applicant_first_name: string;
        applicant_last_name: string;
        applicant_professional_title:string;
        job_status: string;
        job_type: string;
    }
}

export { }
