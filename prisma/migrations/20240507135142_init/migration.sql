-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EmailConfirmation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EmailConfirmation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_EmailConfirmation" ("code", "email", "expiresAt", "id", "userId") SELECT "code", "email", "expiresAt", "id", "userId" FROM "EmailConfirmation";
DROP TABLE "EmailConfirmation";
ALTER TABLE "new_EmailConfirmation" RENAME TO "EmailConfirmation";
CREATE UNIQUE INDEX "EmailConfirmation_userId_key" ON "EmailConfirmation"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
