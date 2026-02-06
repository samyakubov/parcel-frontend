import {mapStore} from "@/stores/map-store"
import AxiosHttpClient from "@/api/axios-http-client"

export default class PublicTransitService {
	constructor(private readonly httpClient: AxiosHttpClient) { }

	async findNearbyRoutes(): Promise<Route[]> {
		const response = await this.httpClient.http.get(
			`/routes/nearby?lat=${mapStore._coords?.latitude}&lon=${mapStore._coords?.longitude}&radius_miles=1.0`
		)
		return response.data
	}

	async findNearbyStops(): Promise<Stop[]> {
		const response = await this.httpClient.http.get(
			`/stops/nearby?lat=${mapStore._coords?.latitude}&lon=${mapStore._coords?.longitude}&radius_miles=1.0&limit=50`
		)
		return response.data
	}
}
