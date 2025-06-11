import axios, { AxiosInstance } from "axios"
export default class HttpClient {
	public readonly http: AxiosInstance

	constructor() {
		this.http = axios.create({
			baseURL: process.env.REACT_APP_BASE_URL,
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			}
		})
	}
}
