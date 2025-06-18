import {Building, Clock, FileText, Search} from "lucide-react"
import isNumber from "lodash-es/isNumber"

export const API_RESPONSE_LIMIT = 1000

export const PROPERTY_TYPES: string[] = [
	"1- 2 FAM WITH ATTCH GAR &/OR VACANT LAND",
	"1-2 FAMILY DWELLING WITH ATTACHED GARAGE",
	"1-2 FAMILY DWELLING WITH VACANT LAND",
	"1-3 FAMILY WITH STORE / OFFICE",
	"4 FAMILY WITH STORE / OFFICE",
	"4-6 FAMILY WITH STORE / OFFICE",
	"5-6 FAMILY WITH STORE / OFFICE",
	"ADJACENT CONDOMINIUM UNIT TO BE COMBINED",
	"ADJACENT COOPERATIVE UNIT TO BE COMBINED",
	"APARTMENT BUILDING",
	"BULK SALE OF CONDOMINIUMS",
	"COMMERCIAL CONDO UNIT(S)",
	"COMMERCIAL COOP UNIT(S)",
	"COMMERCIAL REAL ESTATE",
	"CONDO UNIT WITHOUT KITCHEN",
	"DWELLING ONLY - 1 FAMILY",
	"DWELLING ONLY - 2 FAMILY",
	"DWELLING ONLY - 3 FAMILY",
	"DWELLING ONLY - 4 FAMILY",
	"DWELLING ONLY - 5 FAMILY",
	"DWELLING ONLY - 6 FAMILY",
	"ENTERTAINMENT/AMUSEMENT",
	"GARAGE, 1 OR 2 FAMILY ONLY",
	"HDFC EXEMPTION PROPERTY",
	"INDUSTRIAL BUILDING",
	"MAIDS ROOM",
	"MULTIPLE PROPERTIES",
	"MULTIPLE RESIDENTIAL CONDO UNT",
	"MULTIPLE RESIDENTIAL COOP UNIT",
	"NON-RESIDENTIAL VACANT LAND",
	"NOT APPLICABLE",
	"OFFICE BUILDING",
	"OTHER",
	"PARKING SPACE",
	"PRE-ACRIS",
	"REAL EST INV TR 1,2,3 FAMILY",
	"REAL EST INV TR 4-6 FAMILY AND COMM.",
	"RELIGIOUS STRUCTURE",
	"RESIDENTIAL VACANT LAND",
	"RETAIL BUILDING",
	"SINGLE RESIDENTIAL CONDO UNIT",
	"SINGLE RESIDENTIAL COOP UNIT",
	"STORAGE ROOM",
	"TIMESHARE",
	"UNDER $1M CONDO IN COMBINED SALE OF $1M+",
	"UTILITY",
	"VACANT LAND"
]

