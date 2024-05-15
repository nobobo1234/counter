"use client";
import { useState } from "react";
import Input from "../Input";
import styles from "./ChangeUnit.module.scss";
import updateUnit from "@/features/group/unit";

export default function ChangeUnit({
  initialUnit,
  groupId,
}: {
  initialUnit: string;
  groupId: string;
}) {
  const [unit, setUnit] = useState(initialUnit);

  return (
    <form action={updateUnit}>
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
