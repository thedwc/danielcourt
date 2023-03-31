import Link from "next/link";
import Image from "next/image";
import styles from "../styles/WorkCard.module.css";

export default function WorkCard({ work }) {
  const { title, slug, thumbnail } = work.fields;

  return (
    <Link className={styles.card} href={`/work/${slug}`}>
      <Image
        className={styles.card__image}
        src={`https:${thumbnail.fields.file.url}`}
        width={thumbnail.fields.file.details.image.width}
        height={thumbnail.fields.file.details.image.height}
        alt={`Screenshot of ${title} website`}
      />
      <div className={styles.card__overlay}>{title}</div>
    </Link>
  );
}
