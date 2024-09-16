"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";
import { useFavoritesContext } from "@/context/FavoritesCtx";
import { useCharactersContext } from "@/context/CharactersCtx";

function Header() {
  const { favorites } = useFavoritesContext();
  const { actions } = useCharactersContext();
  const { clearSearch } = actions;

  const favCount = favorites.length;

  const handleClick = () => {
    clearSearch();
  };

  return (
    <div className={styles.header}>
      <div>
        <Link href="/" onClick={handleClick}>
          <Image
            priority
            src="/MarvelLogo.svg"
            alt="Marvel Logo"
            width={100}
            height={50}
          />
        </Link>
      </div>
      {favCount !== null ? (
        <Link
          href={{
            pathname: "/",
            query: { view: "favorites" },
          }}
        >
          <div className={styles.fav}>
            <Image
              src="/HeartFilled.svg"
              alt="Fav Icon"
              width={24}
              height={24}
            />
            <span>{favCount}</span>
          </div>
        </Link>
      ) : null}
    </div>
  );
}

export default Header;
