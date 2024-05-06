import { prisma } from "@/db";
import validateRequest from "@/features/auth/actions/validate";
import styles from "./page.module.scss";
import { H1, H3 } from "@/components/Typography";
import DateSummary from "@/components/DateSummary";
import { getByDate } from "@/features/group/counts";
import Link from "next/link";

export default async function Page() {
  const { user } = await validateRequest();
  if (!user?.group) {
    return (
      <div className={styles.container}>
        <div className={styles["container__title"]}>
          <H1>
            <b>Alle data</b>
          </H1>
        </div>
        <p className={styles["container__error"]}>
          Je bent nog niet onderdeel van een groep, vraag de beheerder voor een
          toegangscode of{" "}
          <Link href="/group/new">maak zelf een groep aan.</Link>
        </p>
      </div>
    );
  }

  const group = await prisma.group.findUnique({
    where: {
      id: user?.group,
    },
  });

  const totalByDate = await prisma.count.groupBy({
    by: ["countDate"],
    _sum: {
      count: true,
    },
    where: {
      person: {
        groupId: user?.group,
      },
    },
    orderBy: {
      countDate: "desc",
    },
  });

  return (
    <div className={styles["container"]}>
      <div className={styles["container__title"]}>
        <H1>
          <b>Alle data</b>
        </H1>
        <H3>
          voor <b>{group?.name}</b>
        </H3>
      </div>
      <div className={styles["container__date-summary"]}>
        {totalByDate.map(async (date) => {
          const counts = await getByDate(date.countDate);
          return (
            <DateSummary
              key={date.countDate.toDateString()}
              date={date.countDate}
              total={date._sum.count || 0}
              counts={counts}
            />
          );
        })}
      </div>
    </div>
  );
}
