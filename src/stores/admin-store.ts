import {makeAutoObservable} from "mobx"
import {apiClient} from "@/api/api-client"
import {isApiError, ErrorCategory, type ApiError} from "@/types/errors"


class AdminStore {
    constructor() {
        makeAutoObservable(this)
    }

    public _isAuthenticated = false
    public _password = ""
    public _error: ApiError | null = null


    public authenticate = async (apiKey: string): Promise<boolean> => {
        try {
            this._error = null
            const isAuthenticated = await apiClient.adminService.login(apiKey)
            if (isAuthenticated) {
                this._isAuthenticated = true
                this._password = apiKey
                return true
            }

            this._isAuthenticated = false
            return false
        } catch (error) {
            this._isAuthenticated = false
            this._password = ""
            if (isApiError(error)) {
                this._error = error
                if (error.category === ErrorCategory.AUTHORIZATION) {
                    this.clearAuth()
                }
            }
            return false
        }
    }

    private clearAuth(): void {
        this._isAuthenticated = false
        this._password = ""
    }

}

export const adminStore = new AdminStore()
