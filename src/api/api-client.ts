import AxiosHttpClient from "@/api/axios-http-client"
import PropertyService from "@/api/services/property-service"
import PublicTransitService from "@/api/services/public-transit-service"
import SchoolService from "@/api/services/school-service"

export class ApiClient {
    public axiosHttpClient: AxiosHttpClient = new AxiosHttpClient()
    public propertyService: PropertyService = new PropertyService(this.axiosHttpClient)
    public publicTransitService:PublicTransitService = new PublicTransitService()
    public schoolService:SchoolService  = new SchoolService()

    constructor() {}
}


export const apiClient = new ApiClient()
