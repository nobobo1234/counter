import { prisma } from "@/db";
import styles from "../page.module.scss";
import { H1 } from "@/components/Typography";

export default async function Page({ params }: { params: { id: string } }) {
  const group = await prisma.group.findUnique({
    where: {
      id: params.id,
    },
  });
  return (
    <div className={styles.container}>
      <H1>Statistieken bewerken voor {group?.name}</H1>
    </div>
  );
}
