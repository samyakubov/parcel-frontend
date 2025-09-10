
export const COMPLAINT_COLUMNS:string[] = [
	"Status",
	"Date Entered",
	"Category",
	"Unit",
	"Disposition Date",
	"Disposition Code",
	"Inspection Date"
]

export const VIOLATION_COLUMNS:string[] = [
	"Status",
	"Issue Date",
	"Type",
	"Description",
	"Severity",
	"Penalty",
	"Paid"
]

export const PERMIT_COLUMNS = [
	"Job Filing #",
	"Filing Reason",
	"Work Type",
	"Permittee License Type",
	"Applicant License #",
	"Applicant First Name",
	"Applicant Last Name",
	"Applicant Business Name",
	"Applicant Business Address",
	"Work Permit",
	"Approved Date",
	"Issued Date",
	"Job Description",
	"Estimated Job Costs",
]


export const PROPERTY_RECORD_GRID_COLUMNS = [
	{ field: "prop_streetnumber", label: "House Number" },
	{ field: "prop_streetname", label: "Street" },
	{ field: "prop_unit", label: "Unit" },
	{ field: "bbl", label: "BBL" },
	{ field: "amount", label: "Amount" },
	{ field: "prop_type", label: "Property Type" },
	{ field: "party_name", label: "Party Name" },
	{ field: "partytype_desc", label: "Party" },
	{ field: "doc_type", label: "Document Type" },
	{ field: "recordedfiled", label: "Recorded Date" }
] as const
