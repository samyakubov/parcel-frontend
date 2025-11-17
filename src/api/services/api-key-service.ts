import AxiosHttpClient from "@/api/axios-http-client"
import type { ApiKey, ApiKeyWithKey, UpdateApiKeyRequest } from "@/types/api-key"

export default class ApiKeyService {
    private readonly serviceHeader = "/api-keys"

    constructor(private readonly httpClient: AxiosHttpClient) {}

    async getAll(adminKey: string): Promise<ApiKey[]> {
        const response = await this.httpClient.http.get(
            `${this.serviceHeader}/list-keys`,
            {
                headers: {
                    "X-API-Key": adminKey
                }
            }
        )
        return response.data
    }

    async create(username: string, adminKey: string): Promise<ApiKeyWithKey> {
        const response = await this.httpClient.http.get(
            `${this.serviceHeader}/create-key/username=${username}`,
            {
                headers: {
                    "X-API-Key": adminKey
                }
            }
        )
        return response.data
    }

    async update(id: number, data: UpdateApiKeyRequest, adminKey: string): Promise<void> {
        await this.httpClient.http.patch(
            `${this.serviceHeader}/update-key/key_id=${id}`,
            data,
            {
                headers: {
                    "X-API-Key": adminKey
                }
            }
        )
    }

    async delete(id: number, adminKey: string): Promise<void> {
        await this.httpClient.http.delete(
            `${this.serviceHeader}/delete-key/key_id=${id}`,
            {
                headers: {
                    "X-API-Key": adminKey
                }
            }
        )
    }
}
