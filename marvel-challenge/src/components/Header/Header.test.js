import React from "react";
import { screen } from "@testing-library/react";
import Header from "./Header";
import { render } from "../../../setupTests"; // Usa el render personalizado

// Mock para el contexto con algunos favoritos
const mockFavoritesContext = {
  favorites: [
    { id: 1, name: "Favorite 1" },
    { id: 2, name: "Favorite 2" },
  ],
  toggleFavorite: jest.fn(),
};

// Mock para el contexto vacío
const mockEmptyFavoritesContext = {
  favorites: [],
  toggleFavorite: jest.fn(),
};

describe("Header component", () => {
  it("renders without errors", () => {
    render(<Header />);
    expect(true).toBe(true); // Esto simplemente asegura que la prueba pase; se puede ajustar si es necesario
  });

  it("should render the Marvel logo in the header", () => {
    render(<Header />);
    const logo = screen.getByAltText("Marvel Logo");
    expect(logo).toBeInTheDocument();
  });

  it("should display the correct number of favorites", () => {
    // Mock el contexto con algunos favoritos
    jest
      .spyOn(require("@/context/FavoritesCtx"), "useFavoritesContext")
      .mockReturnValue(mockFavoritesContext);

    render(<Header />);
    const favCount = screen.getByText("2"); // Ajusta el número según el mock
    expect(favCount).toBeInTheDocument();
  });

  it("should render the favorite icon", () => {
    // Mock el contexto con algunos favoritos
    jest
      .spyOn(require("@/context/FavoritesCtx"), "useFavoritesContext")
      .mockReturnValue(mockFavoritesContext);

    render(<Header />);
    const favIcon = screen.getByAltText("Fav Icon");
    expect(favIcon).toBeInTheDocument();
  });

  it('should display "0" when there are no favorites', () => {
    // Mock el contexto vacío
    jest
      .spyOn(require("@/context/FavoritesCtx"), "useFavoritesContext")
      .mockReturnValue(mockEmptyFavoritesContext);

    render(<Header />);
    const favCount = screen.getByText("0"); // Aquí debería aparecer "0" si no hay favoritos
    expect(favCount).toBeInTheDocument();
  });
});
