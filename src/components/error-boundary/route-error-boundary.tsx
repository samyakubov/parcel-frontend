"use client"

import React, { Component, ReactNode } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

/**
 * Error Boundary specifically for route-related components
 * Prevents route errors from crashing the entire application
 */
export class RouteErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[Route Error Boundary] Caught error:", error, errorInfo)

    this.setState({
      error,
      errorInfo
    })

    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    this.logError(error, errorInfo)
  }

  private logError = (error: Error, errorInfo: React.ErrorInfo) => {
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    }

    console.error("[Route Error Boundary] Error details:", errorData)

  }

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }
      return (
        <div className="fixed top-4 right-4 z-50 max-w-sm">
          <Card className="bg-red-50 border-red-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-red-800 text-sm">
                <AlertTriangle className="h-4 w-4" />
                Route Feature Error
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-red-700 mb-3">
                There was an issue with the bus route visualization. The map and property search continue to work normally.
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={this.handleRetry}
                  className="text-red-700 border-red-300 hover:bg-red-100"
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Retry
                </Button>
              </div>
              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="mt-3">
                  <summary className="text-xs text-red-600 cursor-pointer">
                    Error Details (Dev Mode)
                  </summary>
                  <pre className="text-xs text-red-600 mt-1 overflow-auto max-h-32">
                    {this.state.error.message}
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

export function withRouteErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  const WrappedComponent = (props: P) => (
    <RouteErrorBoundary fallback={fallback}>
      <Component {...props} />
    </RouteErrorBoundary>
  )

  WrappedComponent.displayName = `withRouteErrorBoundary(${Component.displayName || Component.name})`

  return WrappedComponent
}

export default RouteErrorBoundary