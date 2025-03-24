import { lazy, Suspense, ComponentType, ReactNode } from "react";

// Loading fallback component
export const LoadingFallback = () => <div className="loading">Loading...</div>;

interface LazyLoadProps {
  component: () => Promise<{ default: ComponentType<any> }>;
  fallback?: ReactNode;
  props?: Record<string, any>;
}

/**
 * LazyLoad component for easily integrating code splitting in any part of the app
 * @param component Function that returns import of the component
 * @param fallback Optional custom fallback, uses default LoadingFallback if not provided
 * @param props Props to pass to the loaded component
 */
export const LazyLoad = ({
  component,
  fallback = <LoadingFallback />,
  props = {},
}: LazyLoadProps) => {
  const LazyComponent = lazy(component);

  return (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

/**
 * Create a lazy loaded component with a custom name
 * @param componentImport Function that returns import of the component
 */
export const createLazyComponent = <P extends object>(
  componentImport: () => Promise<{ default: ComponentType<P> }>,
) => {
  const LazyComponent = lazy(componentImport);

  const WrappedComponent = (props: P) => (
    <Suspense fallback={<LoadingFallback />}>
      <LazyComponent {...props} />
    </Suspense>
  );

  return WrappedComponent;
};

export default LazyLoad;
