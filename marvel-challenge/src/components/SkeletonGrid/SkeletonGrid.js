import React from "react";
import styles from "./SkeletonGrid.module.css";

const SkeletonGrid = () => {
  const skeletons = Array.from({ length: 50 });

  return (
    <div className={styles.grid} data-testid="skeleton-grid">
      {skeletons.map((_, index) => (
        <div className={styles.card} key={index}>
          <div className={styles.image}></div>
          <div className={styles.textLine}></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonGrid;
