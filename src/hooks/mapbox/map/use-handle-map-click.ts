import { useCallback, useRef } from "react"
import isNull from "lodash-es/isNull"
import { mapStore } from "@/stores/map-store"
import mapboxgl from "mapbox-gl"
import {modalStore} from "@/stores/modal-store"

export default function useHandleMapClick(mapRef: React.RefObject<mapboxgl.Map | null>) {
	const markerRef = useRef<mapboxgl.Marker | null>(null)

	return useCallback((e: mapboxgl.MapMouseEvent) => {
		if (isNull(mapRef.current)) return
		const { lng, lat } = e.lngLat

		try {
			mapStore.setCoords({ latitude: lat, longitude: lng })
			if (!isNull(markerRef.current)) {
				markerRef.current.remove()
			}

			const mainMarker = new mapboxgl.Marker()
			const mainEl = mainMarker.getElement()
			mainEl.style.opacity = "0"
			mainEl.style.transition = "opacity 0.5s"

			mainMarker.setLngLat([lng, lat]).addTo(mapRef.current)
			setTimeout(() => (mainEl.style.opacity = "1"), 50)

			markerRef.current = mainMarker

			mapRef.current.flyTo({
				center: [lng, lat],
				zoom: 18,
				duration: 3000,
				essential: true,
				curve: 1.42,
			})

			modalStore.addPropertyModal({latitude: lat, longitude: lng}, "test" + Math.floor(Math.random() * 1000), {
				last_sold_for: {
					last_sold_price: 2850000,
					sale_date: "2022-03-15"
				},
				owners: {
					current_owners: [
						"NYC PROPERTY MANAGEMENT LLC",
						"MAIN STREET HOLDINGS CORP"
					],
					previous_owners: [
						"SMITH FAMILY TRUST",
						"DOWNTOWN REALTY GROUP",
						"ORIGINAL DEVELOPER INC"
					]
				},
				zoning: {
					zoning_districts: ["R7-2", "C1-4"],
					commercial_overlays: ["C1-4"],
					special_districts: ["Midtown East Subdistrict"],
					limited_height_district: "LH-1A",
					last_updated: "2023-08-15"
				},
				records: [
					{
						documentid: "FT_0790000293456",
						bbl: "1012340056",
						amount: 2850000,
						prop_borough: 1,
						prop_block: 1234,
						prop_lot: 56,
						prop_unit: null,
						prop_streetnumber: "123",
						prop_streetname: "MAIN STREET",
						prop_partiallot: "N",
						prop_type: "CONDO",
						party_borough: "MANHATTAN",
						partytype_desc: "BUYER",
						party_name: "NYC PROPERTY MANAGEMENT LLC",
						party_address1: "456 BUSINESS AVE",
						party_address2: "SUITE 100",
						party_country: "US",
						party_city: "NEW YORK",
						party_state: "NY",
						party_zip: "10001",
						doc_type: "DEED",
						recordedfiled: "2022-03-15"
					},
					{
						documentid: "FT_0780000189123",
						bbl: "1012340056",
						amount: 2200000,
						prop_borough: 1,
						prop_block: 1234,
						prop_lot: 56,
						prop_unit: null,
						prop_streetnumber: "123",
						prop_streetname: "MAIN STREET",
						prop_partiallot: "N",
						prop_type: "CONDO",
						party_borough: "MANHATTAN",
						partytype_desc: "SELLER",
						party_name: "SMITH FAMILY TRUST",
						party_address1: "789 PARK AVENUE",
						party_address2: null,
						party_country: "US",
						party_city: "NEW YORK",
						party_state: "NY",
						party_zip: "10021",
						doc_type: "DEED",
						recordedfiled: "2019-11-22"
					}
				],
				violations: [
					{
						bbl: "1012340056",
						violation_status: "OPEN",
						issuedate: "2024-01-15",
						violationtype: "HOUSING MAINTENANCE CODE",
						description: "Failure to maintain required heat of 68 degrees between 6AM and 10PM",
						severity: "HAZARDOUS",
						penalty_amount: 1000,
						amountpaid: 0,
						balancedue: 1000,
						respondentname: "NYC PROPERTY MANAGEMENT LLC",
						house_number: "123",
						street: "MAIN STREET",
						city: "NEW YORK",
						zip: "10001"
					},
					{
						bbl: "1012340056",
						violation_status: "RESOLVED",
						issuedate: "2023-09-10",
						violationtype: "BUILDING CODE",
						description: "Defective or missing smoke detector in apartment 3A",
						severity: "IMMEDIATELY HAZARDOUS",
						penalty_amount: 2500,
						amountpaid: 2500,
						balancedue: 0,
						respondentname: "NYC PROPERTY MANAGEMENT LLC",
						house_number: "123",
						street: "MAIN STREET",
						city: "NEW YORK",
						zip: "10001"
					},
					{
						bbl: "1012340056",
						violation_status: "OPEN",
						issuedate: "2024-02-20",
						violationtype: "ZONING RESOLUTION",
						description: "Illegal conversion of cellar space to residential use",
						severity: "NON-HAZARDOUS",
						penalty_amount: 5000,
						amountpaid: 1000,
						balancedue: 4000,
						respondentname: "NYC PROPERTY MANAGEMENT LLC",
						house_number: "123",
						street: "MAIN STREET",
						city: "NEW YORK",
						zip: "10001"
					}
				],
				complaints: [
					{
						complaint_number: 34567890,
						status: "OPEN",
						date_entered: "2024-01-15",
						house_number: "123",
						zipcode: "10001",
						house_street: "MAIN STREET",
						bin: "1234567",
						community_board: 5,
						special_district: "MIDTOWN EAST",
						complaint_category: "HEAT/HOT WATER",
						unit: "3A",
						disposition_date: "",
						disposition_code: "",
						inspection_date: "2024-01-20",
						dobrun_date: "2024-01-18"
					},
					{
						complaint_number: 34567891,
						status: "CLOSED",
						date_entered: "2023-12-05",
						house_number: "123",
						zipcode: "10001",
						house_street: "MAIN STREET",
						bin: "1234567",
						community_board: 5,
						special_district: "MIDTOWN EAST",
						complaint_category: "PLUMBING",
						unit: "2B",
						disposition_date: "2023-12-15",
						disposition_code: "CONDITION CORRECTED",
						inspection_date: "2023-12-10",
						dobrun_date: "2023-12-08"
					},
					{
						complaint_number: 34567892,
						status: "OPEN",
						date_entered: "2024-02-01",
						house_number: "123",
						zipcode: "10001",
						house_street: "MAIN STREET",
						bin: "1234567",
						community_board: 5,
						special_district: "MIDTOWN EAST",
						complaint_category: "ELEVATOR",
						unit: "LOBBY",
						disposition_date: "",
						disposition_code: "",
						inspection_date: "",
						dobrun_date: "2024-02-03"
					}
				],
				permits: [
					{
						job_filing_number: "ALT-2024-001234",
						job_description: "Install new water heater and upgrade hot water lines in basement mechanical room",
						filing_reason: "ALTERATION",
						work_type: "PLUMBING",
						permittee_s_license_type: "MASTER PLUMBER",
						applicant_license_number: "MP12345",
						applicant_first_name: "JOHN",
						applicant_last_name: "SMITH",
						applicant_business_name: "SMITH PLUMBING CORP",
						applicant_business_address: "456 CONTRACTOR ST, BROOKLYN NY 11201",
						work_permit: "PW-789456",
						approved_date: "2024-01-10",
						issued_date: "2024-01-15",
						estimated_job_costs: "15000"
					},
					{
						job_filing_number: "NB-2023-005678",
						job_description: "Roof deck installation and waterproofing membrane replacement",
						filing_reason: "NEW BUILDING",
						work_type: "GENERAL CONSTRUCTION",
						permittee_s_license_type: "GENERAL CONTRACTOR",
						applicant_license_number: "GC98765",
						applicant_first_name: "MARIA",
						applicant_last_name: "RODRIGUEZ",
						applicant_business_name: "RODRIGUEZ CONSTRUCTION LLC",
						applicant_business_address: "789 BUILDER AVE, QUEENS NY 11375",
						work_permit: "PW-654321",
						approved_date: "2023-08-15",
						issued_date: "2023-08-20",
						estimated_job_costs: "45000"
					},
					{
						job_filing_number: "SIGN-2024-002468",
						job_description: "Install new storefront signage for ground floor commercial space",
						filing_reason: "SIGN",
						work_type: "SIGN WORK",
						permittee_s_license_type: "SIGN HANGER",
						applicant_license_number: "SH13579",
						applicant_first_name: "DAVID",
						applicant_last_name: "CHEN",
						applicant_business_name: "CHEN SIGNS & GRAPHICS",
						applicant_business_address: "321 SIGN STREET, MANHATTAN NY 10010",
						work_permit: "PW-135792",
						approved_date: "2024-01-28",
						issued_date: "2024-02-05",
						estimated_job_costs: "8000"
					}
				]
			},)
		} catch (error) {
			console.error("Error handling map click:", error)
		}
	}, [mapRef])
}
