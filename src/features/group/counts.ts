"use server";
import { prisma } from "@/db";

export const getTotalCount = async (groupId?: string) => {
  if (!groupId) {
    return 0;
  }

  const total = await prisma.count.aggregate({
    where: {
      person: {
        groupId: groupId
      }
    },
    _sum: {
      count: true,
    },
  });

  return total._sum.count;
};

export const personalStats = async (userId: string, groupId: string) => {
  const counts = await prisma.count.groupBy({
    by: ["personId"],
    _sum: {
      count: true,
    },
    where: {
      personId: userId,
    },
  });

  const previousDate = await getPreviousDate(groupId);
  const previousCount = await prisma.count.findFirst({
    where: {
      personId: userId,
      countDate: previousDate,
    },
  });

  const ranking = await getRanking(groupId);
  const userRank = ranking.findIndex((rank) => rank.person?.id === userId);

  function getWithOrdinal(n: number) {
    return (
      n +
      (n % 10 === 1 && n % 100 !== 11
        ? "ste"
        : n % 10 === 2 && n % 100 !== 12
        ? "de"
        : n % 10 === 3 && n % 100 !== 13
        ? "de"
        : "ste")
    );
  }

  return {
    rank: `${getWithOrdinal(userRank + 1)}`,
    total: counts[0]?._sum.count || 0,
    previous: previousCount?.count || 0,
  };
};

export const getPreviousDate = async (groupId?: string) => {
  // Find the last date that has counts
  const previousDate = await prisma.count.findFirst({
    where: {
      person: {
        groupId: groupId,
      }
    },
    select: {
      countDate: true,
    },
    orderBy: {
      countDate: "desc",
    },
  });

  return previousDate?.countDate;
};

export const getTop3PreviousDate = async (groupId?: string) => {
  const previousDate = await getPreviousDate(groupId);

  const top3 = await prisma.count.findMany({
    where: {
      countDate: previousDate,
    },
    include: {
      person: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      count: "desc",
    },
    take: 3,
  });

  return top3.map((count) => count.person.name);
};

export const getTotalLastDate = async (groupId?: string) => {
  const lastDate = await getPreviousDate(groupId);

  const total = await prisma.count.aggregate({
    _sum: {
      count: true,
    },
    where: {
      countDate: lastDate,
      person: {
        groupId: groupId
      }
    },
  });

  return total._sum.count;
};

export const getByDate = async (date: Date, groupId?: string) => {
  const counts = await prisma.count.findMany({
    where: {
      countDate: date,
      person: {
        groupId: groupId
      }
    },
    include: {
      person: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      count: "desc",
    },
  });

  return counts.map((count) => ({
    person: count.person,
    sum: count.count,
  }));
};

export const getRanking = async (groupId?: string) => {
  if (!groupId) {
    return [];
  }

  const sumCounts = await prisma.count.groupBy({
    by: ["personId"],
    where: {
      person: {
        groupId: groupId
      }
    },
    _sum: {
      count: true,
    },
    orderBy: {
      _sum: {
        count: "desc",
      },
    },
  });

  // If no counts are found, return an empty array
  if (sumCounts.length === 0) return [];

  // Get the usernames of each person
  const persons = await prisma.person.findMany({
    where: {
      id: {
        in: sumCounts.map((person) => person.personId),
      },
    },
    select: {
      name: true,
      id: true,
    },
  });

  return sumCounts.map((person) => ({
    person: persons.find((p) => p.id === person.personId),
    sum: person._sum.count,
  }));
};

export const saveCount = async (formData: FormData) => {
  "use server";
  const date = formData.get("date") as string;

  // get every other key in the formData
  const counts = [];
  for (const key of Array.from(formData.keys())) {
    if (!key.startsWith("count__")) continue;
    const personId = key.split("__")[1];
    const number = parseInt(formData.get(key) as string);
    counts.push({ personId, count: number });
  }

  // create a new count for each person
  for (const count of counts) {
    await prisma.count.create({
      data: {
        countDate: new Date(date),
        person: {
          connect: {
            id: count.personId,
          },
        },
        count: count.count,
      },
    });
  }
};
