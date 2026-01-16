/**
 * Generates a cache key for news data
 */
export function createCacheKey(category: string, page: number): string {
  return `${category}-${page}`;
}

/**
 * Fetches news from API with error handling
 */
export async function fetchNewsFromAPI(
  category: string,
  page: number
): Promise<Response> {
  const response = await fetch(`/api/news?category=${category}&page=${page}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch news: ${response.statusText}`);
  }

  return response;
}

/**
 * Creates a cleanup timer for cache entries
 */
export function createCacheCleanupTimer(
  cache: Map<string, any>,
  key: string,
  ttl: number
): NodeJS.Timeout {
  return setTimeout(() => cache.delete(key), ttl);
}
