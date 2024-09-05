"use client";
import React from "react";
import styles from "./CharacterList.module.css";
import CharacterCard from "../CharacterCard/CharacterCard";
import { useSearchParams } from "next/navigation";
import { useCharactersContext } from "@/context/CharactersCtx";
import { useFavoritesContext } from "@/context/FavoritesCtx";

const CharacterList = React.memo(() => {
  const { favorites, toggleFavorite } = useFavoritesContext();
  const { state } = useCharactersContext();
  const { characters } = state;

  const searchParams = useSearchParams();

  const view = searchParams.get("view");

  const filteredCharacters = view === "favorites" ? favorites : characters;

  if (!filteredCharacters.length) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className={styles.charactersGrid}>
        {filteredCharacters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            toggle={toggleFavorite}
          />
        ))}
      </div>
    </>
  );
});

export default CharacterList;
