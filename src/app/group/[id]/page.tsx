import { prisma } from "@/db";
import styles from "./page.module.scss";
import { H1, H3 } from "@/components/Typography";
import LineChart from "./chart";
import Top3 from "@/components/Leaderboard/Top3";
import Leaderboard from "@/components/Leaderboard/Leaderboard";

import numbers from "@/numbers";

export default async function Page({ params }: { params: { id: string } }) {
  const group = await prisma.group.findUnique({
    where: {
      id: params.id,
    },
  });

  // generate the total number of points per date
  const total = numbers.persons.reduce((acc, person) => {
    person.counts.forEach((count, index) => {
      acc[index] = acc[index] || 0;
      acc[index] += count;
    });
    return acc;
  }, []);

  return (
    <div className={styles.container}>
      <H1>Statistieken voor {group?.name}</H1>
      <H3>Scorebord</H3>
      <Top3 />
      <Leaderboard />
      <H3>Totale punten per datum</H3>
      <LineChart
        data={{
          labels: numbers.dates,
          datasets: [
            {
              label: "Totale punten",
              data: total,
              borderColor: "rgba(75, 192, 192, 1)",
            },
          ],
        }}
      />
      <H3>Cumulatieve punten per datum</H3>
      <LineChart
        data={{
          labels: numbers.dates,
          datasets: [
            {
              label: "Cumulatieve totale punten",
              data: total.reduce((acc, value, index) => {
                acc.push((acc[index - 1] || 0) + value);
                return acc;
              }, []),
              borderColor: "rgba(75, 192, 192, 1)",
            },
          ],
        }}
      />
    </div>
  );
}
