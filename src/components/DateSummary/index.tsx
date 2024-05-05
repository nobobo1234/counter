import Leaderboard from "@/components/Leaderboard/Leaderboard";
import styles from "./index.module.scss";
import { H3 } from "@/components/Typography";
import { prisma } from "@/db";
import validateRequest from "@/features/auth/actions/validate";

export default async function DateSummary({
  total,
  counts,
  date,
}: {
  total: number;
  counts: {
    person: { id: string; name: string } | undefined;
    sum: number | null;
  }[];
  date: Date;
}) {
  const { user } = await validateRequest();
  const group = await prisma.group.findUnique({
    where: {
      id: user?.group,
    },
  });
  const unit = group?.unit || "punten";
  const capitalizedUnit = unit.charAt(0).toUpperCase() + unit.slice(1);

  // Convert the date to a string in the form of DD-MM-YYYY
  const formattedDate = date
    .toISOString()
    .split("T")[0]
    .split("-")
    .reverse()
    .join("-");
  return (
    <div className={styles["datesummary"]}>
      <H3>
        {capitalizedUnit} op {formattedDate}
      </H3>
      <p className={styles["datesummary__total"]}>
        Totaal: {total} {unit}
      </p>
      <Leaderboard unit={unit} deleteTop3={false} ranking={counts} />
    </div>
  );
}
