"use client";
import styles from "./page.module.scss";

export default function Confirm({ onConfirm }: { onConfirm: () => void }) {
  return (
    <form action={onConfirm}>
      <button className={styles["container__button"]} onClick={onConfirm}>
        Toetreden
      </button>
    </form>
  );
}
