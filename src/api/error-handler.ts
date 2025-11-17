import { AxiosError } from "axios"
import {
  ApiError,
  BackendErrorResponse,
  BackendErrorType,
  ErrorCategory,
  HttpStatusCode,
  NetworkError,
} from "@/types/errors"

// Error message mapping for user-friendly messages
const ERROR_MESSAGES: Record<BackendErrorType, string> = {
  // Property Search
  [BackendErrorType.INVALID_ADDRESS]: "Invalid address format. Please check your input.",
  [BackendErrorType.ADDRESS_NOT_FOUND]: "Address not found. Please verify the address and try again.",
  [BackendErrorType.ADDRESS_NOT_IN_NEW_YORK]: "This service only supports New York addresses.",
  [BackendErrorType.INVALID_BBL]: "Invalid BBL format.",
  [BackendErrorType.BBL_NOT_FOUND]: "BBL not found in database.",

  // Authentication & Authorization
  [BackendErrorType.MISSING_API_KEY]: "API key is required.",
  [BackendErrorType.INVALID_API_KEY]: "Invalid API key provided.",
  [BackendErrorType.INVALID_ADMIN_KEY]: "Invalid admin credentials. Please log in again.",
  [BackendErrorType.MISSING_ADMIN_KEY]: "Admin key is required.",

  // API Key Management
  [BackendErrorType.API_KEY_NOT_FOUND]: "API key not found.",
  [BackendErrorType.INVALID_UPDATE]: "Invalid update request. Please check your input.",
  [BackendErrorType.FAILED_TO_CREATE_API_KEY]: "Failed to create API key. Please try again.",
  [BackendErrorType.FAILED_TO_DELETE_API_KEY]: "Failed to delete API key. Please try again.",

  // Server Errors
  [BackendErrorType.DATABASE_ERROR]: "A database error occurred. Please try again later.",
  [BackendErrorType.GEOLOCATION_ERROR]: "Geolocation service is temporarily unavailable.",
  [BackendErrorType.HTTP_EXCEPTION]: "An unexpected error occurred. Please try again.",
  [BackendErrorType.UNKNOWN_ERROR]: "An unexpected error occurred. Please try again.",
}

/**
 * Categorizes errors by HTTP status code
 */
export function getErrorCategory(statusCode: number): ErrorCategory {
  if (statusCode === HttpStatusCode.BAD_REQUEST) {
    return ErrorCategory.VALIDATION
  }
  if (statusCode === HttpStatusCode.UNAUTHORIZED) {
    return ErrorCategory.AUTHENTICATION
  }
  if (statusCode === HttpStatusCode.FORBIDDEN) {
    return ErrorCategory.AUTHORIZATION
  }
  if (statusCode === HttpStatusCode.NOT_FOUND) {
    return ErrorCategory.NOT_FOUND
  }
  if (statusCode === HttpStatusCode.SERVICE_UNAVAILABLE) {
    return ErrorCategory.GEOLOCATION
  }
  if (statusCode >= 500) {
    return ErrorCategory.SERVER_ERROR
  }

  return ErrorCategory.SERVER_ERROR
}

/**
 * Checks for property search errors
 */
function checkPropertySearchError(lowerMessage: string): BackendErrorType | null {
  if (lowerMessage.includes("invalid bbl")) return BackendErrorType.INVALID_BBL
  if (lowerMessage.includes("bbl not found")) return BackendErrorType.BBL_NOT_FOUND
  if (lowerMessage.includes("invalid address")) return BackendErrorType.INVALID_ADDRESS
  if (lowerMessage.includes("address not found")) return BackendErrorType.ADDRESS_NOT_FOUND
  if (lowerMessage.includes("not in new york") || lowerMessage.includes("new york addresses")) {
    return BackendErrorType.ADDRESS_NOT_IN_NEW_YORK
  }
  return null
}

/**
 * Checks for authentication errors
 */
