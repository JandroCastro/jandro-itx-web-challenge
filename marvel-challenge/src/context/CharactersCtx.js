"use client";
import React, {
  useState,
  useMemo,
  createContext,
  useContext,
  useEffect,
} from "react";
import { fakehero, fakefilter } from "@/api/hero";
import { allHeroes } from "@/api/getHeroes";
import { fakecomics } from "@/api/comic";
import { useSearchParams } from "next/navigation";
import {
  fetchCharacters,
  fetchSearchCharacterByName,
  fetchCharacterById,
  fetchCharacterComics,
} from "@/api/marvel";

export const CharactersContext = createContext({});

export const CharactersProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [characterComics, setCharacterComics] = useState([]);
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllHeroes();
  }, []);

  const getAllHeroes = async () => {
    //Opcion A - Usar la API de Marvel
    // const data = await fetchCharacters();
    // setCharacters(data);

    //Opcion B - Usar datos dummy sacados de la API de Marvel
    setCharacters(allHeroes);
    setLoading(false);
  };

  const getHeroById = async (id) => {
    try {
      // Opción A - Usar la API de Marvel
      const hero = await fetchCharacterById(id);
      console.log("Fetched hero:", hero);
      setHero(hero);

      // Opción B - Usar datos dummy sacados de la API de Marvel
      // setHero(fakehero.data.results[0]);
    } catch (error) {
      console.error("Error al obtener el héroe:", error);
      setHero(null);
    }
  };

  const getHeroesByText = async (searchText) => {
    try {
      // Opción A - Usar la API de Marvel
      const heroes = await fetchSearchCharacterByName(searchText);
      setCharacters(heroes);

      // Opción B - Usar datos dummy sacados de la API de Marvel
      // setCharacters(fakefilter);
    } catch (error) {
      console.error("Error al obtener el héroe:", error);
      setHero(null);
    }
  };

  const getCharacterComics = async (id) => {
    try {
      // Opción A - Usar la API de Marvel
      const comics = await fetchCharacterComics(id);
      setCharacterComics(comics);

      // Opción B - Usar datos dummy sacados de la API de Marvel
      // setCharacterComics(fakecomics.data.results);
    } catch (error) {
      console.error("Error al obtener los cómics del héroe:", error);
      setCharacterComics([]);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    // Opción A - Usar la API de Marvel
    getAllHeroes();

    // Opción B - Usar datos dummy sacados de la API de Marvel
    // setCharacters(allHeroes);
  };

  const clearHeroData = () => {
    setHero(null);
  };

  const value = useMemo(
    () => ({
      state: {
        characters,
        hero,
        characterComics,
        charCount: characters.length,
        loading,
        searchTerm,
      },
      actions: {
        getAllHeroes,
        getHeroById,
        getHeroesByText,
        getCharacterComics,
        setCharacters,
        clearSearch,
        clearHeroData,
      },
    }),
    [characters, hero, characterComics]
  );

  return (
    <CharactersContext.Provider value={value}>
      {children}
    </CharactersContext.Provider>
  );
};

export const useCharactersContext = () => {
  const context = useContext(CharactersContext);
  if (!context) {
    throw new Error(
      "useCharactersContext must be used within a CharactersProvider"
    );
  }
  return context;
};
