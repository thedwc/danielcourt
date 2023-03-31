import Link from "next/link";
import styles from "../styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.header__logo}>
        Daniel Court - Senior Front End Developer
      </Link>
    </header>
  );
}
