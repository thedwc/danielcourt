import Link from "next/link";
import styles from "../styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.mainHeader}>
      <Link href="/" className={styles.logo}>
        Daniel Court - Senior Front End Developer
      </Link>
    </header>
  );
}
