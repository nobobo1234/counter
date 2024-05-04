import classNames from "classnames";
import styles from "./stats.module.scss";
import StatItem from "./StatItem";

export default function GlobalStats() {
  return (
    <div className={classNames(styles.stats, styles["stats--personal"])}>
      <StatItem title="Totale punten" icon="groups" text="683 punten" />
      <StatItem
        title="Totale punten op 29/03/2003"
        icon="undo"
        text="20 punten"
      />
      <StatItem
        title="Top 3 op 29/03/2003"
        icon="emoji_events"
        text="Daan, Tessa en Jan"
      />
    </div>
  );
}
