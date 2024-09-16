"use client";
//marvel-challenge/src/components/SearchBar/SearchBar.js
import React, { useRef } from "react";
import styles from "./SearchBar.module.css";
import Image from "next/image";
import { useCharactersContext } from "@/context/CharactersCtx";
import { useRouter } from "next/navigation";

function SearchBar() {
  const debounceTimeout = useRef(null);
  const { actions } = useCharactersContext();
  const { getHeroesByText, getAllHeroes, setLoading } = actions;
  const router = useRouter();

  function handleSearch(e) {
    const value = e.target.value;
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    setLoading(true);

    debounceTimeout.current = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (params.has("view")) {
        params.delete("view");
        let newUrl = `${window.location.pathname}?${params.toString()}`;

        if (!params.toString()) {
          newUrl = window.location.pathname;
        }

        router.replace(newUrl);
      }

      if (value.trim() === "") {
        getAllHeroes();
      } else {
        getHeroesByText(value);
      }
    }, 500);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBarWrapper}>
        <div className={styles.icon}>
          <Image
            src="/SearchIcon.svg"
            alt="Search Icon"
            width={20}
            height={20}
          />
        </div>
        <input
          className={styles.searchBar}
          type="text"
          placeholder="Search a character..."
          onChange={handleSearch}
        />
      </div>
    </div>
  );
}

export default SearchBar;
