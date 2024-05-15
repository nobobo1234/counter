"use client";
import { useState } from "react";
import Input from "../Input";
import styles from "./ChangeUnit.module.scss";
import { prisma } from "@/db";

export default function ChangeUnit({
  initialUnit,
  groupId,
}: {
  initialUnit: string;
  groupId: string;
}) {
  const [unit, setUnit] = useState(initialUnit);

  const onSubmit = (formData: FormData) => {
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
  };

  return (
    <form action={onSubmit}>
      <Input type="hidden" value={groupId} name="groupId" />
      <Input
        value={unit}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUnit(e.target.value)
        }
        name="unit"
      />
      <button className={styles["button"]}>Opslaan</button>
    </form>
  );
}
