"use client";
import Link from "next/link";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import NavButton from "./NavButton";
import classNames from "classnames";

export default function Navbar({ isAdmin }: { isAdmin: boolean }) {
  const [open, setOpen] = useState(false);
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
  if (isAdmin) {
    links.push({
      href: "/group/manage",
      text: "Groep beheren",
    });

    links.push({
      href: "/group/add_count",
      text: "Toevoegen",
    });
  }

  const navClass = classNames(styles.nav, {
    [styles["nav--open"]]: open,
  });

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <div>
      <NavButton open={open} onClick={() => setOpen(!open)} />
      <nav className={navClass}>
        <h2 className={styles["nav__title"]}>Cntr</h2>
        <ul className={styles["nav__list"]}>
          {links.map((link) => (
            <li key={link.href} className={styles["nav__list-item"]}>
              <Link
                className={styles["nav__list-link"]}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
