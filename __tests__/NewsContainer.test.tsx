import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import InfiniteNewsGrid from "@/components/news/InfiniteNewsGrid";
import type { INewsArticle } from "@/types";

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
  it("renders the news grid with initial articles", async () => {
    render(<InfiniteNewsGrid initialNews={mockArticles} category="general" />);

    await waitFor(() => {
      expect(screen.getByText(/chipmakers lead gains/i)).toBeInTheDocument();
    });
  });
});
