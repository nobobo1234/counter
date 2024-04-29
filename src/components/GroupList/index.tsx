import styles from "./GroupList.module.scss";
import type { Group } from "@prisma/client";
import GroupItem from "./GroupItem";

const GroupList: React.FC<{ groups: Group[] }> = ({ groups }) => {
  return (
    <div className={styles.grouplist}>
      {groups.length ? (
        groups.map((group) => <GroupItem key={group.id} group={group} />)
      ) : (
        <p>No groups found</p>
      )}
    </div>
  );
};

export default GroupList;
