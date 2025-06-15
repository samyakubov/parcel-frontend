import HttpClient from "../Classes/HttpClient"
import PartyService from "../Services/PartyService"
import PropertyService from "../Services/PropertyService"

export class ApiClientStore {
	public httpClient: HttpClient = new HttpClient()
	public partyService: PartyService = new PartyService(this.httpClient)
	public propertyService: PropertyService = new PropertyService(this.httpClient)
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor() {}
}


export const apiClientStore = new ApiClientStore()
