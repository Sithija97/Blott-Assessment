import { render, screen } from "@testing-library/react";
import NewsHeader from "@/components/news/NewsHeader";

describe("NewsHeader", () => {
  it("displays the composed headline", () => {
    render(<NewsHeader />);

    expect(screen.getByText(/latest news/i)).toBeInTheDocument();
    expect(screen.getByText(/from/i)).toBeInTheDocument();
    expect(screen.getByText(/the world/i)).toBeInTheDocument();
  });
});
