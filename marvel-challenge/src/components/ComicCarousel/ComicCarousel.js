import React from "react";
import Image from "next/image";
import styles from "./ComicCarousel.module.css";

const ComicCarousel = ({ comics }) => {
  const getYearFromComicData = (dates) => {
    const year = dates.find((date) => date.type === "onsaleDate").date;
    return new Date(year).getFullYear();
  };
  return (
    <div className={styles.comics}>
      {comics.map((comic, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.imageContainer}>
            <Image
              className={styles.image}
              fill
              src={comic.img}
              alt={comic.title}
            />
          </div>
          <div className={styles.details}>
            <p className={styles.title}>{comic.title}</p>
            <p className={styles.year}>{getYearFromComicData(comic.dates)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComicCarousel;
