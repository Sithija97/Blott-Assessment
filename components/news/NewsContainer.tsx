import React from "react";
import NewsHeader from "./NewsHeader";
import NewsGrid from "./NewsGrid";
import { getMarketNews } from "@/services/news.service";

const NewsContainer = async () => {
  const news = await getMarketNews("general");
  return (
    <section className="w-full px-15">
      <NewsHeader />
      <NewsGrid news={news} />
    </section>
  );
};

export default NewsContainer;
