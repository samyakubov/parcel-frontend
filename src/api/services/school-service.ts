import axios, {AxiosInstance} from "axios"
import {toast} from "react-toastify"

export default class SchoolService {
    public readonly http: AxiosInstance

    constructor() {
        this.http = axios.create({
            headers: {
                "Content-Type": "application/json",
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

    async getSchools(): Promise<School[]> {
        const response = await this.http.get(
            "https://data.cityofnewyork.us/api/v3/views/wg9x-4ke6/query.json?app_token=Wp0DkC4v0qjF22hrVBLm1KSOF"
        )
        return response.data
    }
}
