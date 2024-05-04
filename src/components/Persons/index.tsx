"use client";
import { Person } from "@prisma/client";
import { H3 } from "../Typography";
import styles from "./index.module.scss";
import Input from "@/components/Input";
import { useFormState } from "react-dom";
import updatePerson from "./person";

export default function Persons({
  initialPersons,
  users,
}: {
  initialPersons: Person[];
  users: { email: string; id: string }[];
}) {
  const [persons, formAction] = useFormState(updatePerson, initialPersons);
  console.log(initialPersons);

  return (
    <div className={styles["personen"]}>
      <H3>Personen</H3>
      <ul className={styles["personen__list"]}>
        {persons?.map((person) => (
          <li className={styles["personen__list-item"]} key={person.id}>
            <form action={formAction}>
              <input type="hidden" name="id" value={person.id} />
              <Input
                name="name"
                value={person.name}
                className={styles["personen__list-item-input"]}
              />
              <div className={styles["personen__link-user"]}>
                <span className={styles["personen__link-user-title"]}>
                  Koppel persoon aan gebruiker
                </span>
                <select name="user" value={person?.userId || 0}>
                  <option key={0} value={0}>
                    Selecteer een gebruiker
                  </option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.email}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles["personen__actions"]}>
                <button
                  type="submit"
                  className={styles["personen__list-item-button"]}
                >
                  Sla op
                </button>
                <button className={styles["personen__list-item-button"]}>
                  Verwijder
                </button>
              </div>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
