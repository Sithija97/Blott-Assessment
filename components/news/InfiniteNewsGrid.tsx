"use client";

import { useState, useCallback } from "react";
import { INewsArticle } from "@/types";
import NewsCard from "./NewsCard";
import NewsCardSkeleton from "./NewsCardSkeleton";
import { INTERSECTION_CONFIG, NEWS_CONFIG } from "@/lib/constants";
import { prefetchNews, getOrFetchNews } from "@/lib/prefetch";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface InfiniteNewsGridProps {
  initialNews: INewsArticle[];
  category?: string;
}

const InfiniteNewsGrid = ({
  initialNews,
  category = "general",
}: InfiniteNewsGridProps) => {
  const [news, setNews] = useState<INewsArticle[]>(initialNews);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handlePrefetch = useCallback(() => {
    if (hasMore && !loading) {
      prefetchNews(category, page + 1, NEWS_CONFIG.CACHE_TTL_MS);
    }
  }, [category, page, hasMore, loading]);

  const handleLoadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = page + 1;

    try {
      const newNews = await getOrFetchNews(category, nextPage);

      if (newNews.length === 0) {
        setHasMore(false);
      } else {
        setNews((prev) => [...prev, ...newNews]);
        setPage(nextPage);
        prefetchNews(category, nextPage + 1, NEWS_CONFIG.CACHE_TTL_MS);
      }
    } catch (error) {
      console.error("Failed to load more news:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, category]);

  const prefetchRef = useIntersectionObserver({
    onIntersect: handlePrefetch,
    rootMargin: INTERSECTION_CONFIG.PREFETCH_ROOT_MARGIN,
    enabled: hasMore && !loading,
  });

  const loadMoreRef = useIntersectionObserver({
    onIntersect: handleLoadMore,
    rootMargin: INTERSECTION_CONFIG.LOAD_MORE_ROOT_MARGIN,
    enabled: hasMore && !loading,
  });

  if (!news?.length) {
    return (
      <section className="flex flex-col items-center justify-center py-16">
        <p className="text-gray-500 text-lg md:text-xl">
          No news articles available at the moment.
        </p>
      </section>
    );
  }

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4.25">
        {news.map((article, index) => (
          <NewsCard
            key={article.id}
            article={article}
            size={index === 0 ? "large" : "medium"}
          />
        ))}

        {loading && (
          <>
            {Array.from({ length: INTERSECTION_CONFIG.SKELETON_COUNT }).map(
              (_, index) => (
                <NewsCardSkeleton key={`skeleton-${index}`} size="medium" />
              )
            )}
          </>
        )}
      </section>

      {/* Prefetch trigger - positioned earlier for anticipatory loading */}
      {hasMore && <div ref={prefetchRef} className="h-1 w-full" />}

      {/* Main intersection observer target */}
      {hasMore && <div ref={loadMoreRef} className="h-10 w-full" />}

      {!hasMore && news.length > 0 && (
        <p className="text-center text-gray-500 py-8">
          No more articles to load
        </p>
      )}
    </>
  );
};

export default InfiniteNewsGrid;
