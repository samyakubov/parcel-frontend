import {action, makeAutoObservable} from "mobx"
import {apiClient} from "@/api/api-client"
import type {ApiKey, ApiKeyWithKey, UpdateApiKeyRequest} from "@/types/api-key"
import {toast} from "react-toastify"
import {navigateReducer} from "next/dist/client/components/router-reducer/reducers/navigate-reducer";

class ApiKeyStore {
	constructor() {
		makeAutoObservable(this)
	}

	public _isAuthenticated = false
	public _apiKeys: ApiKey[] = []
	public _isLoading = false
	private _adminKey: string | null = null

	public authenticate = action((apiKey: string): boolean => {
		const adminKey = process.env.NEXT_PUBLIC_ADMIN_API_KEY
		if (apiKey === adminKey) {
			this._isAuthenticated = true
			this._adminKey = apiKey
			return true
		}
		this._isAuthenticated = false
		this._adminKey = null
        toast.error("Invalid admin API key")
		return false
	})

	public fetchApiKeys = action(async (): Promise<void> => {
		if (!this._adminKey) {
            toast.error("Not authenticated")
			return
		}

		this._isLoading = true

		try {
            this._apiKeys = await apiClient.apiKeyService.getAll(this._adminKey)
		} catch (error) {
            toast.error("Failed to fetch API keys")
			console.error("Error fetching API keys:", error)
		} finally {
			this._isLoading = false
		}
	})

	public createApiKey = action(async (name: string): Promise<ApiKeyWithKey | void> => {
		if (!this._adminKey) {
            toast.error("Not authenticated")
            return
		}

		this._isLoading = true

		try {
			const newKey = await apiClient.apiKeyService.create(name, this._adminKey)
            this._apiKeys.push(newKey)
            return newKey
		} catch (error) {
            toast.error("Failed to create API key")
		} finally {
			this._isLoading = false
		}
	})

	public updateApiKey = action(async (id: number, updates: UpdateApiKeyRequest): Promise<boolean> => {
		if (!this._adminKey) {
            toast.error("Not authenticated")
			return false
		}

		this._isLoading = true

		try {
			await apiClient.apiKeyService.update(id, updates, this._adminKey)
            this._apiKeys = this._apiKeys.map(k =>
                k.id === id ? { ...k, ...updates } : k
            )
			return true
		} catch (error) {
            toast.error("Failed to update API key")
			return false
		} finally {
			this._isLoading = false
		}
	})

	public deleteApiKey = action(async (id: number): Promise<boolean> => {
		if (!this._adminKey) {
            toast.error("Not authenticated")
            return false
		}

		this._isLoading = true

		try {
			await apiClient.apiKeyService.delete(id, this._adminKey)
            this._apiKeys = this._apiKeys.filter(k =>k.id !== id)
			return true
		} catch (error) {
            toast.error("Failed to delete API key")
			return false
		} finally {
			this._isLoading = false
		}
	})
}

export const apiKeyStore = new ApiKeyStore()
