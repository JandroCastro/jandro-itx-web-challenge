import React from "react";
import CharacterList from "./CharacterList";
import {
  mockContextLoading,
  mockContextWithCharacters,
  mockEmptyContext,
  mockFavoritesContext,
  render,
  screen,
  waitFor,
} from "../../../setupTests";
import { useSearchParams } from "next/navigation";

describe("CharacterList Component", () => {
  beforeEach(() => {
    jest
      .spyOn(require("@/context/CharactersCtx"), "useCharactersContext")
      .mockReturnValue(mockContextWithCharacters);
    jest
      .spyOn(require("@/context/FavoritesCtx"), "useFavoritesContext")
      .mockReturnValue(mockFavoritesContext);

    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  it("should render the SkeletonGrid while loading", () => {
    jest
      .spyOn(require("@/context/CharactersCtx"), "useCharactersContext")
      .mockReturnValue(mockContextLoading);

    useSearchParams.mockReturnValue({
      get: () => null,
    });

    render(<CharacterList />);

    expect(screen.getByTestId("skeleton-grid")).toBeInTheDocument();
  });

  it("should render characters correctly", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        data: { results: [{ id: 1, name: "Character 1", img: "/char1.jpg" }] },
      })
    );

    await waitFor(async () => {
      render(<CharacterList />);
    });

    expect(screen.getByText("Character 1")).toBeInTheDocument();
  });

  it("should render favorite characters when view=favorites", () => {
    useSearchParams.mockReturnValue({
      get: () => "favorites",
    });

    render(<CharacterList />);

    expect(screen.getByText("Favorite Character")).toBeInTheDocument();
    expect(screen.getByText("1 RESULTS")).toBeInTheDocument();
  });

  it("should render 0 results when no characters are available", async () => {
    useSearchParams.mockReturnValue({
      get: () => null,
    });

    jest
      .spyOn(require("@/context/CharactersCtx"), "useCharactersContext")
      .mockReturnValue(mockEmptyContext);

    render(<CharacterList />);

    await waitFor(() => {
      expect(screen.getByText("0 RESULTS")).toBeInTheDocument();
    });
  });
});
