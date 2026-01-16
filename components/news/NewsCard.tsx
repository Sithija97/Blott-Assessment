import { INewsArticle } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { CARD_SIZES, IMAGE_CONFIG, type CardSize } from "@/lib/constants";

interface NewsCardProps {
  article: INewsArticle;
  size?: CardSize;
}

interface ArticleImageProps {
  article: INewsArticle;
  height: string;
  isPriority?: boolean;
}

const ArticleImage = ({
  article,
  height,
  isPriority = false,
}: ArticleImageProps) => (
  <div className={`relative w-full ${height} overflow-hidden`}>
    {article.image ? (
      <Image
        src={article.image}
        alt={article.headline}
        fill
        className="object-cover brightness-75 transition-all group-hover:brightness-90"
        sizes={IMAGE_CONFIG.SIZES}
        priority={isPriority}
        loading={isPriority ? undefined : "lazy"}
        quality={IMAGE_CONFIG.QUALITY}
      />
    ) : (
      <div className="flex h-full w-full items-center justify-center bg-zinc-800">
        <span className="text-zinc-500">No image</span>
      </div>
    )}
  </div>
);

const ReadMoreLink = () => (
  <div className="flex items-start gap-1 text-sm font-medium text-white">
    <span className="inline-flex flex-col">
      <p className="font-roboto text-[15px] font-normal leading-[100%] tracking-normal">
        Read Article
      </p>
      <span className="mt-1.75 h-px w-full bg-white"></span>
    </span>

    <svg
      className="h-4 w-4 transition-transform group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  </div>
);

const NewsCard = ({ article, size = "medium" }: NewsCardProps) => {
  const config = CARD_SIZES[size];
  const isPriority = size === "large";

  return (
    <Link
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group overflow-hidden rounded-md transition-transform ${config.containerClass}`}
    >
      <ArticleImage
        article={article}
        height={config.imageHeight}
        isPriority={isPriority}
      />

      <div className="flex flex-col">
        <h2 className="font-roboto text-[24px] font-normal leading-[130%] tracking-[-0.04em] my-4">
          {article.headline}
        </h2>

        {config.showSummary && article.summary && (
          <p className="my-4 line-clamp-2 text-sm text-zinc-300">
            {article.summary}
          </p>
        )}

        <ReadMoreLink />
      </div>
    </Link>
  );
};

export default NewsCard;
