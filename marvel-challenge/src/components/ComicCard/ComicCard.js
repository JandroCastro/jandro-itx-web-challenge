import styles from "./ComicCard.module.css";
import Image from "next/image";
const getYearFromComicData = (dates) => {
  const year = dates.find((date) => date.type === "onsaleDate").date;
  return new Date(year).getFullYear();
};

const ComicCard = ({ comic }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.image}
          width={200} // Ajusta este valor según el tamaño que quieras
          height={300} // Ajusta este valor según el tamaño que quieras
          src={comic.img}
          alt={comic.title}
        />
      </div>
      <div className={styles.details}>
        <p className={styles.title}>{comic.title}</p>
        <p className={styles.year}>{getYearFromComicData(comic.dates)}</p>
      </div>
    </div>
  );
};

export default ComicCard;
