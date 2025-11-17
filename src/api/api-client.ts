import AxiosHttpClient from "@/api/axios-http-client"
import PropertyService from "@/api/services/property-service"
import ApiKeyService from "@/api/services/api-key-service"

export class ApiClient {
    public axiosHttpClient: AxiosHttpClient = new AxiosHttpClient()
    public propertyService: PropertyService = new PropertyService(this.axiosHttpClient)
    public apiKeyService: ApiKeyService = new ApiKeyService(this.axiosHttpClient)

    constructor() {}
}


export const apiClient = new ApiClient()
