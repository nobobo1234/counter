-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Count" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "personId" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "countDate" DATETIME NOT NULL,
    CONSTRAINT "Count_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Count" ("count", "countDate", "id", "personId") SELECT "count", "countDate", "id", "personId" FROM "Count";
DROP TABLE "Count";
ALTER TABLE "new_Count" RENAME TO "Count";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
