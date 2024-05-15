import { prisma } from "@/db";
import validateRequest from "@/features/auth/actions/validate";
import styles from "./page.module.scss";
import { H1, H3 } from "@/components/Typography";
import Link from "next/link";
import LineChart from "../chart";

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
      countDate: "asc",
    },
  });

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  const labels = totalByDate.map((date) => formatDate(date.countDate));

  let extraChart = null;

  const person = await prisma.person.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (person) {
    const getCountByDateForPerson = await prisma.count.findMany({
      where: {
        personId: person.id,
      },
      select: {
        countDate: true,
        count: true,
      },
      orderBy: {
        countDate: "asc",
      },
    });

    const labelsPerson = getCountByDateForPerson.map((date) =>
      formatDate(date.countDate)
    );

    extraChart = (
      <LineChart
        data={{
          labels: labelsPerson,
          datasets: [
            {
              label: `Totaal aantal ${group?.unit || "punten"} per datum`,
              data: getCountByDateForPerson.map((date) => date.count),
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        }}
      />
    );
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["container__title"]}>
        <H1>
          <b>Grafieken</b>
        </H1>
        <H3>
          voor <b>{group?.name}</b>
        </H3>
      </div>
      {person && (
        <>
          <H3>Totaal aantal {group?.unit || "punten"} per datum voor jou</H3>
          {extraChart}
        </>
      )}
      <H3>Totaal aantal {group?.unit || "punten"} per datum</H3>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              label: `Totaal aantal ${group?.unit || "punten"} per datum`,
              data: totalByDate.map((date) => date._sum.count),
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        }}
      />
    </div>
  );
}
