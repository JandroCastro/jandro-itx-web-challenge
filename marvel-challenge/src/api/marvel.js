import {
  allCharactersAdapter,
  characterAdapter,
  comicsAdapter,
} from "./adapter";

export const fetchCharacters = async () => {
  try {
    const response = await fetch("/api/characters");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const characters = allCharactersAdapter(data.data);

    return characters;
  } catch (error) {
    console.error("Error al obtener la lista de personajes:", error);
    return [];
  }
};

export const fetchSearchCharacterByName = async (searchText) => {
  try {
    const response = await fetch(
      `/api/search?nameStartsWith=${encodeURIComponent(searchText)}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const characters = allCharactersAdapter(data.data);

    return characters;
  } catch (error) {
    console.error("Error al obtener la lista de personajes:", error);
    return [];
  }
};

export const fetchCharacterById = async (characterId) => {
  try {
    const response = await fetch(`/api/characters/${characterId}`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const character = characterAdapter(data);

    return character;
  } catch (error) {
    console.error("Error al obtener información del personaje:", error);
    return null;
  }
};

export const fetchCharacterComics = async (characterId) => {
  try {
    const response = await fetch(`/api/characters/${characterId}/comics`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const comics = comicsAdapter(data);

    return comics;
  } catch (error) {
    console.error("Error al obtener información del personaje:", error);
    return null;
  }
};
