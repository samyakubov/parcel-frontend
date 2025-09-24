import AxiosHttpClient from "@/api/axios-http-client"
import PropertyService from "@/api/services/property-service"

export class ApiClient {
    public axiosHttpClient: AxiosHttpClient = new AxiosHttpClient()
    public propertyService: PropertyService = new PropertyService(this.axiosHttpClient)

    constructor() {}
}


export const apiClient = new ApiClient()
