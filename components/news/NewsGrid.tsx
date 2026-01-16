import { INewsArticle } from "@/types";
import NewsCard from "./NewsCard";

interface IProps {
  news: INewsArticle[];
}

const NewsGrid = ({ news }: IProps) => {
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
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4.25">
      {news.map((article, index) => (
        <NewsCard
          key={article.id}
          article={article}
          size={index === 0 ? "large" : "medium"}
        />
      ))}
    </section>
  );
};

export default NewsGrid;
