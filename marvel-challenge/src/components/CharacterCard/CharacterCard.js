import React, { memo } from "react";
import styles from "./CharacterCard.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  useFavoritesContext,
  useFavoritesSelector,
} from "@/context/FavoritesCtx";

const CharacterCard = memo(function CharacterCard({ character }) {
  const { toggleFavorite } = useFavoritesContext();
  const isFavorite = useFavoritesSelector((favorites) =>
    favorites.some((fav) => fav.id === character.id)
  );

  const router = useRouter();

  const onClickFavorito = (e) => {
    toggleFavorite(character);
    e.stopPropagation();
  };

  const handleClick = () => {
    router.push(`/character/${character.id}`);
  };

  return (
    <div className={styles.charCard} onClick={handleClick}>
      <div className={styles.charCardImg}>
        <Image
          priority
          src={character.img}
          alt={character.name}
          fill
          sizes="33vw"
        />
      </div>
      <div className={styles.charCardInfo}>
        <p>{character.name}</p>
        <div className={styles.fav} onClick={onClickFavorito}>
          {isFavorite ? (
            <Image
              src="/HeartFilled.svg"
              width={50}
              height={50}
              alt="Favorites Logo"
            />
          ) : (
            <Image
              src="/HeartUnfilled.svg"
              width={50}
              height={50}
              alt="No fav Logo"
            />
          )}
        </div>
        <div className={styles.cornerCut} />
      </div>
    </div>
  );
});

export default CharacterCard;
