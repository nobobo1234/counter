import classNames from "classnames";
import styles from "./stats.module.scss";
import StatItem from "./StatItem";
import {
  getTotalCount,
  getPreviousDate,
  getTotalLastDate,
  getTop3PreviousDate,
} from "@/features/group/counts";
import validateRequest from "@/features/auth/actions/validate";
import { prisma } from "@/db";

export default async function GlobalStats() {
  const { user } = await validateRequest();
  const group = await prisma.group.findUnique({
    where: {
      id: user?.group,
    },
  });

  const unit = group?.unit || "punten";

  // Return the previous date in the form of DD-MM-YYYY
  const previousDate = await getPreviousDate();
  const formattedDate = previousDate
    ?.toISOString()
    .split("T")[0]
    .split("-")
    .reverse()
    .join("-");

  return (
    <div className={classNames(styles.stats, styles["stats--personal"])}>
      <StatItem
        title={`Totaal aantal ${unit}`}
        icon="groups"
        text={`${await getTotalCount()} ${unit}`}
      />
      <StatItem
        title={`Totale ${unit} op ${formattedDate}`}
        icon="undo"
        text={`${await getTotalLastDate()} ${unit}`}
      />
      <StatItem
        title={`Top 3 op ${formattedDate}`}
        icon="emoji_events"
        text={`${(await getTop3PreviousDate()).join(", ")}`}
      />
    </div>
  );
}
