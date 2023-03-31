import styles from "../styles/WorkDetailItem.module.css";

export default function WorkDetailItem({ title, value, hasLink }) {
  return (
    <div className={styles.item}>
      <div className={styles.item__title}>{title}</div>
      <div className={styles.item__value}>
        {hasLink ? (
          <a href={`http://${value}`} target="_blank">
            {value}
          </a>
        ) : (
          value
        )}
      </div>
    </div>
  );
}
