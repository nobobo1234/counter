import classNames from "classnames";
import styles from "./stats.module.scss";
import StatItem from "./StatItem";
import validateRequest from "@/features/auth/actions/validate";
import { prisma } from "@/db";
import { personalStats } from "@/features/group/counts";

export default async function PersonalStats() {
  const { user } = await validateRequest();
  const group = await prisma.group.findUnique({
    where: {
      id: user?.group,
    },
  });

  // Check if user is connected to a person
  const person = await prisma.person.findFirst({
    where: {
      user: {
        id: user?.id,
      },
    },
  });

  if (!person) {
    return (
      <div className={classNames(styles.stats, styles["stats--personal"])}>
        <p>
          Je persoonlijke statistieken zijn nog niet beschikbaar. Vraag een
          beheerder om je te koppelen aan een jezelf om je statistieken te
          bekijken.
        </p>
      </div>
    );
  }

  const stats = await personalStats(person.id, person.groupId);

  return (
    <div className={classNames(styles.stats, styles["stats--personal"])}>
      <StatItem
        title="Je plaats"
        icon="social_leaderboard"
        text={`${stats.rank} plek`}
      />
      <StatItem
        title={`Totale ${group?.unit}`}
        icon="cycle"
        text={`${stats.total} ${group?.unit}`}
      />
      <StatItem
        title={`Afgelopen ${group?.unit}`}
        icon="trending_up"
        text={`+${stats.previous} ${group?.unit}`}
      />
    </div>
  );
}
