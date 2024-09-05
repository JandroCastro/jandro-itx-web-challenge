"use client";
import { useParams } from "next/navigation";
import styles from "./CharacterDetail.module.css";
import React, { useEffect } from "react";
import Image from "next/image";
import ComicCarousel from "@/components/ComicCarousel/ComicCarousel";
import { useCharactersContext } from "@/context/CharactersCtx";

function CharacterDetail() {
  const { id } = useParams();
  const { actions, state } = useCharactersContext();
  const { getHeroById, getCharacterComics } = actions;
  const { hero, characterComics } = state;

  const isFavorite = false;

  useEffect(() => {
    getHeroById(id);
    getCharacterComics(id);
  }, []);

  if (!hero) {
    return <div>Cargando...</div>;
  }
  return (
    <div className={styles.detailsContainer}>
      <div className={`${styles.characterResume} ${styles.cornerCut}`}>
        <div className={styles.characterResumeContent}>
          <div className={styles.characterImage}>
            <Image
              priority
              width={500}
              height={500}
              src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
              alt={hero.name}
            />
          </div>
          <div className={styles.characterInfo}>
            <div className={styles.characterTitle}>
              <h1>{hero.name}</h1>
              {isFavorite ? (
                <Image
                  src="/HeartFilled.svg"
                  width={20}
                  height={20}
                  alt="Favorites Logo"
                  layout="intrinsic"
                />
              ) : (
                <Image
                  src="/HeartUnfilled.svg"
                  width={20}
                  height={20}
                  alt="No fav Logo"
                />
              )}
            </div>
            <p>{hero.description}</p>
          </div>
        </div>
      </div>
      <div className={styles.characterComics}>
        <div className={styles.characterComicsContent}>
          <div className={styles.characterComicsTitle}>
            <h3>Comics</h3>
          </div>
          <div className={styles.characterComicsCarousel}>
            <ComicCarousel comics={characterComics} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;