export const DOCUMENT_TYPES: string[] = [
	"Select a Document Type",
	"ADDITIONAL MORTGAGE TAX",
	"AGREEMENT",
	"AIR RIGHTS",
	"AMENDED CONDO DECLARATION",
	"AMENDMENT OF FEDERAL LIEN",
	"AMENDMENT OF TAX LIEN",
	"APP. ORDER BREAKDWN OFFICE USE",
	"APPRT BREAKDWN OFFICE USE ONLY",
	"ASGN OF ASGN OF L&R",
	"ASSIGN/TERM OF CONTRACT/BID",
	"ASSIGNMENT OF LEASE",
	"ASSIGNMENT OF LEASES AND RENTS",
	"ASSIGNMENT OF TAX LIEN",
	"ASSIGNMENT, MORTGAGE",
	"ASSUMPTION OF MORTGAGE",
	"BOND",
	"BOTH RPTT AND RETT",
	"CANCEL/TERM ASGN L&R",
	"CERT NONATTCHMENT FED TAX LIEN",
	"CERTIFICATE",
	"CERTIFICATE OF REDUCTION",
	"CERTIFIED COPY OF WILL",
	"COLLATERAL MORTGAGE",
	"CONDEMNATION PROCEEDINGS",
	"CONDO DECLARATION",
	"CONFIRMATORY DEED",
	"CONSENT",
	"CONTINUATION OF FEDERAL LIEN",
	"CONTRACT OF SALE",
	"CORRECT INDEX/DEED-OFFICE USE",
	"CORRECT LIFE ESTATE OFFICE USE",
	"CORRECTION DEED",
	"CORRECTION DOC-OFFICE USE ONLY",
	"CORRECTION MORTGAGE",
	"COURT ORDER",
	"COURT ORDER ADVERSE POSS.",
	"DECLARATION",
	"DECLARATION OF CONDO IN CONDO",
	"DECLARATION OF MERGER",
	"DECLARATION OF MODIFI OF MRT",
	"DEED",
	"DEED WITH RESTRICTIVE COVENANT",
	"DEED, OTHER",
	"DEED, PRE RPT TAX",
	"DEVELOPMENT RIGHTS",
	"DISCHARGE OF PROPERTY FROM FTL",
	"DISCHARGE OF TAX LIEN",
	"EASEMENT",
	"ESTOPPAL REMOVAL OFFICE USE ON",
	"ESTOPPEL FOR OFFICE USE ONLY",
	"FEDERAL LIEN, OTHER",
	"FEDERAL LIEN-IRS",
	"IN REM DEED",
	"INITIAL COOP UCC1",
	"INITIAL UCC1",
	"JUDGMENT",
	"LANDMARK DESIGNATION",
	"LEASE",
	"LETTERS PATENT",
	"LICENSE",
	"LIEN OF COMMON CHARGES",
	"LIFE ESTATE DEED",
	"MAPS",
	"MASTER MORTGAGE",
	"MEMORANDUM OF CONTRACT",
	"MEMORANDUM OF LEASE",
	"MERGER",
	"MISCELLANEOUS",
	"MORTGAGE",
	"MORTGAGE AND CONSOLIDATION",
	"MORTGAGE SPREADER AGREEMENT",
	"NOTICE OF ESTATE TAX LIEN",
	"NOTICE OF APPROPRIATION",
	"NYC REAL PROPERTY TRANSFER TAX",
	"NYS REAL ESTATE TRANSFER TAX",
	"PARTIAL RELEASE OF FED LIEN",
	"PARTIAL RELEASE OF MORTGAGE",
	"PARTIAL REVOCATION OF CERT RFL",
	"PARTIAL SATISFACTION",
	"PARTIAL WITHDRAWL OF FED LIEN",
	"POWER OF ATTORNEY",
	"RELEASE",
	"RELEASE OF ESTATE TAX LIEN",
	"RELEASE OF FEDERAL LIEN",
	"RELEASE OF FEDERAL TAX LIEN",
	"RESOLUTION",
	"REVOCATION OF CERTIF. OF RFL",
	"REVOCATION OF POWER OF ATTORNE",
	"SATISFACTION OF MORTGAGE",
	"STREET PROCEDURE",
	"SUBORDINATION OF LEASE",
	"SUBORDINATION OF MORTGAGE",
	"SUNDRY AGREEMENT",
	"SUNDRY MISCELLANEOUS",
	"SUNDRY MORTGAGE",
	"TAX LIEN SALE CERTIFICATE",
	"TERM OF LIEN OF COMMON CHARGES",
	"TERM. OF CONDO DECLARATION",
	"TERMINATION OF AGREEMENT",
	"TERMINATION OF ASSIGN OF L&R",
	"TERMINATION OF LEASE OR MEMO",
	"TERMINATION OF TRUST",
	"TIMESHARE DEED",
	"TORREN",
	"TRANSFER ON DEATH DEED",
	"UCC 5 CORRECTION STATEMENT",
	"UCC COOPERATIVE ADDENDUM",
	"UCC3 AMENDMENT",
	"UCC3 ASSIGNMENT",
	"UCC3 ASSUMPTION",
	"UCC3 BANKRUPTCY",
	"UCC3 CONTINUATION",
	"UCC3 PARTIAL ASSIGNMENT",
	"UCC3 RELEASE/UCC AMENDMENT",
	"UCC3 SUBORDINATION",
	"UCC3 TERMINATION",
	"UNIFORM COMMERCIAL CODE 1",
	"UNIFORM COMMERCIAL CODE 3",
	"UNIT ASSIGNMENT",
	"VACATE ORDER",
	"WITHDRAWAL OF A FED LIEN",
	"WITHHELD SATISFACTION",
	"ZONING LOT DESCRIPTION"
]

