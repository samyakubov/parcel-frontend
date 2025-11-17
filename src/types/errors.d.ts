declare global {
  enum HttpStatusCode {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    SERVICE_UNAVAILABLE = 503,
  }

  enum ErrorCategory {
    VALIDATION = "VALIDATION",
    AUTHENTICATION = "AUTHENTICATION",
    AUTHORIZATION = "AUTHORIZATION",
    NOT_FOUND = "NOT_FOUND",
    SERVER_ERROR = "SERVER_ERROR",
    NETWORK_ERROR = "NETWORK_ERROR",
    GEOLOCATION = "GEOLOCATION",
  }

  enum BackendErrorType {
    // Property Search Errors
    INVALID_BBL = "InvalidBBLError",
    BBL_NOT_FOUND = "BBLNotFoundError",
    INVALID_ADDRESS = "InvalidAddressError",
    ADDRESS_NOT_FOUND = "AddressNotFoundError",

    // API Key Errors
    MISSING_API_KEY = "MissingApiKeyError",
    INVALID_API_KEY = "InvalidApiKeyError",
    INVALID_ADMIN_KEY = "InvalidAdminKeyError",
    API_KEY_NOT_FOUND = "APIKeyNotFoundError",
    INVALID_UPDATE = "InvalidUpdateError",
    FAILED_TO_CREATE_API_KEY = "FailedToCreateApiKeyError",
    FAILED_TO_DELETE_API_KEY = "FailedToDeleteApiKeyError",
    MISSING_ADMIN_KEY = "MissingAdminKeyError",

    // Geolocation Errors
    GEOLOCATION_ERROR = "GeolocationError",
    ADDRESS_NOT_IN_NEW_YORK = "AddressNotInNewYorkError",

    // Generic Errors
    DATABASE_ERROR = "DatabaseError",
    HTTP_EXCEPTION = "HTTPException",
    UNKNOWN_ERROR = "UnknownError",
  }

  interface BackendErrorResponse {
   message: string;
  }

  interface ApiError {
    statusCode: HttpStatusCode | number;
    message: string;
    userMessage: string;
    category: ErrorCategory;
    errorType: BackendErrorType;
    isRetryable: boolean;
    timestamp: Date;
    originalError?: unknown;
  }

  interface NetworkError extends ApiError {
    category: ErrorCategory.NETWORK_ERROR;
    isTimeout: boolean;
    isConnectionError: boolean;
  }

  function isApiError(error: unknown): error is ApiError {
    return (
      typeof error === "object" &&
      error !== null &&
      "statusCode" in error &&
      "message" in error &&
      "userMessage" in error &&
      "category" in error &&
      "errorType" in error &&
      "isRetryable" in error &&
      "timestamp" in error
    )
  }

  function isNetworkError(error: unknown): error is NetworkError {
    return (
      isApiError(error) &&
      error.category === ErrorCategory.NETWORK_ERROR &&
      "isTimeout" in error &&
      "isConnectionError" in error
    )
  }

}

export {}
