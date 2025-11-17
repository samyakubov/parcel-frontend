import {action, makeAutoObservable} from "mobx"
import {apiClient} from "@/api/api-client"
import type {ApiKey, ApiKeyWithKey, UpdateApiKeyRequest} from "@/types/api-key"
import {toast} from "react-toastify"
import {adminStore} from "@/stores/admin-store"
import {isApiError, type ApiError} from "@/types/errors"

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
		this._error = null

		try {
            this._apiKeys = await apiClient.apiKeyService.getAll(adminStore._key)
		} catch (error) {
			// Error is already transformed and notification shown by interceptor
			if (isApiError(error)) {
				this._error = error
			}
		} finally {
			this._isLoading = false
		}
	})

	public createApiKey = action(async (name: string): Promise<ApiKeyWithKey | void> => {
		if (!adminStore._isAuthenticated) {
            return
		}

		this._isLoading = true
		this._error = null

		try {
			const newKey = await apiClient.apiKeyService.create(name, adminStore._key)
            this._apiKeys.push(newKey)
            return newKey
		} catch (error) {
			// Error is already transformed and notification shown by interceptor
			if (isApiError(error)) {
				this._error = error
			}
		} finally {
			this._isLoading = false
		}
	})

	public updateApiKey = action(async (id: number, updates: UpdateApiKeyRequest): Promise<boolean> => {
		if (!adminStore._isAuthenticated) {
			return false
		}

		this._isLoading = true
		this._error = null

		try {
			await apiClient.apiKeyService.update(id, updates, adminStore._key)
            this._apiKeys = this._apiKeys.map(k =>
                k.id === id ? { ...k, ...updates } : k
            )
			return true
		} catch (error) {
			// Error is already transformed and notification shown by interceptor
			if (isApiError(error)) {
				this._error = error
			}
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
		this._error = null

		try {
			await apiClient.apiKeyService.delete(id, adminStore._key)
            this._apiKeys = this._apiKeys.filter(k =>k.id !== id)
			return true
		} catch (error) {
			// Error is already transformed and notification shown by interceptor
			if (isApiError(error)) {
				this._error = error
			}
			return false
		} finally {
			this._isLoading = false
		}
	})
}

export const apiKeyStore = new ApiKeyStore()
