"use server";
import { prisma } from "@/db";

export default async function updateUnit(formData: FormData) {
  await prisma.group.update({
    where: {
      id: formData.get("groupId") as string,
    },
    data: {
      unit: formData.get("unit") as string,
    },
  });

  return {
    message: "Unit updated",
  };
}
