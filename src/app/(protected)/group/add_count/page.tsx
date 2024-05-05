import { prisma } from "@/db";
import styles from "./page.module.scss";
import { H1, H3, H5 } from "@/components/Typography";
import validateRequest from "@/features/auth/actions/validate";
import { redirect } from "next/navigation";
import AddCount from "@/components/AddCount";

export default async function Page() {
  const { user } = await validateRequest();
  if (!user || user.userType !== "admin" || user.group === null) {
    return redirect("/group");
  }

  const group = await prisma.group.findUnique({
    where: {
      id: user.group,
    },
  });

  const persons = await prisma.person.findMany({
    where: {
      groupId: user.group,
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles["container__title"]}>
        <H1>
          <b>Telling toevoegen</b>
        </H1>
        <H3>
          voor <b>{group?.name}</b>
        </H3>
      </div>
      <AddCount groupUnit={group?.unit || "punten"} persons={persons} />
    </div>
  );
}
