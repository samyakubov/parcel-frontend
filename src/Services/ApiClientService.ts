import HttpClient from "../Classes/HttpClient"
import PartyService from "./PartyService"
import PropertyService from "./PropertyService"

export class ApiClientService {
	public httpClient: HttpClient = new HttpClient()
	public partyService: PartyService = new PartyService(this.httpClient)
	public propertyService: PropertyService = new PropertyService(this.httpClient)
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor() {}
}


export const apiClientService = new ApiClientService()
