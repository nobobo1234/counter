import styles from "./Leaderboard.module.scss";
import useLeaderboard from "@/hooks/useLeaderboard";

const Leaderboard = () => {
  const { ranking } = useLeaderboard();
  return (
    <ul className={styles["list-from-4"]}>
      <li className={styles["list-from-4__header"]}>
        <p>#</p>
        <p>Naam</p>
        <p>Punten</p>
      </li>
      {ranking.slice(3).map((person, index) => (
        <li className={styles["list-from-4__item"]} key={person.name}>
          <p>{index + 4}.</p>
          <p>{person.name}</p>
          <p>{person.sum} punten</p>
        </li>
      ))}
    </ul>
  );
};

export default Leaderboard;
