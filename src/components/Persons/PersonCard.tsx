"use client";
import { SetStateAction, useState } from "react";
import { Person } from "@prisma/client";
import styles from "./index.module.scss";
import Input from "@/components/Input";

export default function PersonCard({
  initialPerson,
  users,
  formAction,
  deletePerson,
}: {
  initialPerson: Person;
  users: { email: string; id: string }[];
  formAction: (formData: FormData) => void;
  deletePerson: (id: string) => void;
}) {
  const [person, updatePerson] = useState(initialPerson);
  const updateInput =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      updatePerson({ ...person, name: e.target.value });
    };

  const updateUserSelect =
    (id: string) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      updatePerson({ ...person, userId: e.target.value });
    };

  return (
    <li className={styles["personen__list-item"]}>
      <form action={formAction}>
        <input type="hidden" name="id" value={person.id} />
        <input type="hidden" name="action" value="update" />
        <input type="hidden" name="group" value={person.groupId} />
        <Input
          name="name"
          value={person.name}
          className={styles["personen__list-item-input"]}
          onChange={updateInput(person.id)}
        />
        <div className={styles["personen__link-user"]}>
          <span className={styles["personen__link-user-title"]}>
            Koppel persoon aan gebruiker
          </span>
          <select
            name="user"
            value={person?.userId || 0}
            onChange={updateUserSelect(person.id)}
          >
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
          <button
            className={styles["personen__list-item-button"]}
            onClick={(e) => {
              // change the hidden action input to delete and submit the form
              e.preventDefault();
              deletePerson(person.id);
            }}
          >
            Verwijder
          </button>
        </div>
      </form>
    </li>
  );
}
