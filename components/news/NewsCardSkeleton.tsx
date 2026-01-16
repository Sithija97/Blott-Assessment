import { CARD_SIZES, type CardSize } from "@/lib/constants";

interface NewsCardSkeletonProps {
  size?: CardSize;
}

const NewsCardSkeleton = ({ size = "medium" }: NewsCardSkeletonProps) => {
  const { containerClass, imageHeight } = CARD_SIZES[size];

  return (
    <div
      className={`overflow-hidden rounded-md ${containerClass} animate-pulse`}
    >
      <div className={`relative w-full ${imageHeight} bg-zinc-800`} />

      <div className="flex flex-col">
        <div className="my-4 space-y-2">
          <div className="h-6 bg-zinc-800 rounded w-3/4" />
          <div className="h-6 bg-zinc-800 rounded w-1/2" />
        </div>

        <div className="h-4 bg-zinc-800 rounded w-24" />
      </div>
    </div>
  );
};

export default NewsCardSkeleton;
