import { prisma } from "@/db";
import styles from "./page.module.scss";
import { H1, H3, H5 } from "@/components/Typography";
import validateRequest from "@/features/auth/actions/validate";
import { redirect } from "next/navigation";
import Persons from "@/components/Persons";
import Link from "next/link";
import Input from "@/components/Input";
import { headers } from "next/headers";
import ChangeUnit from "@/components/ChangeUnit";

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

  // get the current url to display the invite link
  const headersList = headers();
  const domain = headersList.get("x-forwarded-host") || headersList.get("host");

  const link = `https://${domain}${process.env.BASE_PATH || ""}/group/join/${
    group?.inviteCode
  }`;

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
      <div className={styles["container__unit"]}>
        <H3>Eenheid van punten</H3>
        <ChangeUnit groupId={group?.id || ""} initialUnit={group?.unit || ""} />
      </div>
      <div className={styles["inviteLink"]}>
        <H3>Uitnodigingslink</H3>
        <Link href={link}>{link}</Link>
      </div>
      <Persons
        initialPersons={persons}
        users={users}
        currentGroup={group?.id || ""}
      />
    </div>
  );
}
