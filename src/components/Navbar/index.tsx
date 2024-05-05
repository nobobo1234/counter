import Link from "next/link";
import styles from "./index.module.scss";
import validateRequest from "@/features/auth/actions/validate";

export default async function Navbar() {
  const { user } = await validateRequest();
  const links = [
    {
      href: "/group",
      text: "Scorebord",
    },
    {
      href: "/group/all",
      text: "Alle data",
    },
  ];
  if (user && user.userType === "admin") {
    links.push({
      href: "/group/manage",
      text: "Groep beheren",
    });

    links.push({
      href: "/group/add_count",
      text: "Toevoegen",
    });
  }

  return (
    <nav className={styles.nav}>
      <h2 className={styles["nav__title"]}>Cntr</h2>
      <ul className={styles["nav__list"]}>
        {links.map((link) => (
          <li key={link.href} className={styles["nav__list-item"]}>
            <Link className={styles["nav__list-link"]} href={link.href}>
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
