import classNames from "classnames";
import styles from "./stats.module.scss";
import { MaterialSymbol, MaterialSymbolProps } from "react-material-symbols";

export default function StatItem({
  title,
  icon,
  text,
}: {
  title: string;
  icon: MaterialSymbolProps["icon"];
  text: string;
}) {
  return (
    <div className={classNames(styles["stats__item"])}>
      <span className={styles["stats__item-title"]}>{title}:</span>
      <div className={styles["stats__item-content"]}>
        <MaterialSymbol icon={icon} className={styles["stats__item-icon"]} />
        <span className={styles["stats__item-text"]}>{text}</span>
      </div>
    </div>
  );
}
