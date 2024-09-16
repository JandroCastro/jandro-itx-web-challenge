import React from "react";
import { render, screen, fireEvent, waitFor } from "../../../setupTests";
import SearchBar from "./SearchBar";

const mockGetHeroesByText = jest.fn();
const mockGetAllHeroes = jest.fn();
const mockSetLoading = jest.fn();

jest.mock("@/context/CharactersCtx", () => ({
  useCharactersContext: jest.fn(() => ({
    actions: {
      getHeroesByText: mockGetHeroesByText,
      getAllHeroes: mockGetAllHeroes,
      setLoading: mockSetLoading,
    },
  })),
}));

const mockReplace = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace }),
}));

describe("SearchBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza el componente correctamente", () => {
    render(<SearchBar />);
    expect(
      screen.getByPlaceholderText("Search a character...")
    ).toBeInTheDocument();
  });

  it("llama a getHeroesByText con el texto correcto después del debounce", async () => {
    render(<SearchBar />);
    fireEvent.change(screen.getByPlaceholderText("Search a character..."), {
      target: { value: "Spider-Man" },
    });

    await waitFor(
      () => {
        expect(mockSetLoading).toHaveBeenCalledWith(true);
      },
      { timeout: 600 }
    );

    await waitFor(
      () => {
        expect(mockGetHeroesByText).toHaveBeenCalledWith("Spider-Man");
        expect(mockGetAllHeroes).not.toHaveBeenCalled();
      },
      { timeout: 600 }
    );
  });

  it("llama a getAllHeroes cuando el valor de búsqueda está vacío después de haber tenido texto", async () => {
    render(<SearchBar />);

    fireEvent.change(screen.getByPlaceholderText("Search a character..."), {
      target: { value: "Spider-Man" },
    });

    await waitFor(() => {
      expect(mockGetHeroesByText).toHaveBeenCalledWith("Spider-Man");
      expect(mockGetAllHeroes).not.toHaveBeenCalled();
    });

    fireEvent.change(screen.getByPlaceholderText("Search a character..."), {
      target: { value: "" },
    });

    await waitFor(
      () => {
        expect(mockSetLoading).toHaveBeenCalledWith(true);
      },
      { timeout: 600 }
    );

    await waitFor(
      () => {
        expect(mockGetAllHeroes).toHaveBeenCalled();
      },
      { timeout: 600 }
    );
  });

  it("actualiza la URL correctamente eliminando el parámetro view", () => {
    render(<SearchBar />);

    window.history.pushState({}, "", "/?view=test");

    fireEvent.change(screen.getByPlaceholderText("Search a character..."), {
      target: { value: "Wolverine" },
    });

    waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith(window.location.pathname);
    });
  });
});
