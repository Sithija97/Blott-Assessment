import NewsCardSkeleton from "./NewsCardSkeleton";

const NewsGridSkeleton = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4.25">
      <NewsCardSkeleton size="large" />
      {Array.from({ length: 7 }).map((_, index) => (
        <NewsCardSkeleton key={index} size="medium" />
      ))}
    </section>
  );
};

export default NewsGridSkeleton;
