"use client";
import styles from "./page.module.scss";
import join from "@/features/group/join";

export default function Confirm({
  groupId,
  inviteCode,
}: {
  groupId: string;
  inviteCode: string;
}) {
  const onConfirm = join.bind(null, groupId, inviteCode);
  return (
    <form action={onConfirm}>
      <button className={styles["container__button"]}>Toetreden</button>
    </form>
  );
}
