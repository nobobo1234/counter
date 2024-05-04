import { prisma } from "@/db";
import validateRequest from "@/auth/actions/validate";
import { redirect } from "next/navigation";
import { User } from "lucia";
import styles from "./page.module.scss";
import Input from "@/components/Input";

export default async function Page() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/auth/sign-in");
  }

  if (user.group) {
    return redirect("/group");
  }

  async function createGroup(formData: FormData, user: User) {
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
    <div className={styles["new-group"]}>
      <h1 className={styles["new-group__title"]}>New Group</h1>
      <form
        action={async (formData) => {
          "use server";
          createGroup(formData, user);
        }}
        className={styles["new-group__form"]}
      >
        <Input name="groupName" placeholder="Group Name" />
        <div>
          <button
            type="submit"
            className="inline-block w-full px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Group
          </button>
        </div>
      </form>
    </div>
  );
}
