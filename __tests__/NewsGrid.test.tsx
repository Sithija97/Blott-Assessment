import { render, screen } from "@testing-library/react";
import NewsGrid from "@/components/news/NewsGrid";
import type { INewsArticle } from "@/types";

const mockArticles: INewsArticle[] = [
  {
    id: 1,
    category: "general",
    datetime: 1700000000,
    headline: "Oil Surges on Supply Shock",
    image: "https://example.com/oil.jpg",
    related: "CL",
    source: "MockWire",
    summary: "Benchmark crude rises sharply.",
    url: "https://example.com/oil",
  },
  {
    id: 2,
    category: "general",
    datetime: 1700001000,
    headline: "Housing Starts Beat Estimates",
    image: "https://example.com/housing.jpg",
    related: "HOUSING",
    source: "MockWire",
    summary: "Builders ramp production.",
    url: "https://example.com/housing",
  },
];

describe("NewsGrid", () => {
  it("renders an empty state message when no news is available", () => {
    render(<NewsGrid news={[]} />);

    expect(screen.getByText(/no news articles available/i)).toBeInTheDocument();
  });

  it("renders one card per article when news is provided", () => {
    render(<NewsGrid news={mockArticles} />);

    const links = screen.getAllByRole("link", { name: /read article/i });
    expect(links).toHaveLength(mockArticles.length);
  });
});
