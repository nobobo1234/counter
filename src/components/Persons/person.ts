"use server";

import { prisma } from "@/db";
import { Person } from "@prisma/client";

async function updatePerson(prevState: Person[], formData: FormData) {
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

  return prevState.map((p) => (p.id === person.id ? person : p));
}

export default updatePerson;
