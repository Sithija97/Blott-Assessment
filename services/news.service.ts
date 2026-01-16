import { INewsArticle } from "@/types/news";
import { NEWS_CONFIG } from "@/lib/constants";
import { createCacheKey } from "@/lib/utils";

// Request deduplication cache
const pendingRequests = new Map<string, Promise<INewsArticle[]>>();

export async function getMarketNews(
  category: string = "general",
  page: number = 1
): Promise<INewsArticle[]> {
  const BASE_URL = process.env.BASE_URL;
  const cacheKey = createCacheKey(category, page);

  // Return pending request if exists (deduplication)
  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey)!;
  }

  const fetchPromise = (async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/news?category=${category}&token=${process.env.FINNHUB_API_KEY}`,
        {
          next: {
            revalidate: NEWS_CONFIG.REVALIDATE_SECONDS,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch market news");
      }

      const allNews: INewsArticle[] = await res.json();

      // Paginate results
      const startIndex = (page - 1) * NEWS_CONFIG.ITEMS_PER_PAGE;
      const endIndex = startIndex + NEWS_CONFIG.ITEMS_PER_PAGE;

      return allNews.slice(startIndex, endIndex);
    } finally {
      // Clean up pending request after completion
      pendingRequests.delete(cacheKey);
    }
  })();

  pendingRequests.set(cacheKey, fetchPromise);
  return fetchPromise;
}

export async function getAllMarketNews(
  category: string = "general"
): Promise<INewsArticle[]> {
  const BASE_URL = process.env.BASE_URL;

  const res = await fetch(
    `${BASE_URL}/news?category=${category}&token=${process.env.FINNHUB_API_KEY}`,
    {
      next: {
        revalidate: NEWS_CONFIG.REVALIDATE_SECONDS,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch market news");
  }

  return res.json();
}
