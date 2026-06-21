import AxiosHttpClient from "@/api/axios-http-client"
import PropertyService from "@/api/services/property-service"
import SchoolService from "@/api/services/school-service"
import AiService from "@/api/services/ai-service"
import CensusService from "@/api/services/census-service"
import { HeatmapService } from "@/api/services/heatmap-service"

export class ApiClient {
	public parcelBackendHttpClient: AxiosHttpClient = new AxiosHttpClient(process.env.NEXT_PUBLIC_SERVER_URL)
	public propertyService: PropertyService = new PropertyService(this.parcelBackendHttpClient)

	public schoolService: SchoolService = new SchoolService()

	public aiService: AiService = new AiService(this.parcelBackendHttpClient)


	public censusService = new CensusService(this.parcelBackendHttpClient)

	public heatmapService = new HeatmapService(this.parcelBackendHttpClient)

	constructor() { }
}


export const apiClient = new ApiClient()
