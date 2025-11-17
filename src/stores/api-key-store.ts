import {action, makeAutoObservable} from "mobx"
import {apiClient} from "@/api/api-client"
import type {ApiKey, ApiKeyWithKey, UpdateApiKeyRequest} from "@/types/api-key"
import {adminStore} from "@/stores/admin-store"
import {type ApiError} from "@/types/errors"

class ApiKeyStore {
	constructor() {
		makeAutoObservable(this)
	}

	public _apiKeys: ApiKey[] = []
	public _isLoading = false
	public _error: ApiError | null = null

	public fetchApiKeys = action(async (): Promise<void> => {
		if (!adminStore._isAuthenticated) {
			return
		}

		this._isLoading = true
        this._apiKeys = await apiClient.apiKeyService.getAll(adminStore._password)
        this._isLoading = false
	})

	public createApiKey = action(async (name: string): Promise<ApiKeyWithKey | void> => {
		if (!adminStore._isAuthenticated) {
            return
		}

		this._isLoading = true

        const newKey = await apiClient.apiKeyService.create(name, adminStore._password)
        this._apiKeys.push(newKey)
        this._isLoading = false

        return newKey
	})

	public updateApiKey = action(async (id: number, updates: UpdateApiKeyRequest): Promise<boolean> => {
		if (!adminStore._isAuthenticated) {
			return false
		}

		this._isLoading = true

		try {
			await apiClient.apiKeyService.update(id, updates, adminStore._password)
            this._apiKeys = this._apiKeys.map(k =>
                k.id === id ? { ...k, ...updates } : k
            )
			return true
		} catch (error) {
			return false
		} finally {
			this._isLoading = false
		}
	})

	public deleteApiKey = action(async (id: number): Promise<boolean> => {
		if (!adminStore._isAuthenticated) {
            return false
		}

		this._isLoading = true

		try {
			await apiClient.apiKeyService.delete(id, adminStore._password)
            this._apiKeys = this._apiKeys.filter(k =>k.id !== id)
			return true
		} catch (error) {
			return false
		} finally {
			this._isLoading = false
		}
	})
}

export const apiKeyStore = new ApiKeyStore()
