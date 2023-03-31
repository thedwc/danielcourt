import styles from "../styles/Work.module.css";

import WorkCard from "../components/WorkCard";

export default function Work({ work }) {
  return (
    <section className={styles.grid}>
      {work.map((item) => (
        <WorkCard key={item.sys.id} work={item} />
      ))}
    </section>
  );
}
