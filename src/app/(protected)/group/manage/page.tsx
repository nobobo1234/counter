import { prisma } from "@/db";
import styles from "./page.module.scss";
import { H1, H3, H5 } from "@/components/Typography";
import validateRequest from "@/auth/actions/validate";
import { redirect } from "next/navigation";
import Persons from "@/components/Persons";
import Link from "next/link";

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

  // Only return the email and id of the users in the group
  const users = await prisma.user.findMany({
    where: {
      groupId: user.group,
    },
    select: {
      id: true,
      email: true,
    },
  });

  const persons = await prisma.person.findMany({
    where: {
      groupId: user.group,
    },
  });

  async function updatePerson(formData: FormData) {
    "use server";

    const personId = formData.get("id") as string;
    const newName = formData.get("name") as string;
    const userId = formData.get("user") as string;

    const person = await prisma.person.update({
      where: {
        id: personId,
      },
      data: {
        name: newName,
        userId: userId === "0" ? undefined : userId,
      },
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles["container__title"]}>
        <H1>
          <b>Beheerpagina</b>
        </H1>
        <H3>
          voor <b>{group?.name}</b>
        </H3>
      </div>
      <div className={styles["inviteLink"]}>
        <H3>Uitnodigingslink</H3>
        <Link
          href={`/group/join/${group?.inviteCode}`}
        >{`/group/join/${group?.inviteCode}`}</Link>
      </div>
      <Persons initialPersons={persons} users={users} />
    </div>
  );
}
