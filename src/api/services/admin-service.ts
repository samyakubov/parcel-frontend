import AxiosHttpClient from "@/api/axios-http-client"

export default class AdminService {
    private readonly serviceHeader = "/admin"

    constructor(private readonly httpClient: AxiosHttpClient) {}

    async login(adminKey: string): Promise<boolean> {
        const response = await this.httpClient.http.post(
            `${this.serviceHeader}/authenticate`,
            null,
            {
                headers: {
                    "X-API-Key": adminKey
                }
            }
        )
        return response.status === 200
    }
}
