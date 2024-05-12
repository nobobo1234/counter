"use client";
import { useState, useEffect } from "react";
import styles from "../sign-in/page.module.scss";
import useInterval from "@/hooks/useInterval";

export default function RequestNew({
  timeCreated,
  onClick,
}: {
  timeCreated: Date;
  onClick: () => void;
}) {
  const [timeString, setTimeString] = useState("");
  const [olderThan5Minutes, setOlderThan5Minutes] = useState(false);
  const fiveMinutes = 5 * 60 * 1000;

  useEffect(() => {
    const leftOf5 = new Date(
      Math.max(0, fiveMinutes - (Date.now() - timeCreated.getTime()))
    );
    setTimeString(`${leftOf5.getMinutes()}:${leftOf5.getSeconds()}`);
    setOlderThan5Minutes(Date.now() - timeCreated.getTime() > fiveMinutes);
  }, []);

  useInterval(() => {
    const leftOf5 = new Date(
      Math.max(0, fiveMinutes - (Date.now() - timeCreated.getTime()))
    );
    setTimeString(`${leftOf5.getMinutes()}:${leftOf5.getSeconds()}`);
    setOlderThan5Minutes(Date.now() - timeCreated.getTime() > fiveMinutes);
  }, 1000);

  return (
    <div>
      <p className={styles["sign-up__text"]}>
        Heb je geen code ontvangen? Vraag hieronder een nieuwe aan
      </p>
      <button
        className={styles["button"]}
        disabled={!olderThan5Minutes}
        onClick={async () => await onClick()}
      >
        {olderThan5Minutes
          ? `Vraag nieuwe code aan`
          : `Vraag nieuwe code aan (${timeString})`}
      </button>
    </div>
  );
}
