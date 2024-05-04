import classNames from "classnames";
import styles from "./stats.module.scss";
import StatItem from "./StatItem";
import { MaterialSymbol } from "react-material-symbols";

export default function PersonalStats() {
  return (
    <div className={classNames(styles.stats, styles["stats--personal"])}>
      <StatItem title="Je plaats" icon="social_leaderboard" text="1e plek" />
      <StatItem title="Totale punten" icon="cycle" text="64 punten" />
      <StatItem title="Afgelopen punten" icon="trending_up" text="+4 punten" />
    </div>
  );
}
