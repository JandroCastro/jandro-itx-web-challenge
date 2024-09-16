import React from "react";
import { mockComics, render, screen } from "../../../setupTests";
import ComicCarousel from "./ComicCarousel";

describe("ComicCarousel component", () => {
  it("should render a list of comics", () => {
    render(<ComicCarousel comics={mockComics} />);

    expect(screen.getByText("Comic One")).toBeInTheDocument();
    expect(screen.getByText("Comic Two")).toBeInTheDocument();

    expect(screen.getByAltText("Comic One")).toBeInTheDocument();
    expect(screen.getByAltText("Comic Two")).toBeInTheDocument();

    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
  });

  it("should handle empty comics list", () => {
    render(<ComicCarousel comics={[]} />);

    const cards = screen.queryAllByText(/Comic/);
    expect(cards.length).toBe(0);
  });
});
