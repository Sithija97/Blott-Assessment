import { INewsArticle } from "@/types";
import { NEWS_CONFIG } from "@/lib/constants";
import { createCacheKey } from "@/lib/utils";

// Cache for prefetched data
const prefetchCache = new Map<string, Promise<INewsArticle[]>>();

/**
 * Prefetch news data for a specific page
 */
export function prefetchNews(
  category: string,
  page: number,
  ttl: number = NEWS_CONFIG.CACHE_TTL_MS
): void {
  const cacheKey = createCacheKey(category, page);

  if (prefetchCache.has(cacheKey)) return;

  const fetchPromise = fetch(
    `/api/news?category=${category}&page=${page}`
  ).then((res) => res.json());

  prefetchCache.set(cacheKey, fetchPromise);

  // Auto-cleanup
  setTimeout(() => prefetchCache.delete(cacheKey), ttl);
}

/**
 * Get prefetched news data or fetch fresh
 */
export async function getOrFetchNews(
  category: string,
  page: number
): Promise<INewsArticle[]> {
  const cacheKey = createCacheKey(category, page);

  // Use prefetched data if available
  if (prefetchCache.has(cacheKey)) {
    const data = await prefetchCache.get(cacheKey)!;
    prefetchCache.delete(cacheKey);
    return data;
  }

  // Fetch fresh
  const response = await fetch(`/api/news?category=${category}&page=${page}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch news: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Clear prefetch cache
 */
export function clearPrefetchCache(): void {
  prefetchCache.clear();
}
