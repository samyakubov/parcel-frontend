import AxiosHttpClient from "@/api/axios-http-client"

export default class AiService {
    private readonly serviceHeader = "/ai"

    constructor(private readonly httpClient: AxiosHttpClient) { }

    async ask(question: string): Promise<ChatResponse> {
        const response = await this.httpClient.http.post(
            `${this.serviceHeader}/ask`,
            { question }
        )
        return response.data
    }
}
