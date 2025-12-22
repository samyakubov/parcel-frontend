import axios, { AxiosInstance } from "axios"

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
    }
}
