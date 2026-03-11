"use client";

import React from 'react';
import { AlertTriangle, Search, WifiOff } from "lucide-react";

// Error Boundary Component for catching React errors
class ErrorBoundary extends React.Component<
  {
    children: React.ReactNode;
    fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error!} resetError={this.resetError} />;
      }

      return <DefaultErrorFallback error={this.state.error!} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

// Default Error Fallback Component
function DefaultErrorFallback({ error, resetError }: { error: Error; resetError: () => void }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)'
      }}
    >
      <div
        className="glass-card"
        style={{
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center',
          padding: '40px 24px'
        }}
      >
        <div style={{ color: "var(--accent)", marginBottom: '20px', display: "flex", justifyContent: "center" }}>
          <AlertTriangle size={60} />
        </div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>
          Something went wrong
        </h2>
        <p style={{
          color: 'var(--text-tertiary)',
          marginBottom: '24px',
          lineHeight: 1.6
        }}>
          We're sorry, but something unexpected happened. Please try refreshing the page.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <details style={{
            textAlign: 'left',
            marginBottom: '24px',
            padding: '16px',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-glass)',
            borderRadius: '8px'
          }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
              Error Details (Development)
            </summary>
            <pre style={{
              marginTop: '12px',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              overflow: 'auto',
              whiteSpace: 'pre-wrap'
            }}>
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={resetError}
            className="btn-primary"
            style={{ padding: '12px 24px' }}
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="btn-outline"
            style={{ padding: '12px 24px' }}
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
}

// Component-specific Error Boundary
export function ComponentErrorBoundary({
  children,
  componentName = 'Component'
}: {
  children: React.ReactNode;
  componentName?: string;
}) {
  return (
    <ErrorBoundary
      fallback={({ error, resetError }) => (
        <div
          className="glass-card"
          style={{
            padding: '24px',
            textAlign: 'center',
            border: '1px solid #ff6b6b',
            background: 'rgba(255, 107, 107, 0.1)'
          }}
        >
          <div style={{ color: "#ff6b6b", marginBottom: '16px', display: "flex", justifyContent: "center" }}>
            <AlertTriangle size={32} />
          </div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>
            {componentName} Error
          </h3>
          <p style={{ color: 'var(--text-tertiary)', marginBottom: '16px' }}>
            This component encountered an error and couldn't load properly.
          </p>
          <button
            onClick={resetError}
            className="btn-outline"
            style={{ padding: '8px 16px', fontSize: '0.9rem' }}
          >
            Retry
          </button>
        </div>
      )}
      onError={(error) => {
        console.error(`${componentName} Error:`, error);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

// Async Error Handler Hook
export function useAsyncError() {
  const [, setError] = React.useState();

  return React.useCallback((error: Error) => {
    setError(() => {
      throw error;
    });
  }, []);
}

// Error Page Component for 404/Not Found
export function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)'
      }}
    >
      <div
        className="glass-card"
        style={{
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center',
          padding: '40px 24px'
        }}
      >
        <div style={{ color: "var(--accent)", marginBottom: '20px', display: "flex", justifyContent: "center" }}>
          <Search size={80} />
        </div>
        <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>
          Page Not Found
        </h1>
        <p style={{
          color: 'var(--text-tertiary)',
          marginBottom: '32px',
          lineHeight: 1.6
        }}>
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="/"
            className="btn-primary"
            style={{ padding: '12px 24px', textDecoration: 'none' }}
          >
            Go Home
          </a>
          <a
            href="/marketplace"
            className="btn-outline"
            style={{ padding: '12px 24px', textDecoration: 'none' }}
          >
            Browse Marketplace
          </a>
        </div>
      </div>
    </div>
  );
}

// Network Error Component
export function NetworkError({ onRetry }: { onRetry?: () => void }) {
  return (
    <div
      style={{
        padding: '40px 20px',
        textAlign: 'center',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)'
      }}
    >
      <div className="glass-card" style={{ padding: '32px 24px' }}>
        <div style={{ color: "var(--accent)", marginBottom: '20px', display: "flex", justifyContent: "center" }}>
          <WifiOff size={60} />
        </div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>
          Connection Error
        </h3>
        <p style={{
          color: 'var(--text-tertiary)',
          marginBottom: '24px',
          lineHeight: 1.6
        }}>
          Unable to connect to the server. Please check your internet connection and try again.
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-primary"
            style={{ padding: '12px 24px' }}
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorBoundary;
