import { useEffect, useRef } from "react";

interface UseIntersectionObserverOptions {
  onIntersect: () => void;
  rootMargin?: string;
  threshold?: number;
  enabled?: boolean;
}

/**
 * Custom hook for Intersection Observer
 */
export function useIntersectionObserver({
  onIntersect,
  rootMargin = "0px",
  threshold = 0,
  enabled = true,
}: UseIntersectionObserverOptions) {
  const targetRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const currentObserver = observerRef.current;
    const currentTarget = targetRef.current;

    // Clean up previous observer
    if (currentObserver && currentTarget) {
      currentObserver.unobserve(currentTarget);
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { rootMargin, threshold }
    );

    // Start observing
    if (currentTarget) {
      observerRef.current.observe(currentTarget);
    }

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [onIntersect, rootMargin, threshold, enabled]);

  return targetRef;
}
