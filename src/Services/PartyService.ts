import HttpClient from "../Classes/HttpClient"

export default class PartyService {
	private readonly serviceHeader = "/api/party"

	constructor(private readonly httpClient: HttpClient) {}

	async searchByPartyName(partyName:string, limit:number):Promise<PartyDetails | HTTPError> {
		const response = await this.httpClient.http.get(`${this.serviceHeader}/search_by_party_name/name=${partyName}/limit=${limit}`)
		return response.data
	}
}