function checkAuthError(lowerMessage: string): BackendErrorType | null {
  if (lowerMessage.includes("missing api key") || lowerMessage.includes("api key is required")) {
    return BackendErrorType.MISSING_API_KEY
  }
  if (lowerMessage.includes("invalid api key")) return BackendErrorType.INVALID_API_KEY
  if (lowerMessage.includes("invalid admin key") || lowerMessage.includes("invalid admin credentials")) {
    return BackendErrorType.INVALID_ADMIN_KEY
  }
  if (lowerMessage.includes("missing admin key") || lowerMessage.includes("admin key is required")) {
    return BackendErrorType.MISSING_ADMIN_KEY
  }
  return null
}

/**
 * Checks for API key management errors
 */
function checkApiKeyManagementError(lowerMessage: string): BackendErrorType | null {
  if (lowerMessage.includes("api key not found")) return BackendErrorType.API_KEY_NOT_FOUND
  if (lowerMessage.includes("invalid update")) return BackendErrorType.INVALID_UPDATE
  if (lowerMessage.includes("failed to create api key")) return BackendErrorType.FAILED_TO_CREATE_API_KEY
  if (lowerMessage.includes("failed to delete api key")) return BackendErrorType.FAILED_TO_DELETE_API_KEY
  return null
}

/**
 * Determines the backend error type from the error message
 */
function getBackendErrorType(message: string, statusCode: number): BackendErrorType {
  const lowerMessage = message.toLowerCase()

  const propertyError = checkPropertySearchError(lowerMessage)
  if (propertyError) return propertyError

  const authError = checkAuthError(lowerMessage)
  if (authError) return authError

  const managementError = checkApiKeyManagementError(lowerMessage)
  if (managementError) return managementError

  if (lowerMessage.includes("geolocation")) return BackendErrorType.GEOLOCATION_ERROR
  if (lowerMessage.includes("database")) return BackendErrorType.DATABASE_ERROR

  if (statusCode >= 500) return BackendErrorType.HTTP_EXCEPTION

  return BackendErrorType.UNKNOWN_ERROR
}

/**
 * Transforms Axios errors into structured ApiError objects
 */
export function transformAxiosError(error: AxiosError): ApiError | NetworkError {
  // Handle network errors (no response from server)
  if (!error.response) {
    const isTimeout = error.code === "ECONNABORTED" || error.message.includes("timeout")
    const isConnectionError = error.code === "ERR_NETWORK" || error.message.includes("Network Error")

    const networkError: NetworkError = {
      statusCode: 0,
      message: error.message,
      userMessage: isTimeout
        ? "Request timed out. Please check your connection and try again."
        : "Unable to connect to server. Please check your internet connection.",
      category: ErrorCategory.NETWORK_ERROR,
      errorType: BackendErrorType.UNKNOWN_ERROR,
      isRetryable: true,
      timestamp: new Date(),
      isTimeout,
      isConnectionError,
      originalError: error,
    }

    return networkError
  }

  // Handle HTTP errors with response
  const statusCode = error.response.status
  const backendError = error.response.data as BackendErrorResponse
  const message = backendError?.message || error.message || "An unexpected error occurred"

  const errorType = getBackendErrorType(message, statusCode)
  const category = getErrorCategory(statusCode)

  const apiError: ApiError = {
    statusCode,
    message,
    userMessage: ERROR_MESSAGES[errorType] || message,
    category,
    errorType,
    isRetryable: false,
    timestamp: new Date(),
    originalError: error,
  }

  return apiError
}

/**
 * Gets user-friendly message for an error
 */
export function getUserFriendlyMessage(error: ApiError): string {
  return error.userMessage
}

/**
 * Determines if an error should trigger a retry
 */
export function isRetryableError(error: ApiError): boolean {
  return error.isRetryable && error.category === ErrorCategory.NETWORK_ERROR
}

/**
 * Logs errors with appropriate severity levels
 */
export function logError(error: ApiError): void {
  const logData = {
    statusCode: error.statusCode,
    message: error.message,
    category: error.category,
    errorType: error.errorType,
    timestamp: error.timestamp,
  }

  // Warning for 4xx errors, error for 5xx and network errors
  if (error.statusCode >= 400 && error.statusCode < 500) {
    console.warn("[API Warning]", logData)
  } else {
    console.error("[API Error]", logData)
  }
}

