import { action, makeAutoObservable } from "mobx"
import { apiClient } from "@/api/api-client"
import type { ApiKey, ApiKeyWithKey, UpdateApiKeyRequest } from "@/types/api-key"

class ApiKeyStore {
	constructor() {
		makeAutoObservable(this)
	}

	public _isAuthenticated = false
	public _apiKeys: ApiKey[] = []
	public _isLoading = false
	public _error: string | null = null
	private _adminKey: string | null = null

	public authenticate = action((apiKey: string): boolean => {
		const adminKey = process.env.NEXT_PUBLIC_ADMIN_API_KEY
		
		if (apiKey === adminKey) {
			this._isAuthenticated = true
			this._adminKey = apiKey
			this._error = null
			return true
		}
		
		this._isAuthenticated = false
		this._adminKey = null
		this._error = "Invalid admin API key"
		return false
	})

	public fetchApiKeys = action(async (): Promise<void> => {
		if (!this._adminKey) {
			this._error = "Not authenticated"
			return
		}

		this._isLoading = true
		this._error = null

		try {
			const keys = await apiClient.apiKeyService.getAll(this._adminKey)
			this._apiKeys = keys
		} catch (error) {
			this._error = error instanceof Error ? error.message : "Failed to fetch API keys"
			console.error("Error fetching API keys:", error)
		} finally {
			this._isLoading = false
		}
	})

	public createApiKey = action(async (username: string): Promise<ApiKeyWithKey | null> => {
		if (!this._adminKey) {
			this._error = "Not authenticated"
			return null
		}

		this._isLoading = true
		this._error = null

		try {
			const newKey = await apiClient.apiKeyService.create(username, this._adminKey)
			await this.fetchApiKeys() // Refresh the list
			return newKey
		} catch (error) {
			this._error = error instanceof Error ? error.message : "Failed to create API key"
			console.error("Error creating API key:", error)
			return null
		} finally {
			this._isLoading = false
		}
	})

	public updateApiKey = action(async (id: number, updates: UpdateApiKeyRequest): Promise<boolean> => {
		if (!this._adminKey) {
			this._error = "Not authenticated"
			return false
		}

		this._isLoading = true
		this._error = null

		try {
			await apiClient.apiKeyService.update(id, updates, this._adminKey)
			await this.fetchApiKeys() // Refresh the list
			return true
		} catch (error) {
			this._error = error instanceof Error ? error.message : "Failed to update API key"
			console.error("Error updating API key:", error)
			return false
		} finally {
			this._isLoading = false
		}
	})

	public deleteApiKey = action(async (id: number): Promise<boolean> => {
		if (!this._adminKey) {
			this._error = "Not authenticated"
			return false
		}

		this._isLoading = true
		this._error = null

		try {
			await apiClient.apiKeyService.delete(id, this._adminKey)
			await this.fetchApiKeys() // Refresh the list
			return true
		} catch (error) {
			this._error = error instanceof Error ? error.message : "Failed to delete API key"
			console.error("Error deleting API key:", error)
			return false
		} finally {
			this._isLoading = false
		}
	})
}

export const apiKeyStore = new ApiKeyStore()
