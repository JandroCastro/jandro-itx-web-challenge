// ComicCarousel.jsx

import styles from "./ComicCarousel.module.css";
import ComicCard from "../ComicCard/ComicCard";

const ComicCarousel = ({ comics }) => {
  return (
    <div className={styles.comics}>
      {comics.map((comic, index) => (
        <ComicCard key={index} comic={comic} />
      ))}
    </div>
  );
};

export default ComicCarousel;
