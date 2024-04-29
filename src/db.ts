import { PrismaClient } from "@prisma/client";

// Create a singleton instance of PrismaClient to avoid multiple instances
// being created at runtime in development.
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
