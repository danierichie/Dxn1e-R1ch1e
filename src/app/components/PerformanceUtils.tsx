"use client";

import React, { Suspense } from 'react';
import { LoadingSpinner } from './LoadingComponents';

// Lazy loading wrapper with suspense fallback
export function LazyWrapper({
  children,
  fallback = <LoadingSpinner size="md" />
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}

// Lazy loaded components using React.lazy
export const LazyCommunitySection = React.lazy(() => import('../components/CommunitySection'));
export const LazyReviewSystem = React.lazy(() => import('../components/ReviewSystem'));
export const LazyReviewForm = React.lazy(() => import('../components/ReviewForm'));
export const LazyAuthPrompt = React.lazy(() => import('../components/AuthPrompt'));

// Optimized Image Component with lazy loading
export function OptimizedImage({
  src,
  alt,
  className = "",
  priority = false,
  placeholder = "blur",
  blurDataURL,
  ...props
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
} & React.ImgHTMLAttributes<HTMLImageElement>) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
      )}
      {hasError ? (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
          <span className="text-gray-500 dark:text-gray-400 text-sm">Image failed to load</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
          {...props}
        />
      )}
    </div>
  );
}

// Intersection Observer Hook for lazy loading
export function useIntersectionObserver(
  ref: React.RefObject<Element | null>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, options]);

  return isIntersecting;
}

// Lazy Load Wrapper for any component
export function LazyLoad({
  children,
  className = "",
  style = {},
  threshold = 0.1,
  rootMargin = "50px",
  placeholder,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
  rootMargin?: string;
  placeholder?: React.ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(ref, { threshold, rootMargin });

  return (
    <div ref={ref} className={className} style={style}>
      {isIntersecting ? children : (placeholder || <div className="min-h-[200px] bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />)}
    </div>
  );
}

// Performance monitoring hook
export function usePerformanceMonitor(componentName: string) {
  React.useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;

      // Log performance in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`${componentName} render time: ${duration.toFixed(2)}ms`);
      }

      // You could send this to analytics service
      // analytics.track('component_render_time', { component: componentName, duration });
    };
  }, [componentName]);
}

// Debounce hook for performance
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Memoized callback hook
export function useCallbackRef<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T {
  const callbackRef = React.useRef<T>(callback);

  React.useEffect(() => {
    callbackRef.current = callback;
  }, deps);

  return React.useCallback((...args: Parameters<T>) => {
    return callbackRef.current(...args);
  }, []) as T;
}

// Virtual scrolling hook for large lists
export function useVirtualScroll<T>({
  items,
  itemHeight,
  containerHeight,
  overscan = 5,
}: {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}) {
  const [scrollTop, setScrollTop] = React.useState(0);

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);

  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  return {
    visibleItems,
    totalHeight,
    offsetY,
    onScroll: (e: React.UIEvent<HTMLDivElement>) => {
      setScrollTop(e.currentTarget.scrollTop);
    },
  };
}
