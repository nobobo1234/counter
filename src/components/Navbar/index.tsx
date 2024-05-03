import Link from "next/link";
import { H2 } from "../Typography";
import styles from "./index.module.scss";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <h2 className={styles["nav__title"]}>Cntr</h2>
      <ul className={styles["nav__list"]}>
        <li className={styles["nav__list-item"]}>
          <Link className={styles["nav__list-link"]} href="/">
            Scorebord
          </Link>
        </li>
        <li className={styles["nav__list-item"]}>
          <Link className={styles["nav__list-link"]} href="/">
            Grafieken
          </Link>
        </li>
        <li className={styles["nav__list-item"]}>
          <Link className={styles["nav__list-link"]} href="/">
            Alle data
          </Link>
        </li>
      </ul>
    </nav>
  );
}
