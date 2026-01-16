import NewsContainer from "@/components/news/NewsContainer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      <Image
        className="white:invert mt-11"
        src="https://cdn.prod.website-files.com/615dd49cfcfac745df0ff815/615dd49cfcfac72d4a0ff9cd_BLOTT_WHITE.svg"
        alt="Next.js logo"
        width={200}
        height={48}
        priority
      />
      <NewsContainer />
    </div>
  );
}
