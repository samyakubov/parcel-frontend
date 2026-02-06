import AxiosHttpClient from "@/api/axios-http-client"
import PropertyService from "@/api/services/property-service"
import PublicTransitService from "@/api/services/public-transit-service"
import SchoolService from "@/api/services/school-service"
import AiService from "@/api/services/ai-service"
import CensusService from "@/api/services/census-service"

class ApiClient {
	public parcelHttpClient: AxiosHttpClient = new AxiosHttpClient(process.env.NEXT_PUBLIC_SERVER_URL as string)
	public publicTransportHttpClient: AxiosHttpClient = new AxiosHttpClient(process.env.NEXT_PUBLIC_TRANSIT_API_URL as string)

	public aiService: AiService = new AiService(this.parcelHttpClient)
	public censusService = new CensusService(this.parcelHttpClient)
	public propertyService: PropertyService = new PropertyService(this.parcelHttpClient)
	public publicTransitService: PublicTransitService = new PublicTransitService(this.publicTransportHttpClient)

	public schoolService: SchoolService = new SchoolService()

	constructor() { }
}

const apiClient = new ApiClient()

export default apiClient
