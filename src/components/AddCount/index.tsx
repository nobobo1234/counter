"use client";
import { saveCount } from "@/features/group/counts";
import styles from "./index.module.scss";
import { H5 } from "@/components/Typography";
import Input from "@/components/Input";

export default function AddCount({
  groupUnit,
  persons,
}: {
  groupUnit: string;
  persons: { id: string; name: string }[];
}) {
  return (
    <form className={styles["container__form"]} action={saveCount}>
      <div className={styles["container__form-date"]}>
        <H5>Datum</H5>
        <Input
          name="date"
          type="date"
          defaultValue={new Date().toISOString().split("T")[0]}
        />
      </div>
      <div className={styles["container__form-persons"]}>
        <H5>Aantal {groupUnit}</H5>
        {persons.map((person, index) => (
          <Input
            name={`count__${person.id}`}
            placeholder={person.name}
            defaultValue="0"
            type="number"
            key={person.id}
          />
        ))}
      </div>
      <div className={styles["container__form-button-wrapper"]}>
        <button className={styles["container__form-button"]} type="submit">
          Opslaan
        </button>
      </div>
    </form>
  );
}
