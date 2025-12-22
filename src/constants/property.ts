
export const COMPLAINT_COLUMNS:string[] = [
	"Status",
	"Category",
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

export const JOBS_COLUMNS = [
    "Job Description",
    "Applicant Name",
	"Applicant Professional Title",
	"Job Status",
	"Job Type"
]


export const PROPERTY_RECORD_GRID_COLUMNS = [
	"House Number",
	"Street",
	"Unit",
	"BBL",
	"Amount",
	"Property Type",
	"Party Name",
	"Party",
	"Document Type",
	"Recorded Date"
] as const
