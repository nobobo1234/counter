import { prisma } from "@/db";
import styles from "./page.module.scss";
import { H1, H3 } from "@/components/Typography";
import LineChart from "./chart";
import Top3 from "@/components/Leaderboard/Top3";
import Leaderboard from "@/components/Leaderboard/Leaderboard";
import validateRequest from "@/auth/actions/validate";
import { redirect } from "next/navigation";

import numbers from "@/numbers";

export default async function Page() {
  const { user } = await validateRequest();
  if (!user?.group) {
    return (
      <div className={styles.container}>
        <div className={styles["container__title"]}>
          <H1>
            <b>Scorebord</b>
          </H1>
        </div>
        <p className={styles["container__error"]}>
          Je bent nog niet onderdeel van een groep, vraag de beheerder voor een
          toegangscode.
        </p>
      </div>
    );
  }

  const group = await prisma.group.findUnique({
    where: {
      id: user.group,
    },
  });

  // generate the total number of points per date
  const total = numbers.persons.reduce((acc, person) => {
    person.counts.forEach((count, index) => {
      acc[index] = acc[index] || 0;
      acc[index] += count;
    });
    return acc;
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles["container__title"]}>
        <H1>
          <b>Scorebord</b>
        </H1>
        <H3>
          voor <b>{group?.name}</b>
        </H3>
      </div>
      <Top3 />
      <Leaderboard />
    </div>
  );
}
