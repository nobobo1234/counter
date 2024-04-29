import styles from "./Leaderboard.module.scss";
import useLeaderboard from "@/hooks/useLeaderboard";
import classNames from "classnames";

const Top3 = () => {
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
          <p>{top3[1].sum} punten</p>
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
          <p>{top3[0].sum} punten</p>
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
          <p>{top3[2].sum} punten</p>
        </div>
      </div>
    </div>
  );
};

export default Top3;
