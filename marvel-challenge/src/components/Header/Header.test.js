import React from "react";
import { screen } from "@testing-library/react";
import Header from "./Header";
import { render, mockFavoritesContext } from "../../../setupTests";

describe("Header component", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
  it("should render the Marvel logo in the header", () => {
    jest
      .spyOn(require("@/context/FavoritesCtx"), "useFavoritesContext")
      .mockReturnValue(mockFavoritesContext);

    render(<Header />);
    const logo = screen.getByAltText("Marvel Logo");
    expect(logo).toBeInTheDocument();
  });

  it("should display the correct number of favorites", () => {
    jest
      .spyOn(require("@/context/FavoritesCtx"), "useFavoritesContext")
      .mockReturnValue(mockFavoritesContext);

    render(<Header />);
    const favCount = screen.getByText("1");
    expect(favCount).toBeInTheDocument();
  });

  it("should render the favorite icon", () => {
    jest
      .spyOn(require("@/context/FavoritesCtx"), "useFavoritesContext")
      .mockReturnValue(mockFavoritesContext);

    render(<Header />);
    const favIcon = screen.getByAltText("Fav Icon");
    expect(favIcon).toBeInTheDocument();
  });

  it('should display "0" when there are no favorites', () => {
    jest
      .spyOn(require("@/context/FavoritesCtx"), "useFavoritesContext")
      .mockReturnValue({ favorites: [] });

    render(<Header />);
    const favCount = screen.getByText("0");
    expect(favCount).toBeInTheDocument();
  });
});
