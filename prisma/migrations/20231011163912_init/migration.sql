/*
  Warnings:

  - You are about to drop the `AdminMapping` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Person` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AdminMapping";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Person";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    CONSTRAINT "User_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Count" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "personId" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "countDate" DATETIME NOT NULL,
    CONSTRAINT "Count_personId_fkey" FOREIGN KEY ("personId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Count" ("count", "countDate", "id", "personId") SELECT "count", "countDate", "id", "personId" FROM "Count";
DROP TABLE "Count";
ALTER TABLE "new_Count" RENAME TO "Count";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
