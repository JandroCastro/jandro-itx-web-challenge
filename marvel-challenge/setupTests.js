import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import "whatwg-fetch";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

export const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
};
jest.mock("@/context/CharactersCtx", () => ({
  useCharactersContext: jest.fn(() => ({
    actions: {
      clearSearch: jest.fn(),
      getHeroesByText: jest.fn(() => Promise.resolve()),
      getAllHeroes: jest.fn(() => Promise.resolve()),
      setLoading: jest.fn(),
    },
  })),
}));
jest.mock("@/context/FavoritesCtx", () => ({
  useFavoritesContext: jest.fn(() => ({
    favorites: mockFavorites,
    toggleFavorite: jest.fn(),
  })),
  useFavoritesSelector: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(() => new URLSearchParams()),
  useRouter: jest.fn(() => mockRouter),
}));

export const mockFavorites = [
  { id: 1, name: "Favorite Character", img: "/favorite.jpg" },
];

export const mockCharacters = [
  { id: 1, name: "Character 1", img: "/char1.jpg" },
  { id: 2, name: "Character 2", img: "/char2.jpg" },
];

export const mockEmptyContext = {
  state: { characters: [], loading: false },
};

export const mockContextLoading = {
  state: { characters: [], loading: true },
};

export const mockContextWithCharacters = {
  state: { characters: mockCharacters, loading: false },
};

export const mockFavoritesContext = {
  favorites: mockFavorites,
  toggleFavorite: jest.fn(),
};

export const mockComics = [
  {
    img: "/comic1.jpg",
    title: "Comic One",
    dates: [{ type: "onsaleDate", date: "2024-01-01" }],
  },
  {
    img: "/comic2.jpg",
    title: "Comic Two",
    dates: [{ type: "onsaleDate", date: "2023-12-01" }],
  },
];

const customRender = (ui, options) => render(ui, { ...options });

export * from "@testing-library/react";
export { customRender as render };
