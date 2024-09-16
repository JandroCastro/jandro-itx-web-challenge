"use client";
import React, {
  useState,
  useMemo,
  createContext,
  useContext,
  useEffect,
} from "react";
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

  useEffect(() => {
    getAllHeroes();
  }, []);

  const getAllHeroes = async () => {
    setLoading(true);
    try {
      const data = await fetchCharacters();
      setCharacters(data);
    } catch (error) {
      console.error("Error al obtener todos los héroes:", error);
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  const getHeroById = async (id) => {
    setLoading(true);
    try {
      const hero = await fetchCharacterById(id);
      setHero(hero);
    } catch (error) {
      console.error("Error al obtener el héroe:", error);
      setHero(null);
    } finally {
      setLoading(false);
    }
  };

  const getHeroesByText = async (searchText) => {
    setLoading(true);

    try {
      const heroes = await fetchSearchCharacterByName(searchText);
      setCharacters(heroes);
    } catch (error) {
      console.error("Error al obtener los héroes por texto:", error);
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  const getCharacterComics = async (id) => {
    setLoading(true);
    try {
      const comics = await fetchCharacterComics(id);
      setCharacterComics(comics);
    } catch (error) {
      console.error("Error al obtener los cómics del héroe:", error);
      setCharacterComics([]);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    getAllHeroes();
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
      },
      actions: {
        getAllHeroes,
        getHeroById,
        getHeroesByText,
        getCharacterComics,
        setCharacters,
        clearSearch,
        clearHeroData,
        setLoading,
      },
    }),
    [characters, hero, characterComics, loading]
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
