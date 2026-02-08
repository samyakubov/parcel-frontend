import AxiosHttpClient from "@/api/axios-http-client"

export default class CensusService {
	private readonly serviceHeader = "/census"

	constructor(private readonly httpClient: AxiosHttpClient) { }

	async getCensusData(address: string): Promise<CensusDemographicDataResponse> {
		const response = await this.httpClient.http.get(
			`${this.serviceHeader}/get_census_data/address=${address}`
		)
		return response.data
	}
}
