import { render, screen } from "@testing-library/react";
import NewsCard from "@/components/news/NewsCard";
import type { INewsArticle } from "@/types";

const baseArticle: INewsArticle = {
  id: 42,
  category: "general",
  datetime: 1700000000,
  headline: "Tech Stocks Extend Rally",
  image: "https://example.com/tech.jpg",
  related: "AAPL",
  source: "MockWire",
  summary: "Investors push mega caps higher again.",
  url: "https://example.com/story",
};

describe("NewsCard", () => {
  it("renders the article headline and link", () => {
    render(<NewsCard article={baseArticle} size="medium" />);

    expect(
      screen.getByRole("heading", { name: baseArticle.headline })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /read article/i })).toHaveAttribute(
      "href",
      baseArticle.url
    );
  });

  it("shows a placeholder when no image is provided", () => {
    const articleWithoutImage = { ...baseArticle, image: "" };

    render(<NewsCard article={articleWithoutImage} size="small" />);

    expect(screen.getByText(/no image/i)).toBeInTheDocument();
  });
});
