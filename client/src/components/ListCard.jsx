import styles from "./Card.module.css";

export default function Card(props) {
  return (
    <div className={styles["list-card__wrapper"]}>
      <img
        className={styles.card__image}
        src={`${props.cover}`}
        alt={`Book cover of ${props.title} by ${props.author}`}
      />
      <div className={styles.card__text_wrapper}>
        <h2 className={styles.card__title}>{props.title}</h2>

        {props.subtitle && (
          <p className={styles.card__subtitle}>{props.subtitle}</p>
        )}

        <h5 className={styles.card__author}>{props.author}</h5>
        <p className={styles.card__date}>
          Published Date: {props.publishedDate}
        </p>
        <p className={styles.card__pages}>
          Number of pages: {props.numberOfPages}
        </p>
        <p className={styles.card__isbn}>ISBN: {props.isbnNumber}</p>
      </div>
    </div>
  );
}
