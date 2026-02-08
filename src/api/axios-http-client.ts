import axios, { AxiosInstance, AxiosResponse } from "axios"
import { toast } from "react-toastify"
import { setupCache, buildWebStorage, buildMemoryStorage } from "axios-cache-interceptor"

export default class AxiosHttpClient {
	public readonly http: AxiosInstance

	constructor(url?: string) {
		const instance = axios.create({
			baseURL: url,
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
				"x-api-key": process.env.NEXT_PUBLIC_API_KEY,
			}
		})

		this.http = setupCache(instance, {
			ttl: 15 * 60 * 1000,
			storage: typeof window !== "undefined"
				? buildWebStorage(localStorage)
				: buildMemoryStorage()
		})

		this.http.interceptors.response.use(
			(response: AxiosResponse) => response,
			(error) => {
				const message = error.response?.data?.message || error.message || "An unexpected error occurred"
				toast.error(message)
				return Promise.reject(error)
			}
		)
	}
}
