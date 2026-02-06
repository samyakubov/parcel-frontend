import AxiosHttpClient from "@/api/axios-http-client"
import PropertyService from "@/api/services/property-service"
import PublicTransitService from "@/api/services/public-transit-service"
import SchoolService from "@/api/services/school-service"
import AiService from "@/api/services/ai-service"
import CensusService from "@/api/services/census-service"

class ApiClient {
	public httpClient: AxiosHttpClient = new AxiosHttpClient()
	public aiService: AiService = new AiService(this.httpClient)
	public censusService = new CensusService(this.httpClient)
	public propertyService: PropertyService = new PropertyService(this.httpClient)
	public publicTransitService: PublicTransitService = new PublicTransitService(this.httpClient)
	public schoolService: SchoolService = new SchoolService()

	constructor() { }
}

const apiClient = new ApiClient()

export default apiClient
