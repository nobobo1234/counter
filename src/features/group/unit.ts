import { prisma } from "@/db";

export default function updateUnit(formData: FormData) {
  "use server";
  prisma.group.update({
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
