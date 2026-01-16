import React, { Suspense } from "react";
import NewsHeader from "./NewsHeader";
import InfiniteNewsGrid from "./InfiniteNewsGrid";
import NewsGridSkeleton from "./NewsGridSkeleton";
import { getMarketNews } from "@/services/news.service";

const NewsContent = async () => {
  const initialNews = await getMarketNews("general", 1);
  return <InfiniteNewsGrid initialNews={initialNews} category="general" />;
};

const NewsContainer = () => {
  return (
    <section className="w-full px-15">
      <NewsHeader />
      <Suspense fallback={<NewsGridSkeleton />}>
        <NewsContent />
      </Suspense>
    </section>
  );
};

export default NewsContainer;
