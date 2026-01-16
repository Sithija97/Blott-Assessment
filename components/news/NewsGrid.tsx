import { INewsArticle } from "@/types";

interface IProps {
  news: INewsArticle[];
}

const NewsGrid = ({ news }: IProps) => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4.25">
      {news.map((article) => (
        <p key={article.id}>{article.headline}</p>
      ))}
    </section>
  );
};

export default NewsGrid;
