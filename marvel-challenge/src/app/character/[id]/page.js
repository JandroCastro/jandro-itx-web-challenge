"use client";
import { useParams } from "next/navigation";
import styles from "./CharacterDetail.module.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ComicCarousel from "@/components/ComicCarousel/ComicCarousel";
import { useCharactersContext } from "@/context/CharactersCtx";
import SkeletonCarousel from "@/components/SkeletonCarousel/SkeletonCarousel";
import { useFavoritesContext } from "@/context/FavoritesCtx";

function CharacterDetail() {
  const { id } = useParams();
  const { actions, state } = useCharactersContext();
  const { getHeroById, getCharacterComics, clearHeroData } = actions;
  const { hero, characterComics } = state;
  const { favorites, toggleFavorite } = useFavoritesContext();

  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingHero, setLoadingHero] = useState(true);
  const [loadingComics, setLoadingComics] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getHeroById(id);
      } catch (error) {
        console.error("Error fetching hero:", error);
      } finally {
        setLoadingHero(false);
      }

      try {
        await getCharacterComics(id);
      } catch (error) {
        console.error("Error fetching comics:", error);
      } finally {
        setLoadingComics(false);
      }
    };

    fetchData();

    return () => {
      clearHeroData();
    };
  }, [id]);

  useEffect(() => {
    const favStatus = favorites.some((fav) => fav.id === Number(id));
    setIsFavorite(favStatus);
  }, [favorites, id]);

  const handleClick = () => {
    setIsFavorite((prev) => !prev);
    toggleFavorite(hero);
  };

  if (loadingHero) {
    return <div className={styles.loading}>Cargando héroe...</div>;
  }

  return (
    <div className={styles.detailsContainer}>
      <div className={`${styles.characterResume} ${styles.cornerCut}`}>
        <div className={styles.characterResumeContent}>
          <div className={styles.characterImage}>
            <Image priority fill={true} src={hero.img} alt={hero.name} />
          </div>
          <div className={styles.characterInfo}>
            <div className={styles.characterTitle}>
              <h1>{hero.name}</h1>
              {isFavorite ? (
                <Image
                  onClick={handleClick}
                  src="/HeartFilled.svg"
                  width={20}
                  height={20}
                  alt="Favorites Logo"
                />
              ) : (
                <Image
                  onClick={handleClick}
                  src="/HeartUnfilled.svg"
                  width={20}
                  height={20}
                  alt="No fav Logo"
                />
              )}
            </div>
            <p className={styles.heroDescription}>{hero.description}</p>
          </div>
        </div>
      </div>
      <div className={styles.characterComics}>
        <div className={styles.characterComicsContent}>
          <div className={styles.characterComicsTitle}>
            <h3>Comics</h3>
          </div>
          <div className={styles.characterComicsCarousel}>
            {loadingComics ? (
              <SkeletonCarousel />
            ) : (
              <ComicCarousel comics={characterComics} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;
