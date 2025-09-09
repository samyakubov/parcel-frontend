import { action, makeAutoObservable } from "mobx"
import { v4 as uuidv4 } from "uuid"
import isUndefined from "lodash-es/isUndefined"
import {toast} from "react-toastify"

class ModalStore {
	constructor() {
		makeAutoObservable(this)
	}

	private _currentZIndex = 100

	public _propertyModals: PropertyModal[] = [{
		id: "property-modal-001",
		isOpen: true,
		isMinimized: false,
		isExpanded: false,
		coords: {
			latitude: 40.7589,
			longitude: -73.9851
		},
		title: "123 Main Street, Manhattan",
		position: {
			x: 100,
			y: 150
		},
		zIndex: 1000,
		propertyData: {
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
		}
	}]
	private getNextZIndex = (): number => {
		return ++this._currentZIndex
	}

	private setModalState = action((id: string, updates: Partial<PropertyModal>) => {
		const modalIndex = this._propertyModals.findIndex(modal => modal.id === id)
		if (modalIndex !== -1) {
			this._propertyModals[modalIndex] = {
				...this._propertyModals[modalIndex],
				...updates as Partial<PropertyModal>
			}
		}
	})

	public getModal = (id: string): PropertyModal | undefined => {
		return this._propertyModals.find(modal => modal.id === id)
	}

	private calculateNewModalPosition = (): { x: number, y: number } => {
		const MODAL_WIDTH = 465
		const START_X = 0
		const START_Y = 0

		const activeModals = this._propertyModals.filter(modal =>
			modal.isOpen && !modal.isMinimized
		)

		if (activeModals.length === 0) {
			return { x: START_X, y: START_Y }
		}

		const occupiedXPositions = new Set(
			activeModals.map(modal => modal.position.x)
		)

		for (let x = START_X; x >= -1395; x -= MODAL_WIDTH) {
			if (!occupiedXPositions.has(x)) {
				return { x, y: START_Y }
			}
		}

		return { x: START_X, y: START_Y }
	}

	public addPropertyModal = action((coords: Coordinates, title: string, propertyData: PropertyDetails) => {
		if (this._propertyModals.length >= 8) {
			return toast.info("Modal limit reached. Close one to open more")
		}

		const existingModal = this._propertyModals.find(modal => modal.title === title)

		if (!isUndefined(existingModal)) {
			if (existingModal.isMinimized) {
				existingModal.isMinimized = false
				existingModal.isOpen = true
			}
			existingModal.propertyData = propertyData
			existingModal.zIndex = this.getNextZIndex()
			return existingModal.id
		}

		const newPosition = this.calculateNewModalPosition()

		const newModal: PropertyModal = {
			id: uuidv4(),
			isOpen: true,
			isMinimized: false,
			isExpanded: false,
			coords,
			title,
			position: newPosition,
			propertyData,
			zIndex: this.getNextZIndex()
		}

		this._propertyModals.push(newModal)
		return newModal.id
	})

	public focusModal = action((id: string) => {
		const modal = this.getModal(id)
		if (modal && !modal.isMinimized) {
			modal.zIndex = this.getNextZIndex()
		}
	})

	public minimizeModal = action((id: string) => {
		if (this._propertyModals.filter((modal)=>modal.isMinimized).length >= 4) {
			return toast.info("You can only have 4 minimized modals. Please close one before minimizing another.")
		}
		this.setModalState(id, { isMinimized: true })
	})

	public restoreModal = action((id: string) => {
		this.setModalState(id, {
			isMinimized: false,
			isOpen: true,
			zIndex: this.getNextZIndex()
		})
	})

	public toggleModalExpand = action((id: string) => {
		const modal = this.getModal(id)
		if (modal) {
			this.setModalState(id, {
				isExpanded: !modal.isExpanded,
				position: { x: 0, y: 0 }
			})
		}
	})

	public updateModalPosition = action((id: string, position: ModalPosition) => {
		this.setModalState(id, { position })
	})

	public closeModal = action((id: string, ) => {
		const propertyIndex = this._propertyModals.findIndex(modal => modal.id === id)
		if (propertyIndex !== -1) {
			this._propertyModals.splice(propertyIndex, 1)
		}
	})
}

export const modalStore = new ModalStore()
