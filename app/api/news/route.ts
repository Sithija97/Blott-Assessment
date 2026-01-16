import { NextRequest, NextResponse } from "next/server";
import { getMarketNews } from "@/services/news.service";
import { NEWS_CONFIG } from "@/lib/constants";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category") || "general";
    const page = parseInt(searchParams.get("page") || "1", 10);

    const news = await getMarketNews(category, page);

    return NextResponse.json(news, {
      headers: {
        "Cache-Control": `public, s-maxage=${NEWS_CONFIG.API_CACHE_SECONDS}, stale-while-revalidate=${NEWS_CONFIG.API_STALE_WHILE_REVALIDATE}`,
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
