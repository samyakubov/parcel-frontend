import HttpClient from "../Classes/HttpClient"

export default class PropertyService {
	private readonly serviceHeader = "/api/property"

	constructor(private readonly httpClient: HttpClient) {}

	async searchByPropertyBBL(BBL:string, limit:number):Promise<PropertyDetailsWithCoords | HTTPError> {
		const response = await this.httpClient.http.get(`${this.serviceHeader}/search_by_property_BBL/bbl=${BBL}/limit=${limit}`)
		return response.data
	}
	async searchByPropertyAddress(address:string, limit:number):Promise<PropertyDetailsWithCoords | HTTPError> {
		const response = await this.httpClient.http.get(`${this.serviceHeader}/search_by_property_address/address=${address}/limit=${limit}`)
		return response.data
	}

	async searchByPropertyFuzzyCoords(coords:Coordinates, limit:number):Promise<PropertyDetailsWithCoords | HTTPError> {
		const response = await this.httpClient.http.get(`${this.serviceHeader}/search_by_fuzzy_coords/lat=${coords.latitude}/long=${coords.longitude}/limit=${limit}`)
		return response.data
	}

	async generateAnalytics(filters:AdvancedSearchFilter):Promise<Analytics | HTTPError> {
		const response = await this.httpClient.http.post("/api/advancedSearch/generate_analytics/", filters)
		return response.data
	}

	async searchAdvancedSearch(filters:AdvancedSearchFilter, limit:number):Promise<AdvancedSearchResponse | HTTPError> {
		const response = await this.httpClient.http.post(`/api/advancedSearch/query_acris_records/limit=${limit}`, filters)
		return response.data
	}

	async searchAllPropertiesToOwner(address:string, ownersName:string):Promise<RelatedPropertiesResponse | HTTPError> {
		const response = await this.httpClient.http.get(`${this.serviceHeader}/search_all_related_properties_to_owner/address=${address}/ownerName=${ownersName}`)
		return response.data
	}
}
