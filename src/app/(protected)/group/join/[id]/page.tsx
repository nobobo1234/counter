import validateRequest from "@/features/auth/actions/validate";
import { prisma } from "@/db";
import { redirect } from "next/navigation";
import styles from "./page.module.scss";
import { H1 } from "@/components/Typography";
import join from "@/features/group/join";
import Confirm from "./Confirm";

export default async function Page({ params }: { params: { id: string } }) {
  const { user } = await validateRequest();
  const requestedGroup = await prisma.group.findFirst({
    where: {
      inviteCode: params.id,
    },
  });

  if (!requestedGroup || user?.group) {
    return redirect("/group");
  }

  return (
    <div className={styles["container"]}>
      <H1>Groep toetreden</H1>
      <p className={styles["container__text"]}>
        Je bent uitgenodigd voor de groep <i>{requestedGroup.name}</i>, weet je
        zeker dat je toe wilt treden? Klikt dan op onderstaande knop.
      </p>
      <div>
        <Confirm inviteCode={params.id} groupId={requestedGroup.id} />
      </div>
    </div>
  );
}
