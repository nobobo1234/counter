import { prisma } from "@/db";
import validateRequest from "@/features/auth/actions/validate";
import { redirect } from "next/navigation";
import { User } from "lucia";
import styles from "./page.module.scss";
import Input from "@/components/Input";
import { H1 } from "@/components/Typography";

export default async function Page() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/auth/sign-in");
  }

  if (user.group) {
    return redirect("/group");
  }

  async function createGroup(user: User, formData: FormData) {
    "use server";
    const group = await prisma.group.create({
      data: {
        name: formData.get("groupName") as string,
      },
    });

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        user_type: "admin",
        group: {
          connect: {
            id: group.id,
          },
        },
      },
    });

    await prisma.person.create({
      data: {
        name: "Test",
        user: {
          connect: {
            id: user.id,
          },
        },
        group: {
          connect: {
            id: group.id,
          },
        },
      },
    });

    return redirect(`/group`);
  }

  return (
    <div className={styles.container}>
      <div className={styles["container__title"]}>
        <H1>
          <b>Nieuwe groep</b>
        </H1>
      </div>
      <form
        action={createGroup.bind(null, user)}
        className={styles["container__form"]}
      >
        <Input name="groupName" placeholder="Group Name" />
        <div>
          <button type="submit" className={styles["container__form__button"]}>
            Create Group
          </button>
        </div>
      </form>
    </div>
  );
}
