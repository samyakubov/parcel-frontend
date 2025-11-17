import {makeAutoObservable} from "mobx"
import {apiClient} from "@/api/api-client"
import {isApiError, ErrorCategory, type ApiError} from "@/types/errors"


class AdminStore {
    constructor() {
        makeAutoObservable(this)
    }

    public _isAuthenticated = false
    public _key = ""
    public _error: ApiError | null = null


    public authenticate = async (apiKey: string): Promise<boolean> => {
        try {
            this._error = null
            const isAuthenticated = await apiClient.adminService.login(apiKey)
            if (isAuthenticated) {
                this._isAuthenticated = true
                this._key = apiKey
                return true
            }

            this._isAuthenticated = false
            return false
        } catch (error) {
            // Error is already transformed and notification shown by interceptor
            // Just update state
            this._isAuthenticated = false
            this._key = ""
            
            if (isApiError(error)) {
                this._error = error
                
                // Handle specific error cases
                if (error.category === ErrorCategory.AUTHORIZATION) {
                    // Clear any stored credentials
                    this.clearAuth()
                }
            }
            
            return false
        }
    }

    private clearAuth(): void {
        this._isAuthenticated = false
        this._key = ""
    }

}

export const adminStore = new AdminStore()
