import AxiosHttpClient from "@/api/axios-http-client"
import { HeatmapResponse } from "@/types/heatmap"

export class HeatmapService {
	private httpClient: AxiosHttpClient

	constructor(httpClient: AxiosHttpClient) {
		this.httpClient = httpClient
	}

	async getZipcodeHeatmap(startDate?: string, endDate?: string): Promise<HeatmapResponse> {
		const params = new URLSearchParams()
		if (startDate) params.append("start_date", startDate)
		if (endDate) params.append("end_date", endDate)

		const queryString = params.toString()
		const endpoint = queryString ? `/heatmap/zipcode?${queryString}` : "/heatmap/zipcode"

		const response = await this.httpClient.http.get<HeatmapResponse>(endpoint)
		return response.data
	}
}
