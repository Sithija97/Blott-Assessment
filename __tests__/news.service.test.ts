import { describe, expect, it, vi, afterEach, beforeEach } from "vitest";
import { getMarketNews } from "@/services/news.service";
import type { INewsArticle } from "@/types";

const mockArticles: INewsArticle[] = [
  {
    id: 1,
    headline: "Fed Holds Rates Steady",
    category: "general",
    datetime: 1700000000,
    image: "https://example.com/image.jpg",
    related: "MARKET",
    source: "MockWire",
    summary: "Central bank pauses amid mixed data.",
    url: "https://example.com/article",
  },
];

describe("getMarketNews", () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("fetch", mockFetch);
    process.env.BASE_URL = "https://mock.api";
    process.env.FINNHUB_API_KEY = "demo";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetAllMocks();
  });

  it("returns parsed articles on success", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockArticles),
    });

    const result = await getMarketNews("general");

    expect(fetch).toHaveBeenCalledWith(
      `https://mock.api/news?category=general&token=demo`,
      expect.objectContaining({
        next: expect.objectContaining({ revalidate: 120 }),
      })
    );
    expect(result).toEqual(mockArticles);
  });

  it("throws when the API responds with an error", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });

    await expect(getMarketNews("general")).rejects.toThrow(
      "Failed to fetch market news"
    );
  });
});
