"use server";
import { prisma } from "@/db";
import validateRequest from "../auth/actions/validate";
import { redirect } from "next/navigation";

export default async function join(
  groupId: string,
  inviteCode: string,
  _: FormData
) {
  const user = await validateRequest();
  if (!user) {
    return redirect("/auth/sign-in");
  }

  const group = await prisma.group.findUnique({
    where: {
      id: groupId,
      inviteCode: inviteCode,
    },
  });

  const updatedUser = await prisma.user.update({
    where: {
      id: user.user?.id,
    },
    data: {
      group: {
        connect: {
          id: group?.id,
        },
      },
    },
  });

  redirect("/group");
}
