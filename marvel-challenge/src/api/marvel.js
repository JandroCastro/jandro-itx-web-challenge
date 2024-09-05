//marvel-challenge/src/app/api/characters/route.js
import axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import md5 from "md5";
import { allCharactersAdapter } from "./adapter";

const BASE_URL = "https://gateway.marvel.com:443/v1/public/characters";

const timestamp = new Date().toISOString();
const md5hash = md5(
  timestamp +
    process.env.NEXT_PUBLIC_MARVEL_PRIVATE_API_KEY +
    process.env.NEXT_PUBLIC_MARVEL_PUBLIC_API_KEY
);

const querySSRParams = {
  ts: timestamp,
  apikey: process.env.NEXT_PUBLIC_MARVEL_PUBLIC_API_KEY,
  hash: md5hash,
};

const instance = axios.create();
const api = setupCache(instance);

export const fetchCharacters = async () => {
  try {
    const result = await api.get(BASE_URL, {
      params: { limit: 50, orderBy: "name", ...querySSRParams },
    });

    const characters = allCharactersAdapter(result.data.data);

    return characters;
  } catch (error) {
    console.error("Error al obtener la lista de personajes:", error);
    return [];
  }
};

export const fetchSearchCharacterByName = async (searchText) => {
  try {
    console.log(searchText);
    const response = await api.get(`${BASE_URL}`, {
      params: { nameStartsWith: searchText, ...querySSRParams },
    });
    console.log(response.data.data.results);
    return response.data.data.results;
  } catch (error) {
    console.error("Error al obtener la lista de personajes:", error);
    return [];
  }
};

// Función para obtener información detallada de un personaje específico por su ID
export const fetchCharacterById = async (characterId) => {
  try {
    const response = await api.get(`${BASE_URL}/${characterId}`, {
      params: querySSRParams,
    });
    return response.data.data.results[0];
  } catch (error) {
    console.error("Error al obtener información del personaje:", error);
    return null;
  }
};

export const fetchCharacterComics = async (characterId) => {
  try {
    const response = await api.get(`${BASE_URL}/${characterId}/comics`, {
      formatType: "comic",
      orderBy: "onsaleDate",
      limit: 20,
      params: querySSRParams,
    });
    const comics = comicsAdapter(result.data.data.results);

    return comics;
  } catch (error) {
    console.error("Error al obtener información del personaje:", error);
    return null;
  }
};
