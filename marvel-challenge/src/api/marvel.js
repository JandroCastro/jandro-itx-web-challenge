//marvel-challenge/src/api/marvel.js
import { allCharactersAdapter, characterAdapter } from "./adapter";

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

    console.log(response);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);
    const character = characterAdapter(data);
    console.log(character);

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
    return data;
  } catch (error) {
    console.error("Error al obtener información del personaje:", error);
    return null;
  }
};
