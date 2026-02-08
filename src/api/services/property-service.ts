import AxiosHttpClient from "@/api/axios-http-client"

export default class PropertyService {
	private readonly serviceHeader = "/property"

	constructor(private readonly httpClient: AxiosHttpClient) { }


	async searchByPropertyAddress(address: string): Promise<PropertyDetailsWithCoords> {
		const response = await this.httpClient.http.get(
			`${this.serviceHeader}/search_by_property_address/address=${address}`
		)
		return response.data
	}

	async searchByPropertyBbl(bbl: string): Promise<PropertyDetailsWithCoords> {
		const response = await this.httpClient.http.get(
			`${this.serviceHeader}/search_by_property_bbl/bbl=${bbl}`
		)
		return response.data
	}

	async searchByPropertyFuzzyCoords(coords: Coordinates): Promise<PropertyDetailsWithCoords> {
		const response = await this.httpClient.http.get(
			`${this.serviceHeader}/search_by_fuzzy_coords/lat=${coords.latitude}/long=${coords.longitude}`
		)
		return response.data
	}
}
