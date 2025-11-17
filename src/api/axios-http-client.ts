import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios"
import { toast } from "react-toastify"
import {
  transformAxiosError,
  logError,
  isRetryableError,
  getUserFriendlyMessage,
} from "./error-handler"
import { ApiError, HttpStatusCode } from "@/types/errors"

// Extended config to track retry attempts
interface RetryConfig extends InternalAxiosRequestConfig {
  _retryCount?: number
}

export default class AxiosHttpClient {
  public readonly http: AxiosInstance
  private readonly maxRetries = 2
  private readonly retryDelay = 1000 // 1 second base delay
  private readonly notificationQueue = new Set<string>()
  private readonly maxSimultaneousNotifications = 3

  constructor() {
    this.http = axios.create({
      baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
      timeout: 30000, // 30 seconds
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })

    this.setupInterceptors()
  }

  /**
   * Sets up request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.http.interceptors.request.use(
      (config) => this.handleRequest(config),
      (error) => Promise.reject(error)
    )

    // Response interceptor
    this.http.interceptors.response.use(
      (response) => response,
      (error) => this.handleError(error)
    )
  }

  /**
   * Handles outgoing requests
   */
  private handleRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    // Initialize retry count if not present
    const retryConfig = config as RetryConfig
    if (retryConfig._retryCount === undefined) {
      retryConfig._retryCount = 0
    }

    return config
  }

  /**
   * Handles errors from responses
   */
  private async handleError(error: AxiosError): Promise<never> {
    const apiError = transformAxiosError(error)

    // Log error
    logError(apiError)

    // Show toast notification
    this.showErrorNotification(apiError)

    // Retry logic for network errors
    if (isRetryableError(apiError) && this.shouldRetry(error.config as RetryConfig)) {
      return await this.retryRequest(error.config as RetryConfig)
    }

    return Promise.reject(apiError)
  }

  /**
   * Checks if a request should be retried
   */
  private shouldRetry(config: RetryConfig | undefined): boolean {
    if (!config) return false

    const retryCount = config._retryCount || 0
    return retryCount < this.maxRetries
  }

  /**
   * Retries a failed request with exponential backoff
   */
  private async retryRequest(config: RetryConfig): Promise<never> {
    const retryCount = config._retryCount || 0
    config._retryCount = retryCount + 1

    // Calculate delay with exponential backoff
    const delay = this.retryDelay * Math.pow(2, retryCount)

    // Wait before retrying
    await new Promise((resolve) => setTimeout(resolve, delay))

    // Retry the request
    return this.http.request(config) as Promise<never>
  }

  /**
   * Shows error notification with deduplication
   */
  private showErrorNotification(error: ApiError): void {
    const message = getUserFriendlyMessage(error)

    // Check if we've already shown this message recently
    if (this.notificationQueue.has(message)) {
      return
    }

    // Check if we've reached the maximum simultaneous notifications
    if (this.notificationQueue.size >= this.maxSimultaneousNotifications) {
      return
    }

    // Add to queue
    this.notificationQueue.add(message)

    // Determine if error is critical (500, 503)
    const isCritical =
      error.statusCode === HttpStatusCode.INTERNAL_SERVER_ERROR ||
      error.statusCode === HttpStatusCode.SERVICE_UNAVAILABLE

    // Show toast notification
    toast.error(message, {
      autoClose: isCritical ? false : 5000,
      onClose: () => {
        // Remove from queue when dismissed
        this.notificationQueue.delete(message)
      },
    })
  }
}
