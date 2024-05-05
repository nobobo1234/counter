import styles from "./index.module.scss";
import { MaterialSymbol } from "react-material-symbols";
import classNames from "classnames";

export default function NavButton({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  const className = classNames(styles["nav-button__button"], {
    [styles["nav-button__button--open"]]: open,
  });
  return (
    <div className={styles["nav-button"]}>
      <button className={className} onClick={onClick}>
        <MaterialSymbol
          icon={open ? "close" : "menu"}
          color={!open ? "#0A122A" : "#ffffff"}
        />
      </button>
    </div>
  );
}
