import React from "react";
import CharacterCard from "./CharacterCard";
import {
  useFavoritesContext,
  useFavoritesSelector,
} from "@/context/FavoritesCtx";
import { useRouter } from "next/navigation";
import { fireEvent, render } from "../../../setupTests";

describe("CharacterCard", () => {
  const character = {
    id: 1,
    name: "Iron Man",
    img: "/ironman.jpg",
  };

  const mockToggleFavorite = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    mockToggleFavorite.mockReset();
    mockPush.mockReset();

    useFavoritesContext.mockReturnValue({
      toggleFavorite: mockToggleFavorite,
    });

    useFavoritesSelector.mockReturnValue(false);
    useRouter.mockReturnValue({
      push: mockPush,
    });
  });

  it("renders character card correctly", () => {
    const { getByText, getByAltText } = render(
      <CharacterCard character={character} />
    );

    expect(getByText("Iron Man")).toBeInTheDocument();

    expect(getByAltText("Iron Man")).toBeInTheDocument();
  });

  it("calls toggleFavorite when clicking on favorite button", () => {
    const { getByAltText } = render(<CharacterCard character={character} />);

    const favoriteButton = getByAltText("No fav Logo");

    fireEvent.click(favoriteButton);

    expect(mockToggleFavorite).toHaveBeenCalledWith(character);
  });

  it("navigates to character detail page when clicking on card", () => {
    const { getByText } = render(<CharacterCard character={character} />);

    const card = getByText("Iron Man");

    fireEvent.click(card);

    expect(mockPush).toHaveBeenCalledWith("/character/1");
  });

  it("displays filled heart icon when character is favorite", () => {
    useFavoritesSelector.mockReturnValue(true);

    const { getByAltText } = render(<CharacterCard character={character} />);

    expect(getByAltText("Favorites Logo")).toBeInTheDocument();
  });

  it("displays unfilled heart icon when character is not favorite", () => {
    useFavoritesSelector.mockReturnValue(false);

    const { getByAltText } = render(<CharacterCard character={character} />);

    expect(getByAltText("No fav Logo")).toBeInTheDocument();
  });
});
