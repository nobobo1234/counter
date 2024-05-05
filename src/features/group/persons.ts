"use server";

import { prisma } from "@/db";
import { Person } from "@prisma/client";

export type UpdatePersonState = {
  persons: Person[];
  message: string;
};

export async function updatePerson(
  prevState: UpdatePersonState,
  formData: FormData
) {
  if (formData.get("action") === "delete") {
    const personId = formData.get("id") as string;
    await prisma.person.delete({
      where: {
        id: personId,
      },
    });

    return {
      ...prevState,
      message: "Persoon is verwijderd",
      persons: prevState?.persons.filter((p) => p.id !== personId),
    };
  } else if (formData.get("action") === "update") {
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

    return {
      ...prevState,
      message: `${person.name} is geüpdatet`,
      persons: prevState?.persons.map((p) => (p.id === personId ? person : p)),
    };
  } else if (formData.get("action") === "add") {
    const newPerson = await prisma.person.create({
      data: {
        name: "Nieuw",
        group: {
          connect: {
            id: formData.get("group") as string,
          },
        },
      },
    });

    return {
      ...prevState,
      message: `${newPerson.name} is toegevoegd`,
      persons: [...prevState?.persons, newPerson],
    };
  } else {
    return {
      ...prevState,
      message: "Geen actie gevonden",
    };
  }
}
