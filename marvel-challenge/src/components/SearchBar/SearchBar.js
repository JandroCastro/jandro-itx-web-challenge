"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./SearchBar.module.css";
import Image from "next/image";
import { useCharactersContext } from "@/context/CharactersCtx";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const debounceTimeout = useRef(null);
  const { actions, state } = useCharactersContext();
  const { charCount } = state;
  const { getHeroesByText, getAllHeroes } = actions;

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (value.trim() === "") {
      getAllHeroes();
      return;
    }

    debounceTimeout.current = setTimeout(() => {
      getHeroesByText(value);
    }, 500);
  };

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
          value={searchTerm}
          placeholder="Search a character"
          onChange={handleSearch}
        />
      </div>
      <p className={styles.results}>{charCount} RESULTS</p>
    </div>
  );
}

export default SearchBar;
