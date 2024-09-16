"use client";
import React, { useEffect, useState } from "react";
import styles from "./CharacterList.module.css";
import CharacterCard from "../CharacterCard/CharacterCard";
import { useSearchParams } from "next/navigation";
import { useCharactersContext } from "@/context/CharactersCtx";
import { useFavoritesContext } from "@/context/FavoritesCtx";
import SkeletonGrid from "../SkeletonGrid/SkeletonGrid";

const CharacterList = React.memo(() => {
  const { favorites, toggleFavorite } = useFavoritesContext();
  const { state } = useCharactersContext();
  const { characters, loading } = state;

  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  const [filteredCharacters, setFilteredCharacters] = useState([]);

  useEffect(() => {
    setFilteredCharacters(view === "favorites" ? favorites : characters);
  }, [characters, favorites, view]);

  if (loading) {
    return <SkeletonGrid />;
  }

  return (
    <>
      {
        <p className={styles.results}>
          {filteredCharacters.length || "0"} RESULTS
        </p>
      }
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
