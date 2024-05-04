import styles from "./Leaderboard.module.scss";
import useLeaderboard from "@/hooks/useLeaderboard";

const Leaderboard = ({ unit }: { unit: string }) => {
  const { ranking } = useLeaderboard();
  const capitalizedUnit = unit.charAt(0).toUpperCase() + unit.slice(1);

  return (
    <ul className={styles["list-from-4"]}>
      <li className={styles["list-from-4__header"]}>
        <p>#</p>
        <p>Naam</p>
        <p>{capitalizedUnit}</p>
      </li>
      {ranking.slice(3).map((person, index) => (
        <li className={styles["list-from-4__item"]} key={person.name}>
          <p>{index + 4}.</p>
          <p>{person.name}</p>
          <p>
            {person.sum} {unit}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default Leaderboard;
