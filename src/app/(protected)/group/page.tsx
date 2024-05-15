import { prisma } from "@/db";
import styles from "./page.module.scss";
import { H1, H3 } from "@/components/Typography";
import Top3 from "@/components/Leaderboard/Top3";
import Leaderboard from "@/components/Leaderboard/Leaderboard";
import validateRequest from "@/features/auth/actions/validate";
import Link from "next/link";
import { getRanking } from "@/features/group/counts";

import PersonalStats from "@/components/Stats/Personal";
import GlobalStats from "@/components/Stats/Global";

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
          toegangscode of{" "}
          <Link href="/group/new">maak zelf een groep aan.</Link>
        </p>
      </div>
    );
  }

  const group = await prisma.group.findUnique({
    where: {
      id: user.group,
    },
  });

  const ranking = await getRanking();
  const top3 = ranking.slice(0, 3);

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
      {ranking.length === 0 ? (
        <p className={styles["container__error"]}>
          Er zijn nog geen scores ingevoerd.
        </p>
      ) : (
        <>
          <Top3 unit={group?.unit || "punten"} top3={top3} />
          <Leaderboard
            unit={group?.unit || "punten"}
            deleteTop3={true}
            ranking={ranking}
          />
          <PersonalStats />
          <div>
            <GlobalStats />
          </div>
        </>
      )}
    </div>
  );
}
