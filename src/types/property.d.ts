
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
        recordedfiled: string;
    }

    interface Violation {
        bbl: string;
        violation_status: string;
        issuedate: string;
        violationtype: string;
        description: string;
        severity: string;
        penalty_amount: number;
        amountpaid: number;
        balancedue: number;
        respondentname: string;
        house_number: string;
        street: string;
        city: string;
        zip: string;
    }

    interface Complaint {
        complaint_number: number;
        status: string;
        date_entered: string;
        house_number: string;
        zipcode: string;
        house_street: string;
        bin: string;
        community_board: number;
        special_district: string;
        complaint_category: string;
        unit: string;
        disposition_date: string;
        disposition_code: string;
        inspection_date: string;
        dobrun_date: string;
    }

    interface JobFiled {
        job: number;
        jobdescription: string;
        approved: string;
        bin: string;
    }
}

export { }
