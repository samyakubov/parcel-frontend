import AxiosHttpClient from "@/api/axios-http-client"
import PropertyService from "@/api/services/property-service"
import PublicTransitService from "@/api/services/public-transit-service"

export class ApiClient {
    public axiosHttpClient: AxiosHttpClient = new AxiosHttpClient()
    public propertyService: PropertyService = new PropertyService(this.axiosHttpClient)
    public publicTransitService = new PublicTransitService()

    constructor() {}
}


export const apiClient = new ApiClient()
