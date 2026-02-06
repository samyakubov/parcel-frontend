import AxiosHttpClient from "@/api/axios-http-client"
import PropertyService from "@/api/services/property-service"
import PublicTransitService from "@/api/services/public-transit-service"
import SchoolService from "@/api/services/school-service"
import AiService from "@/api/services/ai-service"
import CensusService from "@/api/services/census-service"

class ApiClient {
	public parcelBackendHttpClient: AxiosHttpClient = new AxiosHttpClient()
	public propertyService: PropertyService = new PropertyService(this.parcelBackendHttpClient)

	public publicTransitService: PublicTransitService = new PublicTransitService(this.parcelBackendHttpClient)

	public schoolService: SchoolService = new SchoolService()

	public aiService: AiService = new AiService(this.parcelBackendHttpClient)

	public censusService = new CensusService(this.parcelBackendHttpClient)

	constructor() { }
}

const apiClient = new ApiClient()

export default apiClient
