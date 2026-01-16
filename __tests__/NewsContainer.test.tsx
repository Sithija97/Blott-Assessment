import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import NewsContainer from "@/components/news/NewsContainer";
import { getMarketNews } from "@/services/news.service";
import type { INewsArticle } from "@/types";

vi.mock("@/services/news.service", () => ({
  getMarketNews: vi.fn(),
}));

const mockArticles: INewsArticle[] = [
  {
    id: 10,
    category: "general",
    datetime: 1700000000,
    headline: "Chipmakers Lead Gains",
    image: "https://example.com/chips.jpg",
    related: "SOX",
    source: "MockWire",
    summary: "Semiconductors pop on demand outlook.",
    url: "https://example.com/chips",
  },
];

describe("NewsContainer", () => {
  it("fetches news and renders the first headline", async () => {
    const mockedGetMarketNews = vi.mocked(getMarketNews);
    mockedGetMarketNews.mockResolvedValueOnce(mockArticles);

    const component = await NewsContainer();
    render(component);

    expect(getMarketNews).toHaveBeenCalledWith("general");
    expect(
      await screen.findByText(/chipmakers lead gains/i)
    ).toBeInTheDocument();
  });
});
