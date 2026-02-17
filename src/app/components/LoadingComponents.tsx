"use client";

import React from 'react';

// Skeleton Loading Component
export function Skeleton({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] ${className}`}
      style={{
        background: 'linear-gradient(90deg, var(--bg-glass) 25%, var(--bg-glass-hover) 50%, var(--bg-glass) 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite'
      }}
      {...props}
    />
  );
}

// Skeleton Card for Marketplace Items
export function SkeletonCard() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-start gap-4">
        {/* Avatar Skeleton */}
        <Skeleton className="w-16 h-16 rounded-full" />

        <div className="flex-1 space-y-3">
          {/* Title Skeleton */}
          <Skeleton className="h-6 w-3/4 rounded" />

          {/* Description Skeleton */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-2/3 rounded" />
          </div>

          {/* Price Skeleton */}
          <Skeleton className="h-5 w-1/3 rounded" />

          {/* Action Buttons Skeleton */}
          <div className="flex gap-3 mt-4">
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="h-10 w-20 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Profile Skeleton
export function ProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-48 rounded" />
        <Skeleton className="h-10 w-32 rounded" />
      </div>

      {/* Profile Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Avatar Section */}
        <div className="text-center space-y-4">
          <Skeleton className="w-24 h-24 rounded-full mx-auto" />
          <Skeleton className="h-4 w-32 rounded mx-auto" />
          <Skeleton className="h-4 w-24 rounded mx-auto" />
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="h-10 w-full rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Skeleton className="h-12 w-32 rounded" />
        <Skeleton className="h-12 w-28 rounded" />
      </div>
    </div>
  );
}

// Loading Overlay Component
export function LoadingOverlay({ message = "Loading..." }: { message?: string }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
      style={{
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)'
      }}
    >
      <div className="glass-card p-8 text-center space-y-4">
        <div
          className="w-12 h-12 border-3 border-transparent border-t-current rounded-full mx-auto"
          style={{
            borderColor: 'transparent transparent var(--accent) transparent',
            animation: 'spin 1s linear infinite'
          }}
        />
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

// Inline Loading Spinner
export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  return (
    <div
      className={`${sizes[size]} border-2 border-transparent border-t-current rounded-full animate-spin`}
      style={{
        borderColor: 'transparent transparent var(--accent) transparent'
      }}
    />
  );
}

// Button Loading State
export function LoadingButton({
  loading,
  children,
  ...props
}: {
  loading: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} disabled={loading}>
      {loading ? (
        <div className="flex items-center gap-2">
          <LoadingSpinner size="sm" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
