import React, { Component, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface ErrorBoundaryProps {
  children: ReactNode
  navigate: ReturnType<typeof useNavigate>
}

interface ErrorBoundaryState {
  hasError: boolean
  error: {
    message?: string
  }
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: {} }
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error('ErrorBoundary caught an error', error, errorInfo)
    this.setState({ error })
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: {} })
    this.props.navigate(-1)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <main className="font-press bg-[#BFBFBF] flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
          <h1 className=" text-lg sm:text-xl font-bold">
            Something went wrong :_(
          </h1>
          <div className="flex justify-center items-center relative w-full max-w-xl">
            <img
              className="top-[-66px] sm:top-[-80px] sm:left-[-88px] left-[-50px] select-none"
              src="/mine-icon.png"
              width={176}
              height={230}
              alt="Mine Icon"
            />
          </div>
          <div className="text-[13px] gap-2 text-center">
            {this.state.error?.message && (
              <p className="mb-4">{this.state.error.message}</p>
            )}
            <p>Try again later or go back to the previous page.</p>
            <button
              className="text-black hover:text-gray-500"
              onClick={this.resetErrorBoundary}>
              [Back]
            </button>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
