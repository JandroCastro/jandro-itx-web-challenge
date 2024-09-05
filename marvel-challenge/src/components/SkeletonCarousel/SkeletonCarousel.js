import React from "react";
import styles from "./SkeletonCarousel.module.css";

const SkeletonCarousel = () => {
  // Genera un array de 7 elementos para las tarjetas
  const skeletonCards = Array.from({ length: 7 }, (_, index) => index);

  return (
    <div className={styles.carouselContainer}>
      {skeletonCards.map((_, index) => (
        <div key={index} className={styles.skeletonCard}></div>
      ))}
    </div>
  );
};

export default SkeletonCarousel;
