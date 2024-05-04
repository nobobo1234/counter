import styles from "./Leaderboard.module.scss";
import useLeaderboard from "@/hooks/useLeaderboard";
import classNames from "classnames";

const Top3 = ({ unit }: { unit: string }) => {
  const { top3 } = useLeaderboard();

  return (
    <div className={styles.top3}>
      <div className={styles["top3__item"]}>
        <p>{top3[1].name}</p>
        <div
          className={classNames(
            styles["top3__podium"],
            styles["top3__podium--2"]
          )}
        >
          <span className={styles["top3__podium-text"]}>
            2<sup>ste</sup>
          </span>
          <p>
            {top3[1].sum} {unit}
          </p>
        </div>
      </div>
      <div className={classNames(styles["top3__item"])}>
        <p>{top3[0].name}</p>
        <div
          className={classNames(
            styles["top3__podium"],
            styles["top3__podium--1"]
          )}
        >
          <span className={styles["top3__podium-text"]}>
            1<sup>ste</sup>
          </span>
          <p>
            {top3[0].sum} {unit}
          </p>
        </div>
      </div>
      <div className={classNames(styles["top3__item"])}>
        <p>{top3[2].name}</p>
        <div
          className={classNames(
            styles["top3__podium"],
            styles["top3__podium--3"]
          )}
        >
          <span className={styles["top3__podium-text"]}>
            3<sup>de</sup>
          </span>
          <p>
            {top3[2].sum} {unit}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Top3;
