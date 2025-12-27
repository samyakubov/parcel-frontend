import axios, { AxiosInstance } from "axios"
import { toast } from "react-toastify"

export default class AxiosHttpClient {
    public readonly http: AxiosInstance

    constructor() {
        this.http = axios.create({
            baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
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
}
