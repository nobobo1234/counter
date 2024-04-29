import fs from "fs";

// read csv file
const readCsv = (path: string) => {
  return fs
    .readFileSync(path, "utf8")
    .split("\n")
    .map((line) => line.split(";"));
};

const numbers = readCsv("./src/numbers.csv");
// remove the first element of the array and return it
const first = numbers.shift() || [];
const persons = numbers.map((person) => {
  return {
    name: person[0],
    counts: person.slice(1).map(Number),
  };
});

const data = {
  dates: first.slice(1).map((e) => e.trim()),
  persons,
};

export function getRanking(persons: { name: string; counts: number[] }[]) {
  const sumPersons = persons.map((person) => {
    const sum = person.counts.reduce((acc, count) => acc + count, 0);
    return {
      name: person.name,
      sum,
    };
  });

  return sumPersons.sort((a, b) => b.sum - a.sum);
}

//* Function that returns the leaderboard for the people with the most counts,
//* sorted by the most counts. Returns an array of objects with the name and sum
//* of counts and returns the top 3 seperately.
const useLeaderboard = () => {
  const { persons } = data;
  const ranking = getRanking(persons);
  const top3 = ranking.slice(0, 3);

  return { ranking, top3 };
};

export default useLeaderboard;
