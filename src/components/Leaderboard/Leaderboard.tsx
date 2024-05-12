import styles from "./Leaderboard.module.scss";

const Leaderboard = async ({
  unit,
  deleteTop3,
  ranking,
}: {
  unit: string;
  deleteTop3: boolean;
  ranking: {
    person: { id: string; name: string } | undefined;
    sum: number | null;
  }[];
}) => {
  const capitalizedUnit = unit.charAt(0).toUpperCase() + unit.slice(1);

  if (deleteTop3) {
    ranking.splice(0, 3);
  }

  return (
    <ul className={styles["list-from-4"]}>
      <li className={styles["list-from-4__header"]}>
        <p>#</p>
        <p>Naam</p>
        <p>{capitalizedUnit}</p>
      </li>
      {ranking.map((person, index) => (
        <li className={styles["list-from-4__item"]} key={person.person?.id}>
          <p>{index + (deleteTop3 ? 4 : 1)}</p>
          <p>{person.person?.name}</p>
          <p>
            {person.sum} {unit}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default Leaderboard;
