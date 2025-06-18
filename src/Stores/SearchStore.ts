import { action, makeAutoObservable} from "mobx"

class SearchStore {
	constructor() {
		makeAutoObservable(this)
	}

	public searchAddressQuery = ""
	public searchBblQuery = ""
	public searchNameQuery = ""

	public propertyResults: PropertyDetails = {
		last_sold_for: {
			last_sold_price: 0,
			sale_date: ""
		},
		owners: {
			current_owners:[],
			previous_owners:[],
		},
		records: [],
		violations: [],
		complaints: [],
		zoning: {
			zoning_districts: [],
			commercial_overlays: [],
			special_districts: [],
			limited_height_district: "",
			last_updated: ""
		}
	}

	public advancedSearchResults:PropertyRecord[] = []

	public partyResults:PartyDetails = {
		records:[],
		current_address: "",
	}

	public advancedSearchQuery: AdvancedSearchFilter = {
		document_type: "",
		year_filed_start:1966,
		year_filed_end: new Date().getFullYear(),
		property_type: "",
		from_amount:0,
		to_amount:0,
		zip_code:"",
		party_type:""
	}

	public suggestions: MapboxFeature[] = []
	public isSuggestionsOpen = false
	public selectedSuggestionIndex = -1
	public suggestionsError: string | null = null
	public isSearchResultLoading = false

	public setAddressSearchQuery = action((query: string) =>{
		this.searchAddressQuery = query
	})

	public setSearchBblQuery = action((query: string) =>{
		this.searchBblQuery = query
	})

	public setSearchNameQuery = action((query: string) =>{
		this.searchNameQuery = query
	})

	public setPropertyResults = action((response: PropertyDetails) =>{
		this.propertyResults = response
	})
	public setAdvancedSearchResults = action((response: PropertyRecord[]) =>{
		this.advancedSearchResults = response
	})

	public setPartyResults = action((response: PartyDetails) =>{
		this.partyResults = response
	})

	public setAdvancedSearchQuery <K extends keyof AdvancedSearchFilter>(field: K, value:AdvancedSearchFilter[K]) {
		this.advancedSearchQuery[field] =  value
	}

	public setSuggestions = action((newSuggestions: MapboxFeature[]) =>{
		this.suggestions = newSuggestions
	})

	public setIsSuggestionsOpen = action((isSuggestionsOpen: boolean) => {
		this.isSuggestionsOpen = isSuggestionsOpen
	})

	public setSelectedSuggestionIndex = action((index: number) => {
		this.selectedSuggestionIndex = index
	})

	public setSuggestionsError = action((error: string | null) => {
		this.suggestionsError = error
	})

	public setIsSearchResultLoading = action((isLoading: boolean) => {
		this.isSearchResultLoading = isLoading
	})
}

export const searchStore = new SearchStore()