export const FEATURES = [
	{
		name: "Instant Search",
		description: "Find any property record within seconds using address, owner name, or BBL.",
		icon: Search
	},
	{
		name: "Historical Data",
		description: "Access complete ownership history and past transactions dating back to original deeds.",
		icon: Clock
	},
	{
		name: "Official Records",
		description: "View verified documents directly from county records and government sources.",
		icon: FileText
	},
	{
		name: "Property Details",
		description: "Get comprehensive information including owner name, BBL, zoning, and property characteristics.",
		icon: Building
	}
]

export const STATS = [
	{ id: 1, name: "Properties Listed", value: "850,000+" },
	{ id: 3, name: "Annual Transactions", value: "75,000+" },
	{ id: 4, name: "Historical Records", value: "50+ Years" },
]

export const MAPBOX_API_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places"

export const NYC_BOUNDS = [
	[-74.25909, 40.477399] as [number, number],
	[-73.700181, 40.917577] as [number, number],
] as const

export const SEO_CONFIG = {
	"Address": {
		title: "Property Search by Address | Find Property Information",
		description: "Search properties by address to find detailed property records, ownership information, and property details. Use our advanced address search tool.",
		keywords: "property search, address lookup, real estate search, property records"
	},
	"BBL": {
		title: "BBL Property Search | Borough-Block-Lot Lookup",
		description: "Search properties using BBL (Borough-Block-Lot) numbers. Access comprehensive property information with our BBL search tool.",
		keywords: "BBL search, borough block lot, property lookup, NYC property"
	},
	"Owner(s) Name": {
		title: "Search Properties by Owner Name | Property Records",
		description: "Find property records by searching owner names. Access property ownership history and detailed property information.",
		keywords: "owner search, property owner lookup, ownership records"
	},
	"Advanced": {
		title: "Advanced Property Search | Detailed Property Lookup",
		description: "Use our advanced property search tools to find detailed property information. Filter by multiple criteria for precise results.",
		keywords: "advanced property search, detailed property lookup, property filters"
	}
}

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

export const FAQ = [
	{
		question: "How do I access property records?",
		answer:
			"We aggregate property records from multiple sources into one platform. Simply search by address, owner name, or parcel number to access comprehensive property information.",
	},
	{
		question: "Can I use this for commercial properties?",
		answer:
			"Yes, we support both residential and commercial property research. Our platform includes specialized data fields for commercial properties including tenant information, NOI history, and cap rate comparisons for similar properties in the area.",
	},
	{
		question: "Is the data updated in real time?",
		answer:
			"We update property records regularly, but not in real time. Data refresh cycles depend on the source, typically ranging from daily to monthly updates.",
	},
	{
		question: "Can I export the data?",
		answer:
			"Yes, you can export property reports and data in Excel for offline analysis or sharing.",
	},
	{
		question: "Do you offer API access?",
		answer:
			"Yes, we provide API access for enterprise clients. Contact support for documentation and pricing.",
	}
]

export const HEADER_TAGS = [
	{
		href:"/#stats",
		name:"Stats"
	},
	{
		href:"/#features",
		name:"Features"
	},
	{
		href:"/#faq",
		name:"FAQ"
	},
	{
		href:"/#subscribe",
		name:"Subscribe"
	},
]

export const FORMAT_PRICE = (price: number | string): string => {
	if (!isNumber(price)) return price as string
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(price)
}
