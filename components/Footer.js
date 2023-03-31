import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.mainFooter}>
      <h2 className={styles.mainFooter__title}>Contact</h2>
      <p>
        Please contact me via email{" "}
        <a href="mailto:dwcourt@gmail.com">dwcourt@gmail.com</a> or{" "}
        <a
          href="https://uk.linkedin.com/in/daniel-court-5a54082b"
          target="_blank"
        >
          LinkedIn
        </a>
      </p>
    </footer>
  );
}
