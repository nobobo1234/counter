import { H1 } from "@/components/Typography";
import { prisma } from "@/db";
import GroupList from "@/components/GroupList";
import styles from "./page.module.scss";

export default async function Home() {
  const groups = await prisma.group.findMany();

  return (
    <main className={styles.container}>
      <H1>Groups</H1>
      <GroupList groups={groups} />
    </main>
  );
}
