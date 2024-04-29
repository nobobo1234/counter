import type { Group } from "@prisma/client";
import styles from "./GroupList.module.scss";
import { H3 } from "../Typography";
import RouterLink from "next/link";

const GroupItem: React.FC<{ group: Group }> = ({ group }) => {
  return (
    <div className={styles["grouplist__item"]} key={group.id}>
      <H3>{group.name}</H3>
      <RouterLink
        className={styles["grouplist__item-button"]}
        href={`/group/${group.id}`}
      >
        Go to page
      </RouterLink>
    </div>
  );
};

export default GroupItem;
