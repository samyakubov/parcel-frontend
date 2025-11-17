import AxiosHttpClient from "@/api/axios-http-client"

export default class PropertyService {
    private readonly serviceHeader = "/property"

    constructor(private readonly httpClient: AxiosHttpClient) {}


    async searchByPropertyAddress(address:string):Promise<PropertyDetailsWithCoords | HTTPError> {
        const response = await this.httpClient.http.get(
            `${this.serviceHeader}/search_by_property_address/address=${address}`,
            {
                headers: {
                    "X-API-Key": process.env.NEXT_PUBLIC_API_KEY,
                }
            }
        )
        return response.data
    }

    async searchByPropertyFuzzyCoords(coords:Coordinates):Promise<PropertyDetailsWithCoords | HTTPError> {
        const response = await this.httpClient.http.get(
    `${this.serviceHeader}/search_by_fuzzy_coords/lat=${coords.latitude}/long=${coords.longitude}`,
            {
                headers: {
                    "X-API-Key": process.env.NEXT_PUBLIC_API_KEY,
                }
            }
        )
        return response.data
    }
}
