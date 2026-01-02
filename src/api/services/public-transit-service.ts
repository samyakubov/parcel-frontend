import axios, {AxiosInstance} from "axios"
import {mapStore} from "@/stores/map-store"
import {toast} from "react-toastify"

export default class PublicTransitService {
    public readonly http: AxiosInstance

    constructor() {
        this.http = axios.create({
            baseURL: process.env.NEXT_PUBLIC_TRANSIT_API_URL,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        })

        this.http.interceptors.response.use(
            (response) => response,
            (error) => {
                const message = error.response?.data?.message || error.message || "An unexpected error occurred"
                toast.error(message)
                return Promise.reject(error)
            }
        )
    }

    async findNearbyRoutes(): Promise<Route[]> {
        const response = await this.http.get(
            `/routes/nearby?lat=${mapStore._coords?.latitude}&lon=${mapStore._coords?.longitude}&radius_miles=1.0`
        )
        return response.data
    }

    async findNearbyStops(): Promise<Stop[]> {
        const response = await this.http.get(
            `/stops/nearby?lat=${mapStore._coords?.latitude}&lon=${mapStore._coords?.longitude}&radius_miles=1.0&limit=50`
        )
        return response.data
    }

}
