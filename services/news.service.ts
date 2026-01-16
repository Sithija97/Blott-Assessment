import { INewsArticle } from "@/types/news";

const BASE_URL = process.env.BASE_URL;

export async function getMarketNews(
  category: string = "general"
): Promise<INewsArticle[]> {
  const res = await fetch(
    `${BASE_URL}/news?category=${category}&token=${process.env.FINNHUB_API_KEY}`,
    {
      next: {
        revalidate: 120,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch market news");
  }

  return res.json();
}
