import { INewsArticle } from "@/types/news";

export async function getMarketNews(
  category: string = "general"
): Promise<INewsArticle[]> {
  const BASE_URL = process.env.BASE_URL;
  
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
