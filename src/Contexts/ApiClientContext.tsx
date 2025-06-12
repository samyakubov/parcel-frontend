import React, { createContext, useContext, useMemo } from "react"
import HttpClient from "../Classes/HttpClient"
import PartyService from "../Services/PartyService"
import PropertyService from "../Services/PropertyService"

export class ApiClient {
	public httpClient: HttpClient = new HttpClient()
	public partyService: PartyService = new PartyService(this.httpClient)
	public propertyService: PropertyService = new PropertyService(this.httpClient)
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor() {}
}

const ApiClientContext = createContext(new ApiClient())

export default function ApiClientProvider ({ children }: { children: React.ReactNode }) {
	const apiClientClass = useMemo(() => new ApiClient(), [])
	return (
		<ApiClientContext.Provider value={apiClientClass}>
			{children}
		</ApiClientContext.Provider>
	)
}

export const useApiClientContext = () => useContext(ApiClientContext)
