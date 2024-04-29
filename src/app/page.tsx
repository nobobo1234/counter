import { H1 } from "@/components/Typography";
import { prisma } from "@/db";
import GroupList from "@/components/GroupList";
import styles from "./page.module.scss";
import validateRequest from "@/auth/actions/validate";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/auth/sign-in");
  }

  const groups = await prisma.group.findMany();

  return (
    <main className={styles.container}>
      <H1>Groups</H1>
      <GroupList groups={groups} />
    </main>
  );
}
