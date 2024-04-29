import { HTMLProps } from "react";
import styles from "./index.module.scss";

export default function Input(props: HTMLProps<HTMLInputElement>) {
  return (
    <div className={styles["input__container"]}>
      <label htmlFor={props.name}>{props.placeholder}</label>
      <input {...props} />
    </div>
  );
}
