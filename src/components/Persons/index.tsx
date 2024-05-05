"use client";
import { Person } from "@prisma/client";
import { H3 } from "../Typography";
import styles from "./index.module.scss";
import { useFormState } from "react-dom";
import { updatePerson } from "@/features/group/persons";
import PersonCard from "./PersonCard";
import { MaterialSymbol } from "react-material-symbols";

export default function Persons({
  initialPersons,
  users,
  currentGroup,
}: {
  initialPersons: Person[];
  users: { email: string; id: string }[];
  currentGroup: string;
}) {
  const [state, formAction] = useFormState(updatePerson, {
    persons: initialPersons,
    message: "",
  });

  const deletePersonEvent = (id: string) => {
    "use client";
    // generate new formData
    const formData = new FormData();
    formData.append("id", id);
    formData.append("action", "delete");
    // call formAction with new formData
    formAction(formData);
  };

  const addPersonEvent = () => {
    "use client";
    // generate new formData
    const formData = new FormData();
    formData.append("action", "add");
    formData.append("name", "Nieuw");
    formData.append("user", "0");
    formData.append("group", currentGroup);
    // call formAction with new formData
    formAction(formData);
  };

  return (
    <div className={styles["personen"]}>
      <div className={styles["personen__header"]}>
        <H3>Personen</H3>
        <button
          className={styles["personen__add-button"]}
          onClick={addPersonEvent}
        >
          Voeg persoon toe
        </button>
      </div>
      <ul className={styles["personen__list"]}>
        {state?.persons.map((person: Person) => (
          <PersonCard
            initialPerson={person}
            users={users}
            key={person.id}
            formAction={formAction}
            deletePerson={deletePersonEvent}
          />
        ))}
      </ul>
    </div>
  );
}
